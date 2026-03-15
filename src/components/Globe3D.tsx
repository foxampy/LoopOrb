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
  CheckCircle2
} from "lucide-react";

// NASA Earth textures
const EARTH_TEXTURES = {
  map: "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
  bumpMap: "https://unpkg.com/three-globe/example/img/earth-topology.png",
  specularMap: "https://unpkg.com/three-globe/example/img/earth-water.png",
};

// Uzbekistan PPP Stations
const uzbekistanStations = [
  { id: "uz-1", name: "Station #2", location: "Джизак", lat: 40.1158, lng: 67.8422, type: "PUMPING", irr: 18, investment: 6.2, status: "active" },
  { id: "uz-2", name: "Korovulbozor", location: "Бухара", lat: 39.7681, lng: 64.4556, type: "PUMPING", irr: 22, investment: 8.1, status: "active" },
  { id: "uz-3", name: "Jondor", location: "Бухара", lat: 39.7167, lng: 63.5833, type: "PUMPING", irr: 20, investment: 12.0, status: "construction" },
  { id: "uz-4", name: "PS #3", location: "Навои", lat: 40.0964, lng: 65.3792, type: "PUMPING", irr: 17, investment: 9.5, status: "planning" },
  { id: "uz-5", name: "Dekhkanabad", location: "Кашкадарья", lat: 38.5111, lng: 66.8319, type: "PUMPING", irr: 15, investment: 7.2, status: "construction" },
];

// VOD-Lab Nodes
const vodLabNodes = [
  { id: "lab-1", name: "VOD-Lab Tashkent", location: "Ташкент, Узбекистан", lat: 41.2995, lng: 69.2401, status: "online", parameters: 87 },
  { id: "lab-2", name: "VOD-Lab Jerusalem", location: "Иерусалим, Израиль", lat: 31.7683, lng: 35.2137, status: "online", parameters: 94 },
  { id: "lab-3", name: "VOD-Lab Nairobi", location: "Найроби, Кения", lat: -1.2921, lng: 36.8219, status: "maintenance", parameters: 0 },
  { id: "lab-4", name: "VOD-Lab Singapore", location: "Сингапур", lat: 1.3521, lng: 103.8198, status: "online", parameters: 91 },
  { id: "lab-5", name: "VOD-Lab Dubai", location: "Дубай, ОАЭ", lat: 25.2048, lng: 55.2708, status: "online", parameters: 88 },
];

