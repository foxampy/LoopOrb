"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Droplets, Info, X, Globe2, Layers, Filter, Navigation } from "lucide-react";

// NASA Earth textures
const EARTH_TEXTURES = {
  // NASA Blue Marble - Earth during day
  map: "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
  // Earth topology (bump map)
  bumpMap: "https://unpkg.com/three-globe/example/img/earth-topology.png",
  // Specular highlights for water
  specularMap: "https://unpkg.com/three-globe/example/img/earth-water.png",
};

// Water objects data with real coordinates
const waterObjects = [
  { id: "1", name: "Амударья", type: "RIVER", lat: 37.5, lng: 62.0, country: "Узбекистан", qualityIndex: 65 },
  { id: "2", name: "Сырдарья", type: "RIVER", lat: 45.5, lng: 62.5, country: "Казахстан", qualityIndex: 58 },
  { id: "3", name: "Аральское море", type: "LAKE", lat: 45.0, lng: 60.0, country: "Узбекистан/Казахстан", qualityIndex: 35 },
  { id: "4", name: "Иссык-Куль", type: "LAKE", lat: 42.4, lng: 77.2, country: "Кыргызстан", qualityIndex: 85 },
  { id: "5", name: "Балхаш", type: "LAKE", lat: 46.0, lng: 74.5, country: "Казахстан", qualityIndex: 72 },
  { id: "6", name: "Нил", type: "RIVER", lat: 30.0, lng: 31.0, country: "Египет", qualityIndex: 68 },
  { id: "7", name: "Виктория", type: "LAKE", lat: -1.0, lng: 33.0, country: "Уганда/Кения", qualityIndex: 78 },
  { id: "8", name: "Амазонка", type: "RIVER", lat: -3.0, lng: -60.0, country: "Бразилия", qualityIndex: 82 },
  { id: "9", name: "Миссисипи", type: "RIVER", lat: 35.0, lng: -90.0, country: "США", qualityIndex: 71 },
  { id: "10", name: "Волга", type: "RIVER", lat: 48.0, lng: 44.0, country: "Россия", qualityIndex: 64 },
  { id: "11", name: "Дунай", type: "RIVER", lat: 45.0, lng: 28.0, country: "Румыния", qualityIndex: 76 },
  { id: "12", name: "Ганг", type: "RIVER", lat: 25.5, lng: 87.5, country: "Индия", qualityIndex: 42 },
  { id: "13", name: "Меконг", type: "RIVER", lat: 10.0, lng: 105.0, country: "Вьетнам", qualityIndex: 69 },
  { id: "14", name: "Янцзы", type: "RIVER", lat: 30.0, lng: 115.0, country: "Китай", qualityIndex: 55 },
  { id: "15", name: "Муррей", type: "RIVER", lat: -35.0, lng: 140.0, country: "Австралия", qualityIndex: 73 },
  { id: "16", name: "Виктория (озеро)", type: "LAKE", lat: -1.5, lng: 33.0, country: "Кения/Уганда", qualityIndex: 74 },
  { id: "17", name: "Танганьика", type: "LAKE", lat: -6.0, lng: 30.0, country: "Танзания", qualityIndex: 81 },
  { id: "18", name: "Мичиган", type: "LAKE", lat: 44.0, lng: -87.0, country: "США", qualityIndex: 79 },
  { id: "19", name: "Байкал", type: "LAKE", lat: 53.5, lng: 108.0, country: "Россия", qualityIndex: 95 },
  { id: "20", name: "Титикака", type: "LAKE", lat: -15.8, lng: -69.3, country: "Перу/Боливия", qualityIndex: 77 },
];

const projects = [
  { id: "p1", name: "Спасение Арала", lat: 45.0, lng: 60.0, type: "RESTORATION", raised: 2500000 },
  { id: "p2", name: "Чистый Нил", lat: 24.0, lng: 33.0, type: "CLEANUP", raised: 1200000 },
  { id: "p3", name: "Амазония", lat: -5.0, lng: -62.0, type: "CONSERVATION", raised: 5000000 },
  { id: "p4", name: "Виктория Вотч", lat: -1.0, lng: 33.5, type: "MONITORING", raised: 800000 },
  { id: "p5", name: "Чистый Ганг", lat: 25.5, lng: 83.0, type: "CLEANUP", raised: 3200000 },
];

// Convert lat/lng to 3D position on sphere
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
}

// Real Earth Component with NASA textures
function Earth({ onMarkerClick, activeLayer }: { onMarkerClick: (data: any) => void; activeLayer: string }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  
  // Load textures
  const [earthMap, bumpMap, specularMap] = useLoader(THREE.TextureLoader, [
    EARTH_TEXTURES.map,
    EARTH_TEXTURES.bumpMap,
    EARTH_TEXTURES.specularMap,
  ]);

  // Animate rotation
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.07;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  // Memoize markers to prevent re-render
  const objectMarkers = useMemo(() => {
    if (activeLayer === "projects") return null;
    return waterObjects.map((obj) => {
      const position = latLngToVector3(obj.lat, obj.lng, 2.02);
      const color = obj.qualityIndex >= 70 ? "#22c55e" : 
                    obj.qualityIndex >= 50 ? "#eab308" : "#ef4444";
      
      return (
        <group key={obj.id} position={position}>
          <mesh
            onClick={() => onMarkerClick({ type: "object", data: obj })}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
          >
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color={color} />
          </mesh>
          <RingPulse color={color} />
        </group>
      );
    });
  }, [activeLayer, onMarkerClick]);

  const projectMarkers = useMemo(() => {
    if (activeLayer === "objects") return null;
    return projects.map((project) => {
      const position = latLngToVector3(project.lat, project.lng, 2.05);
      
      return (
        <group key={project.id} position={position}>
          <mesh
            onClick={() => onMarkerClick({ type: "project", data: project })}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
          >
            <octahedronGeometry args={[0.04, 0]} />
            <meshBasicMaterial color="#22d3ee" />
          </mesh>
          <RingPulse color="#22d3ee" />
        </group>
      );
    });
  }, [activeLayer, onMarkerClick]);

  return (
    <group>
      {/* Earth sphere with NASA textures */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshPhongMaterial 
          map={earthMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          specularMap={specularMap}
          specular={new THREE.Color(0x333333)}
          shininess={5}
        />
      </mesh>

      {/* Clouds layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.02, 64, 64]} />
        <meshPhongMaterial
          transparent
          opacity={0.3}
          color={0xffffff}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.15, 64, 64]} />
        <meshBasicMaterial
          color={0x4fc3f7}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[2.25, 64, 64]} />
        <meshBasicMaterial
          color={0x0288d1}
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Markers */}
      {objectMarkers}
      {projectMarkers}
    </group>
  );
}

// Animated pulse ring around markers
function RingPulse({ color }: { color: string }) {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2.5) * 0.4;
      ringRef.current.scale.set(scale, scale, scale);
      const material = ringRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.6 - (scale - 1) * 0.4;
    }
  });
  
  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.04, 0.06, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  );
}

