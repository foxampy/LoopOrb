"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Droplets,
  Info,
  X,
  Globe2,
  Layers,
  Filter,
  Navigation,
  Target,
  Waves,
  TrendingUp,
  Thermometer,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Zap,
  Wind,
  CloudRain,
} from "lucide-react";

// NASA Earth textures
const EARTH_TEXTURES = {
  map: "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
  bumpMap: "https://unpkg.com/three-globe/example/img/earth-topology.png",
  specularMap: "https://unpkg.com/three-globe/example/img/earth-water.png",
  nightMap: "https://unpkg.com/three-globe/example/img/earth-night.jpg",
};

// Convert lat/lng to 3D position on sphere
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Ring pulse animation component
function RingPulse({ color, size = 0.08 }: { color: string; size?: number }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (ringRef.current && materialRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.2;
      ringRef.current.scale.setScalar(scale);
      materialRef.current.opacity = 0.5 - (scale - 1) * 0.5;
    }
  });

  return (
    <mesh ref={ringRef}>
      <ringGeometry args={[size * 0.75, size, 32]} />
      <meshBasicMaterial ref={materialRef} color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

// Animated flow line between two points
function FlowLine({
  start,
  end,
  color = "#22d3ee",
  speed = 1
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color?: string;
  speed?: number;
}) {
  const lineRef = useRef<THREE.Line>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  const [dashOffset, setDashOffset] = useState(0);

  useFrame(({ clock }) => {
    setDashOffset(clock.getElapsedTime() * speed);
    if (materialRef.current) {
      materialRef.current.dashOffset = -dashOffset;
    }
  });

  const points = useMemo(() => [start, end], [start, end]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        ref={materialRef}
        color={color}
        transparent
        opacity={0.6}
        dashSize={0.1}
        gapSize={0.05}
      />
    </line>
  );
}

// Sensor marker with animation
function SensorMarker({
  position,
  sensor,
  onClick,
  isActive
}: {
  position: THREE.Vector3;
  sensor: any;
  onClick: () => void;
  isActive: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
    if (glowRef.current && sensor.status === "online") {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.15;
      glowRef.current.scale.setScalar(scale);
    }
  });

  const color = sensor.status === "online" ? "#22c55e" :
                sensor.status === "maintenance" ? "#eab308" : "#ef4444";

  return (
    <group position={position}>
      {/* Main sensor body */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        <octahedronGeometry args={[0.035, 0]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Glow effect for online sensors */}
      {sensor.status === "online" && (
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.2} />
        </mesh>
      )}

      {/* Alert indicator */}
      {sensor.alerts && sensor.alerts.length > 0 && (
        <mesh>
          <ringGeometry args={[0.05, 0.06, 16]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
      )}

      <RingPulse color={color} size={0.07} />
    </group>
  );
}

// Water object marker
function WaterObjectMarker({
  position,
  obj,
  onClick
}: {
  position: THREE.Vector3;
  obj: any;
  onClick: () => void;
}) {
  const color = obj.qualityIndex && obj.qualityIndex >= 70 ? "#22c55e" :
                obj.qualityIndex && obj.qualityIndex >= 50 ? "#eab308" : "#ef4444";
  const size = obj.crisis ? 0.06 : 0.04;

  return (
    <group position={position}>
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {obj.crisis && (
        <mesh>
          <octahedronGeometry args={[0.1, 0]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.3} wireframe />
        </mesh>
      )}
      <RingPulse color={color} />
    </group>
  );
}

// Station marker
function StationMarker({
  position,
  station,
  onClick
}: {
  position: THREE.Vector3;
  station: any;
  onClick: () => void;
}) {
  const color = station.status === "active" ? "#22c55e" :
                station.status === "construction" ? "#eab308" : "#64748b";

  return (
    <group position={position}>
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        <boxGeometry args={[0.05, 0.05, 0.1]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <RingPulse color={color} />
    </group>
  );
}

// Lab marker
function LabMarker({
  position,
  lab,
  onClick
}: {
  position: THREE.Vector3;
  lab: any;
  onClick: () => void;
}) {
  const color = lab.status === "online" ? "#a855f7" : "#64748b";

  return (
    <group position={position}>
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        <cylinderGeometry args={[0.025, 0.025, 0.1, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.07, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {lab.status === "online" && <RingPulse color={color} />}
    </group>
  );
}

// Project marker
function ProjectMarker({
  position,
  project,
  onClick
}: {
  position: THREE.Vector3;
  project: any;
  onClick: () => void;
}) {
  const progress = project.raisedAmount / project.targetAmount;
  const color = progress >= 1 ? "#22c55e" : progress >= 0.5 ? "#3b82f6" : "#8b5cf6";

  return (
    <group position={position}>
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        <icosahedronGeometry args={[0.055, 0]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <RingPulse color={color} />
    </group>
  );
}

// Measurement line
function MeasurementLine({
  points,
  color = "#22d3ee"
}: {
  points: THREE.Vector3[];
  color?: string;
}) {
  if (points.length < 2) return null;

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} linewidth={2} />
    </line>
  );
}

// Main Earth Component
function Earth({
  onMarkerClick,
  activeLayer,
  isRotating,
  onRotationStop,
  isDayMode,
  activeFilters,
  waterObjects,
  sensors,
  stations,
  labs,
  projects,
  isMeasuring,
  measurePoints,
  onMeasurePoint
}: {
  onMarkerClick: (data: any) => void;
  activeLayer: string;
  isRotating: boolean;
  onRotationStop: () => void;
  isDayMode: boolean;
  activeFilters: Record<string, boolean>;
  waterObjects: any[];
  sensors: any[];
  stations: any[];
  labs: any[];
  projects: any[];
  isMeasuring: boolean;
  measurePoints: {lat: number, lng: number}[];
  onMeasurePoint: (point: {lat: number, lng: number}) => void;
}) {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const nightEarthRef = useRef<THREE.Mesh>(null);
  const rotationSpeedRef = useRef(0.05);
  const controlsRef = useRef<any>(null);

  const [earthMap, bumpMap, specularMap, nightMap] = useLoader(THREE.TextureLoader, [
    EARTH_TEXTURES.map,
    EARTH_TEXTURES.bumpMap,
    EARTH_TEXTURES.specularMap,
    EARTH_TEXTURES.nightMap,
  ]);

  // Gradually reduce rotation speed when stopped
  useFrame(({ clock }) => {
    if (!isRotating && rotationSpeedRef.current > 0) {
      rotationSpeedRef.current = Math.max(0, rotationSpeedRef.current - 0.002);
    } else if (isRotating && rotationSpeedRef.current < 0.05) {
      rotationSpeedRef.current = Math.min(0.05, rotationSpeedRef.current + 0.001);
    }

    if (earthRef.current && rotationSpeedRef.current > 0) {
      earthRef.current.rotation.y += rotationSpeedRef.current * 0.016;
    }
    if (cloudsRef.current && rotationSpeedRef.current > 0) {
      cloudsRef.current.rotation.y += rotationSpeedRef.current * 0.022;
    }
    if (atmosphereRef.current && rotationSpeedRef.current > 0) {
      atmosphereRef.current.rotation.y += rotationSpeedRef.current * 0.016;
    }
    if (nightEarthRef.current && rotationSpeedRef.current > 0) {
      nightEarthRef.current.rotation.y += rotationSpeedRef.current * 0.016;
    }
  });

  const handleMarkerClick = useCallback((data: any, e: any) => {
    e.stopPropagation();
    onRotationStop();
    onMarkerClick(data);
  }, [onMarkerClick, onRotationStop]);

  const handleCanvasClick = useCallback((e: any) => {
    if (isMeasuring && e.point) {
      // Convert 3D point back to lat/lng (approximate)
      const vector = e.point;
      const lat = 90 - (Math.acos(vector.y / 2.02) * 180 / Math.PI);
      const lng = (Math.atan2(vector.z, -vector.x) * 180 / Math.PI) - 180;
      onMeasurePoint({ lat, lng });
    }
  }, [isMeasuring, onMeasurePoint]);

  // Generate measurement points in 3D
  const measurementPoints3D = useMemo(() => {
    return measurePoints.map(p => latLngToVector3(p.lat, p.lng, 2.03));
  }, [measurePoints]);

  // Generate markers based on active layer and filters
  const markers = useMemo(() => {
    const allMarkers: React.ReactNode[] = [];

    // Water objects
    if ((activeLayer === 'all' || activeLayer === 'objects') && activeFilters.rivers && activeFilters.lakes) {
      waterObjects.forEach((obj) => {
        const position = latLngToVector3(obj.coordinates.lat, obj.coordinates.lng, 2.02);
        allMarkers.push(
          <WaterObjectMarker
            key={`obj-${obj.id}`}
            position={position}
            obj={obj}
            onClick={() => handleMarkerClick({ type: "object", data: obj }, {} as any)}
          />
        );
      });
    }

    // Sensors
    if ((activeLayer === 'all' || activeLayer === 'sensors') && activeFilters.sensors) {
      sensors.forEach((sensor) => {
        const position = latLngToVector3(sensor.coordinates.lat, sensor.coordinates.lng, 2.025);
        allMarkers.push(
          <SensorMarker
            key={`sensor-${sensor.id}`}
            position={position}
            sensor={sensor}
            isActive={activeLayer === 'sensors'}
            onClick={() => handleMarkerClick({ type: "sensor", data: sensor }, {} as any)}
          />
        );
      });
    }

    // Stations
    if ((activeLayer === 'all' || activeLayer === 'stations') && activeFilters.stations) {
      stations.forEach((station) => {
        const position = latLngToVector3(station.lat, station.lng, 2.03);
        allMarkers.push(
          <StationMarker
            key={`station-${station.id}`}
            position={position}
            station={station}
            onClick={() => handleMarkerClick({ type: "station", data: station }, {} as any)}
          />
        );
      });
    }

    // Labs
    if ((activeLayer === 'all' || activeLayer === 'labs') && activeFilters.labs) {
      labs.forEach((lab) => {
        const position = latLngToVector3(lab.lat, lab.lng, 2.04);
        allMarkers.push(
          <LabMarker
            key={`lab-${lab.id}`}
            position={position}
            lab={lab}
            onClick={() => handleMarkerClick({ type: "lab", data: lab }, {} as any)}
          />
        );
      });
    }

    // Projects
    if ((activeLayer === 'all' || activeLayer === 'projects') && activeFilters.projects) {
      projects.forEach((project) => {
        const position = latLngToVector3(project.coordinates.lat, project.coordinates.lng, 2.05);
        allMarkers.push(
          <ProjectMarker
            key={`proj-${project.id}`}
            position={position}
            project={project}
            onClick={() => handleMarkerClick({ type: "project", data: project }, {} as any)}
          />
        );
      });
    }

    return allMarkers;
  }, [activeLayer, activeFilters, waterObjects, sensors, stations, labs, projects, handleMarkerClick]);

  return (
    <group>
      {/* Earth sphere - day */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshPhongMaterial
          map={earthMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          specularMap={specularMap}
          specular={new THREE.Color(0x333333)}
          shininess={5}
          transparent={!isDayMode}
          opacity={isDayMode ? 1 : 0.3}
        />
      </mesh>

      {/* Earth sphere - night */}
      <mesh ref={nightEarthRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshBasicMaterial
          map={nightMap}
          transparent
          opacity={isDayMode ? 0 : 0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Clouds layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.02, 64, 64]} />
        <meshPhongMaterial transparent opacity={0.3} color={0xffffff} />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.15, 64, 64]} />
        <meshBasicMaterial
          color={isDayMode ? 0x4fc3f7 : 0x1e3a5f}
          transparent
          opacity={isDayMode ? 0.08 : 0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[2.25, 64, 64]} />
        <meshBasicMaterial
          color={isDayMode ? 0x0288d1 : 0x0f172a}
          transparent
          opacity={isDayMode ? 0.03 : 0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Markers */}
      {markers}

      {/* Measurement lines */}
      {measurementPoints3D.length >= 2 && (
        <MeasurementLine points={measurementPoints3D} />
      )}

      {/* Measurement point markers */}
      {measurementPoints3D.map((point, i) => (
        <mesh key={`measure-${i}`} position={point}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>
      ))}

      {/* Click handler for measurement */}
      <mesh
        visible={isMeasuring}
        onClick={handleCanvasClick}
      >
        <sphereGeometry args={[2.03, 64, 64]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

// Main Globe3D Component
export default function Globe3D({
  selectedMarker,
  onMarkerSelect,
  activeLayer,
  isRotating,
  onRotationStop,
  isDayMode,
  activeFilters,
  waterObjects,
  sensors,
  stations,
  labs,
  projects,
  isMeasuring,
  measurePoints,
  onMeasurePoint
}: {
  selectedMarker: any;
  onMarkerSelect: (marker: any) => void;
  activeLayer: string;
  isRotating: boolean;
  onRotationStop: () => void;
  isDayMode: boolean;
  activeFilters: Record<string, boolean>;
  waterObjects: any[];
  sensors: any[];
  stations: any[];
  labs: any[];
  projects: any[];
  isMeasuring: boolean;
  measurePoints: {lat: number, lng: number}[];
  onMeasurePoint: (point: {lat: number, lng: number}) => void;
}) {
  const handleMarkerClick = useCallback((data: any) => {
    onMarkerSelect(data);
  }, [onMarkerSelect]);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      onClick={(e) => {
        if (isMeasuring && e.point) {
          const vector = e.point;
          const lat = 90 - (Math.acos(vector.y / 2.02) * 180 / Math.PI);
          const lng = (Math.atan2(vector.z, -vector.x) * 180 / Math.PI) - 180;
          onMeasurePoint({ lat, lng });
        }
      }}
    >
      <ambientLight intensity={isDayMode ? 0.5 : 0.2} />
      <directionalLight position={[10, 10, 5]} intensity={isDayMode ? 1.5 : 0.3} />
      <pointLight position={[-10, -10, -10]} intensity={isDayMode ? 0.3 : 0.8} />

      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <Earth
        onMarkerClick={handleMarkerClick}
        activeLayer={activeLayer}
        isRotating={isRotating}
        onRotationStop={onRotationStop}
        isDayMode={isDayMode}
        activeFilters={activeFilters}
        waterObjects={waterObjects}
        sensors={sensors}
        stations={stations}
        labs={labs}
        projects={projects}
        isMeasuring={isMeasuring}
        measurePoints={measurePoints}
        onMeasurePoint={onMeasurePoint}
      />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={4}
        maxDistance={10}
        autoRotate={false}
      />
    </Canvas>
  );
}