// Water objects by region
const waterObjects = [
  // Central Asia
  { id: "w1", name: "Амударья", type: "RIVER", lat: 37.5, lng: 62.0, country: "Узбекистан", qualityIndex: 65, region: "central-asia" },
  { id: "w2", name: "Сырдарья", type: "RIVER", lat: 45.5, lng: 62.5, country: "Казахстан", qualityIndex: 58, region: "central-asia" },
  { id: "w3", name: "Аральское море", type: "LAKE", lat: 45.0, lng: 60.0, country: "Узбекистан/Казахстан", qualityIndex: 35, region: "central-asia", crisis: true },
  { id: "w4", name: "Иссык-Куль", type: "LAKE", lat: 42.4, lng: 77.2, country: "Кыргызстан", qualityIndex: 85, region: "central-asia" },
  { id: "w5", name: "Балхаш", type: "LAKE", lat: 46.0, lng: 74.5, country: "Казахстан", qualityIndex: 72, region: "central-asia" },
  
  // Middle East
  { id: "w6", name: "Тигр", type: "RIVER", lat: 33.0, lng: 44.0, country: "Ирак", qualityIndex: 48, region: "middle-east" },
  { id: "w7", name: "Евфрат", type: "RIVER", lat: 32.5, lng: 45.0, country: "Ирак", qualityIndex: 52, region: "middle-east" },
  { id: "w8", name: "Мертвое море", type: "LAKE", lat: 31.5, lng: 35.5, country: "Израиль/Иордания", qualityIndex: 25, region: "middle-east", crisis: true },
  { id: "w9", name: "Озеро Кинерет", type: "LAKE", lat: 32.9, lng: 35.6, country: "Израиль", qualityIndex: 78, region: "middle-east" },
  { id: "w10", name: "Персидский залив", type: "SEA", lat: 26.0, lng: 52.0, country: "ОАЭ/Катар", qualityIndex: 71, region: "middle-east" },
  
  // India
  { id: "w11", name: "Ганг", type: "RIVER", lat: 25.5, lng: 87.5, country: "Индия", qualityIndex: 42, region: "india", crisis: true },
  { id: "w12", name: "Ямуна", type: "RIVER", lat: 28.6, lng: 77.2, country: "Индия", qualityIndex: 38, region: "india", crisis: true },
  { id: "w13", name: "Брахмапутра", type: "RIVER", lat: 26.2, lng: 91.8, country: "Индия", qualityIndex: 68, region: "india" },
  { id: "w14", name: "Каверӣ", type: "RIVER", lat: 11.0, lng: 77.8, country: "Индия", qualityIndex: 74, region: "india" },
  
  // China
  { id: "w15", name: "Янцзы", type: "RIVER", lat: 30.0, lng: 115.0, country: "Китай", qualityIndex: 55, region: "china" },
  { id: "w16", name: "Хуанхэ", type: "RIVER", lat: 35.0, lng: 110.0, country: "Китай", qualityIndex: 48, region: "china" },
  { id: "w17", name: "Жемчужная река", type: "RIVER", lat: 23.1, lng: 113.3, country: "Китай", qualityIndex: 62, region: "china" },
  { id: "w18", name: "Озеро Дунтинху", type: "LAKE", lat: 29.3, lng: 112.9, country: "Китай", qualityIndex: 58, region: "china" },
  
  // Africa
  { id: "w19", name: "Нил", type: "RIVER", lat: 30.0, lng: 31.0, country: "Египет", qualityIndex: 68, region: "africa" },
  { id: "w20", name: "Виктория", type: "LAKE", lat: -1.0, lng: 33.0, country: "Уганда/Кения", qualityIndex: 78, region: "africa" },
  { id: "w21", name: "Танганьика", type: "LAKE", lat: -6.0, lng: 30.0, country: "Танзания", qualityIndex: 81, region: "africa" },
  { id: "w22", name: "Озеро Чад", type: "LAKE", lat: 13.2, lng: 14.0, country: "Чад", qualityIndex: 32, region: "africa", crisis: true },
  
  // Global
  { id: "w23", name: "Амазонка", type: "RIVER", lat: -3.0, lng: -60.0, country: "Бразилия", qualityIndex: 82, region: "global" },
  { id: "w24", name: "Миссисипи", type: "RIVER", lat: 35.0, lng: -90.0, country: "США", qualityIndex: 71, region: "global" },
  { id: "w25", name: "Волга", type: "RIVER", lat: 48.0, lng: 44.0, country: "Россия", qualityIndex: 64, region: "global" },
  { id: "w26", name: "Байкал", type: "LAKE", lat: 53.5, lng: 108.0, country: "Россия", qualityIndex: 95, region: "global" },
];