// Scene with lighting
function Scene({ onMarkerClick, activeLayer }: { onMarkerClick: (data: any) => void; activeLayer: string }) {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.4} />
      
      {/* Sun light */}
      <directionalLight 
        position={[10, 5, 5]} 
        intensity={1.2}
        castShadow
      />
      
      {/* Blue rim light from opposite side */}
      <pointLight position={[-10, -5, -10]} intensity={0.4} color="#0ea5e9" />
      
      {/* Stars background */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
      
      {/* Earth */}
      <Earth onMarkerClick={onMarkerClick} activeLayer={activeLayer} />
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        minDistance={3.5} 
        maxDistance={15}
        autoRotate
        autoRotateSpeed={0.3}
        rotateSpeed={0.5}
      />
    </>
  );
}

// Info Panel Component
function InfoPanel({ data, onClose }: { data: any; onClose: () => void }) {
  if (!data) return null;
  
  const isObject = data.type === "object";
  const item = data.data;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-4 top-20 w-80 glass-card p-6 z-50 max-h-[calc(100vh-6rem)] overflow-y-auto"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isObject ? "bg-water-500/20 text-water-400" : "bg-cyan-500/20 text-cyan-400"
          }`}>
            {isObject ? <Droplets className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-semibold text-white">{item.name}</h3>
            <p className="text-xs text-water-200/50">{item.country}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-water-200/50 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {isObject && (
        <>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-water-200/70">Качество воды</span>
              <span className={item.qualityIndex >= 70 ? "text-green-400" : 
                             item.qualityIndex >= 50 ? "text-yellow-400" : "text-red-400"}>
                {item.qualityIndex}/100
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${
                  item.qualityIndex >= 70 ? "bg-green-500" : 
                  item.qualityIndex >= 50 ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${item.qualityIndex}%` }}
              />
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-water-200/50">Тип</span>
              <span className="text-white">{item.type === "RIVER" ? "Река" : "Озеро"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-water-200/50">Координаты</span>
              <span className="text-white">{item.lat.toFixed(2)}, {item.lng.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
      
      {!isObject && (
        <>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-water-200/70">Собрано</span>
              <span className="text-cyan-400">${item.raised.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-water-400 to-cyan-400 rounded-full" style={{ width: "65%" }} />
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-water-200/50">Тип проекта</span>
              <span className="text-white">{item.type}</span>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

// Loading component
function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-water-200/70">Загрузка 3D глобуса...</p>
      </div>
    </div>
  );
}

// Main Globe3D Component
export default function Globe3D() {
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState<"all" | "objects" | "projects">("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate texture loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden rounded-xl">
      {/* 3D Canvas */}
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
          <Scene onMarkerClick={setSelectedMarker} activeLayer={activeLayer} />
        </Canvas>
      )}
      
      {/* Layer Controls - Top Right */}
      <div className="absolute top-3 right-3 glass-card p-1.5 flex gap-1 z-10">
        {[
          { id: "all", label: "Всё", icon: Layers },
          { id: "objects", label: "Объекты", icon: Droplets },
          { id: "projects", label: "Проекты", icon: MapPin },
        ].map((layer) => (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(layer.id as any)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition ${
              activeLayer === layer.id
                ? "bg-water-500/20 text-water-400"
                : "text-water-200/70 hover:bg-white/5"
            }`}
          >
            <layer.icon className="w-3.5 h-3.5" />
            {layer.label}
          </button>
        ))}
      </div>
      
      {/* Legend - Bottom Left */}
      <div className="absolute bottom-3 left-3 glass-card p-3 z-10">
        <h4 className="text-xs font-medium text-white mb-2">Легенда</h4>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-water-200/70">Отличное (70-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="text-water-200/70">Хорошее (50-69)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-water-200/70">Плохое (&lt;50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rotate-45 bg-cyan-400" />
            <span className="text-water-200/70">Проект</span>
          </div>
        </div>
      </div>
      
      {/* Stats - Bottom Right */}
      <div className="absolute bottom-3 right-3 glass-card p-3 z-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <div className="text-center">
            <div className="text-lg font-bold gradient-text">{waterObjects.length}</div>
            <div className="text-water-200/50">Объектов</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold gradient-text">{projects.length}</div>
            <div className="text-water-200/50">Проектов</div>
          </div>
        </div>
      </div>
      
      {/* Info Panel */}
      <AnimatePresence>
        {selectedMarker && (
          <InfoPanel data={selectedMarker} onClose={() => setSelectedMarker(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