// Projects
const projects = [
  { id: "p1", name: "Спасение Арала", lat: 45.0, lng: 60.0, type: "RESTORATION", raised: 2.5, target: 10, region: "central-asia" },
  { id: "p2", name: "Чистый Ганг", lat: 25.5, lng: 83.0, type: "CLEANUP", raised: 3.2, target: 8, region: "india" },
  { id: "p3", name: "Амазония Вотч", lat: -5.0, lng: -62.0, type: "MONITORING", raised: 5.0, target: 7, region: "global" },
  { id: "p4", name: "Нил Реньюал", lat: 24.0, lng: 33.0, type: "CLEANUP", raised: 1.8, target: 5, region: "africa" },
  { id: "p5", name: "Янцзы Протект", lat: 30.0, lng: 115.0, type: "CONSERVATION", raised: 4.2, target: 6, region: "china" },
  { id: "p6", name: "Мертвое море", lat: 31.5, lng: 35.5, type: "RESTORATION", raised: 2.1, target: 12, region: "middle-east" },
  { id: "p7", name: "Uzbekistan PPP", lat: 40.0, lng: 65.0, type: "INFRASTRUCTURE", raised: 25, target: 45, region: "central-asia" },
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

// Ring pulse animation component
function RingPulse({ color }: { color: string }) {
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
      <ringGeometry args={[0.06, 0.08, 32]} />
      <meshBasicMaterial ref={materialRef} color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

// Main Earth Component
function Earth({ 
  onMarkerClick, 
  activeLayer,
  isRotating,
  onRotationStop
}: { 
  onMarkerClick: (data: any) => void; 
  activeLayer: string;
  isRotating: boolean;
  onRotationStop: () => void;
}) {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const rotationSpeedRef = useRef(0.05);
  const controlsRef = useRef<any>(null);
  
  const [earthMap, bumpMap, specularMap] = useLoader(THREE.TextureLoader, [
    EARTH_TEXTURES.map,
    EARTH_TEXTURES.bumpMap,
    EARTH_TEXTURES.specularMap,
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
  });

  const handleMarkerClick = useCallback((data: any, e: any) => {
    e.stopPropagation();
    onRotationStop();
    onMarkerClick(data);
  }, [onMarkerClick, onRotationStop]);

  // Generate markers based on active layer
  const markers = useMemo(() => {
    const allMarkers: React.ReactNode[] = [];
    
    if (activeLayer === 'all' || activeLayer === 'objects') {
      waterObjects.forEach((obj) => {
        const position = latLngToVector3(obj.lat, obj.lng, 2.02);
        const color = obj.qualityIndex >= 70 ? "#22c55e" : 
                      obj.qualityIndex >= 50 ? "#eab308" : "#ef4444";
        const size = obj.crisis ? 0.05 : 0.03;
        
        allMarkers.push(
          <group key={`obj-${obj.id}`} position={position}>
            <mesh
              onClick={(e) => handleMarkerClick({ type: "object", data: obj }, e)}
              onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
              onPointerOut={() => { document.body.style.cursor = "default"; }}
            >
              <sphereGeometry args={[size, 16, 16]} />
              <meshBasicMaterial color={color} />
            </mesh>
            {obj.crisis && (
              <mesh>
                <octahedronGeometry args={[0.08, 0]} />
                <meshBasicMaterial color="#ef4444" transparent opacity={0.3} wireframe />
              </mesh>
            )}
            <RingPulse color={color} />
          </group>
        );
      });
    }
    
    if (activeLayer === 'all' || activeLayer === 'projects') {
      projects.forEach((project) => {
        const position = latLngToVector3(project.lat, project.lng, 2.04);
        
        allMarkers.push(
          <group key={`proj-${project.id}`} position={position}>
            <mesh
              onClick={(e) => handleMarkerClick({ type: "project", data: project }, e)}
              onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
              onPointerOut={() => { document.body.style.cursor = "default"; }}
            >
              <octahedronGeometry args={[0.05, 0]} />
              <meshBasicMaterial color="#22d3ee" />
            </mesh>
            <RingPulse color="#22d3ee" />
          </group>
        );
      });
    }
    
    if (activeLayer === 'all' || activeLayer === 'stations') {
      uzbekistanStations.forEach((station) => {
        const position = latLngToVector3(station.lat, station.lng, 2.03);
        const color = station.status === 'active' ? '#22c55e' : 
                      station.status === 'construction' ? '#eab308' : '#64748b';
        
        allMarkers.push(
          <group key={`station-${station.id}`} position={position}>
            <mesh
              onClick={(e) => handleMarkerClick({ type: "station", data: station }, e)}
              onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
              onPointerOut={() => { document.body.style.cursor = "default"; }}
            >
              <boxGeometry args={[0.04, 0.04, 0.08]} />
              <meshBasicMaterial color={color} />
            </mesh>
            <RingPulse color={color} />
          </group>
        );
      });
    }
    
    if (activeLayer === 'all' || activeLayer === 'labs') {
      vodLabNodes.forEach((lab) => {
        const position = latLngToVector3(lab.lat, lab.lng, 2.05);
        const color = lab.status === 'online' ? '#a855f7' : '#64748b';
        
        allMarkers.push(
          <group key={`lab-${lab.id}`} position={position}>
            <mesh
              onClick={(e) => handleMarkerClick({ type: "lab", data: lab }, e)}
              onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
              onPointerOut={() => { document.body.style.cursor = "default"; }}
            >
              <cylinderGeometry args={[0.02, 0.02, 0.08, 8]} />
              <meshBasicMaterial color={color} />
            </mesh>
            <mesh position={[0, 0.06, 0]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshBasicMaterial color={color} />
            </mesh>
            {lab.status === 'online' && <RingPulse color={color} />}
          </group>
        );
      });
    }
    
    return allMarkers;
  }, [activeLayer, handleMarkerClick]);

  return (
    <group>
      {/* Earth sphere */}
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
        <meshPhongMaterial transparent opacity={0.3} color={0xffffff} />
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
      {markers}
    </group>
  );
}

// Popup Component
function MarkerPopup({ data, onClose }: { data: any; onClose: () => void }) {
  if (!data) return null;
  
  const { type, data: item } = data;
  
  const getQualityColor = (index: number) => {
    if (index >= 70) return 'text-emerald-400';
    if (index >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="absolute left-1/2 -translate-x-1/2 top-[55%] w-80 md:w-96 bg-ocean-900/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 z-50"
    >
      <button 
        onClick={onClose}
        className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded-lg transition-colors"
      >
        <X className="w-5 h-5 text-slate-400" />
      </button>
      
      {type === 'object' && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${item.crisis ? 'bg-red-500/20' : 'bg-water-500/20'}`}>
              <Waves className={`w-6 h-6 ${item.crisis ? 'text-red-400' : 'text-water-400'}`} />
            </div>
            <div>
              <h3 className="font-bold text-white">{item.name}</h3>
              <p className="text-sm text-slate-400">{item.country}</p>
            </div>
          </div>
          
          {item.crisis && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Критическая ситуация</span>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Тип</p>
              <p className="text-sm text-white">{item.type === 'RIVER' ? 'Река' : item.type === 'LAKE' ? 'Озеро' : 'Море'}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Индекс качества</p>
              <p className={`text-sm font-bold ${getQualityColor(item.qualityIndex)}`}>
                {item.qualityIndex}/100
              </p>
            </div>
          </div>
          
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
            <div 
              className={`h-full rounded-full ${
                item.qualityIndex >= 70 ? 'bg-emerald-400' : 
                item.qualityIndex >= 50 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${item.qualityIndex}%` }}
            />
          </div>
        </>
      )}
      
      {type === 'project' && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-cyan-500/20">
              <Target className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-bold text-white">{item.name}</h3>
              <p className="text-sm text-slate-400">{item.type}</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Собрано</span>
              <span className="text-white font-medium">${item.raised}M</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Цель</span>
              <span className="text-white font-medium">${item.target}M</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-400 rounded-full"
                style={{ width: `${(item.raised / item.target) * 100}%` }}
              />
            </div>
          </div>
        </>
      )}
      
      {type === 'station' && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${
              item.status === 'active' ? 'bg-emerald-500/20' : 
              item.status === 'construction' ? 'bg-yellow-500/20' : 'bg-slate-500/20'
            }`}>
              <MapPin className={`w-6 h-6 ${
                item.status === 'active' ? 'text-emerald-400' : 
                item.status === 'construction' ? 'text-yellow-400' : 'text-slate-400'
              }`} />
            </div>
            <div>
              <h3 className="font-bold text-white">{item.name}</h3>
              <p className="text-sm text-slate-400">{item.location}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Тип</p>
              <p className="text-sm text-white">{item.type}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">IRR</p>
              <p className="text-sm font-bold text-emerald-400">{item.irr}%</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Инвестиции</p>
              <p className="text-sm text-white">${item.investment}M</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Статус</p>
              <p className="text-sm text-white capitalize">{item.status}</p>
            </div>
          </div>
        </>
      )}
      
      {type === 'lab' && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${item.status === 'online' ? 'bg-purple-500/20' : 'bg-slate-500/20'}`}>
              <Droplets className={`w-6 h-6 ${item.status === 'online' ? 'text-purple-400' : 'text-slate-400'}`} />
            </div>
            <div>
              <h3 className="font-bold text-white">{item.name}</h3>
              <p className="text-sm text-slate-400">{item.location}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Статус</p>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${item.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
                <span className="text-sm text-white capitalize">{item.status}</span>
              </div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Параметров</p>
              <p className="text-sm text-white">{item.parameters}</p>
            </div>
          </div>
        </>
      )}
      
      <button className="w-full py-3 bg-water-500 hover:bg-water-600 text-white rounded-xl font-medium transition-colors">
        Подробнее
      </button>
    </motion.div>
  );
}

// Main Globe3D Component
export default function Globe3D() {
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState<string>('all');
  const [isRotating, setIsRotating] = useState(true);
  const [stats, setStats] = useState({ objects: 26, projects: 7, stations: 5, labs: 5 });

  const layers = [
    { id: 'all', label: 'Все', icon: Globe2, color: 'text-white' },
    { id: 'objects', label: 'Объекты', icon: Waves, color: 'text-water-400' },
    { id: 'projects', label: 'Проекты', icon: Target, color: 'text-cyan-400' },
    { id: 'stations', label: 'Станции', icon: MapPin, color: 'text-emerald-400' },
    { id: 'labs', label: 'Лаборатории', icon: Droplets, color: 'text-purple-400' },
  ];

  const handleMarkerClick = useCallback((data: any) => {
    setSelectedMarker(data);
  }, []);

  const handleClosePopup = useCallback(() => {
    setSelectedMarker(null);
    setIsRotating(true);
  }, []);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-ocean-950 rounded-3xl overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Earth 
          onMarkerClick={handleMarkerClick}
          activeLayer={activeLayer}
          isRotating={isRotating}
          onRotationStop={() => setIsRotating(false)}
        />
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          autoRotate={false}
        />
      </Canvas>

      {/* Layer Controls */}
      <div className="absolute top-4 left-4 bg-ocean-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-water-400" />
          Слои
        </h3>
        <div className="space-y-2">
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${
                  activeLayer === layer.id 
                    ? 'bg-white/10 text-white' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${activeLayer === layer.id ? layer.color : ''}`} />
                {layer.label}
                <span className="ml-auto text-xs text-slate-500">
                  {layer.id === 'all' ? stats.objects + stats.projects + stats.stations + stats.labs :
                   layer.id === 'objects' ? stats.objects :
                   layer.id === 'projects' ? stats.projects :
                   layer.id === 'stations' ? stats.stations : stats.labs}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Panel */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <div className="bg-ocean-900/90 backdrop-blur-xl rounded-xl border border-white/10 px-4 py-2">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-white">{stats.objects + stats.projects + stats.stations + stats.labs} объектов</span>
          </div>
        </div>
        {!isRotating && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl px-4 py-2"
          >
            <div className="flex items-center gap-2 text-sm text-yellow-400">
              <Info className="w-4 h-4" />
              <span>Вращение остановлено</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-ocean-900/90 backdrop-blur-xl rounded-xl border border-white/10 p-4">
        <h4 className="text-xs font-semibold text-slate-400 mb-2">Легенда</h4>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Хорошее качество (70-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-slate-300">Среднее качество (50-69)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-slate-300">Плохое качество (0-49)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <span className="text-slate-300">Проект</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-sm" />
            <span className="text-slate-300">VOD-Lab</span>
          </div>
        </div>
      </div>

      {/* Marker Popup */}
      <AnimatePresence>
        {selectedMarker && (
          <MarkerPopup 
            data={selectedMarker} 
            onClose={handleClosePopup}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
