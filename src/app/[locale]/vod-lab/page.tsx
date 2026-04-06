"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Microscope,
  Cpu,
  Wifi,
  Shield,
  CheckCircle2,
  Zap,
  Globe,
  ArrowRight,
  Download,
  ExternalLink,
  Beaker,
  Database,
  Lock,
  Award,
  Smartphone,
  Activity,
  Droplets,
  Thermometer,
  TestTube,
  FlaskConical,
  Radio,
  Wind,
  Eye,
  Heart,
  Users,
  MessageCircle,
  Share2,
  Mail,
  Star,
  TrendingUp,
  Calculator,
  Settings,
  Video,
  BookOpen,
  HelpCircle,
  Wrench,
  ChevronRight,
  ChevronLeft,
  X,
  Plus,
  Minus,
  ShoppingCart,
  Heart as HeartIcon,
  Filter,
  Sliders,
  Info,
  Play,
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  Percent,
  BarChart3,
  PieChart,
  LineChart,
  Package,
  Truck,
  CreditCard,
  Phone,
  MessageSquare,
  Send,
  ThumbsUp,
  Flag,
  MoreHorizontal,
  Copy,
  Link as LinkIcon,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Menu,
} from "lucide-react";
import Link from "next/link";

// ============================================================================
// DEVICE DATA FROM LITEPAPER
// ============================================================================

interface DeviceSpec {
  label: string;
  value: string;
  category: "physical" | "chemical" | "micro" | "organic" | "radio" | "ai";
}

interface Device {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  description: string;
  parameters: string;
  samplesPerDay: string;
  accuracy: string;
  deployment: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  category: "lab" | "portable" | "sensor" | "app";
  specs: DeviceSpec[];
  sensors: string[];
  ai: string[];
  useCases: string[];
  dimensions: string;
  weight: string;
  power: string;
  connectivity: string[];
  protection: string;
  tempRange: string;
  warranty: string;
  delivery: string;
}

const devices: Device[] = [
  {
    id: "vod-lab-pro",
    name: "VOD-Lab Pro",
    price: 13400,
    priceFormatted: "$13,400",
    description: "Professional distributed laboratory for stationary monitoring with maximum accuracy and Edge AI verification",
    parameters: "100+",
    samplesPerDay: "500 samples/day",
    accuracy: "±0.1% for pH, ±0.01 NTU",
    deployment: "Station-based",
    image: "pro",
    rating: 4.9,
    reviews: 127,
    inStock: false,
    category: "lab",
    specs: [
      { label: "Parameters", value: "100+ indicators", category: "chemical" },
      { label: "pH Accuracy", value: "±0.01", category: "physical" },
      { label: "Turbidimeter Accuracy", value: "±0.01 NTU", category: "physical" },
      { label: "Throughput", value: "500 samples/day", category: "physical" },
      { label: "Automation", value: "Full (24/7)", category: "ai" },
      { label: "Spectrophotometer", value: "UV-Vis-NIR (190-2500 nm)", category: "chemical" },
      { label: "Fluorimeter", value: "220-900 nm (Ex/Em)", category: "chemical" },
      { label: "Flow Cytometer", value: "For microbiology", category: "micro" },
      { label: "Radiometer", value: "α, β, γ radiation", category: "radio" },
      { label: "IR Spectrometer", value: "2.5-14 μm", category: "organic" },
      { label: "Connectivity", value: "5G, LoRaWAN, Satellite", category: "ai" },
      { label: "Protection", value: "IP68, -40°C to +60°C", category: "physical" },
      { label: "Calibration", value: "Automatic (AI)", category: "ai" },
      { label: "Power Consumption", value: "150W average", category: "physical" },
    ],
    sensors: [
      "Spectrophotometer (UV-Vis-NIR, 190-2500 nm)",
      "Electrochemical sensors (pH, ORP, EC, ISE)",
      "Laser turbidimeter (0-1000 NTU)",
      "Fluorimeter (algae, bacteria, organics)",
      "Gas sensors (CO2, H2S, CH4, O2)",
      "Heavy metals (ASV, ICP-MS preparation)",
      "Microbiology (PCR-ready, flow cytometry)",
      "Radiometer (α, β, γ activity)",
      "IR spectrometer (petroleum products, organics)",
      "Flow cytometer (total microbial count)",
    ],
    ai: [
      "Edge AI chip NVIDIA Jetson AGX Xavier (32 TOPS)",
      "On-site data verification (HSM secp256k1)",
      "Automatic diagnostics and predictive maintenance",
      "AI anomaly analysis (gradient, correlation, satellite)",
      "Automatic calibration using NIST reference samples",
      "Data anonymization (MPC for sensitive data)",
      "Autonomous updates via DAO multisignature",
    ],
    useCases: [
      "Urban water systems (continuous monitoring)",
      "Industrial wastewater (automatic discharge control)",
      "Treatment facilities (inlet/outlet control)",
      "Transboundary rivers (interstate monitoring)",
      "Reservoirs and tanks (strategic reserves)",
      "Scientific research (reference data)",
    ],
    dimensions: "60x40x30 cm",
    weight: "25 kg",
    power: "Solar panel 200W + LiFePO4 4 kWh (3 days autonomy)",
    connectivity: ["LoRaWAN", "Starlink", "4G/5G", "Fiber Optic", "Mesh WiFi"],
    protection: "IP68, IK10, stainless steel 316L",
    tempRange: "-40°C to +60°C",
    warranty: "5 years warranty, 10 years lifespan",
    delivery: "4-6 weeks",
  },
  {
    id: "vod-lab-node",
    name: "VOD-Lab Node",
    price: 8900,
    priceFormatted: "$8,900",
    description: "Portable node for mobile monitoring and rapid deployment with Cloud AI verification",
    parameters: "50",
    samplesPerDay: "200 samples/day",
    accuracy: "±0.5% for pH, ±0.1 NTU",
    deployment: "Portable/Mobile",
    image: "node",
    rating: 4.7,
    reviews: 89,
    inStock: false,
    category: "portable",
    specs: [
      { label: "Parameters", value: "50 key indicators", category: "chemical" },
      { label: "pH Accuracy", value: "±0.05", category: "physical" },
      { label: "Turbidimeter Accuracy", value: "±0.1 NTU", category: "physical" },
      { label: "Throughput", value: "200 samples/day", category: "physical" },
      { label: "Automation", value: "Semi-automatic", category: "ai" },
      { label: "Spectrophotometer", value: "UV-Vis (190-1100 nm)", category: "chemical" },
      { label: "Multispectral Analysis", value: "12 channels", category: "chemical" },
      { label: "Connectivity", value: "4G/5G, WiFi, Bluetooth", category: "ai" },
      { label: "Protection", value: "IP65, -20°C to +50°C", category: "physical" },
      { label: "Calibration", value: "Cartridge-based system", category: "ai" },
      { label: "Power Consumption", value: "50W average", category: "physical" },
    ],
    sensors: [
      "Multispectral analyzer (UV-Vis, 12 channels)",
      "pH/EC/Temp combined sensor",
      "Optical turbidimeter (0-4000 NTU)",
      "Dissolved oxygen (optical, luminescent)",
      "Organic compounds (TOC, UV oxidation)",
      "Nitrates/phosphates (photometry, molybdenum reaction)",
      "Ion-selective electrodes (NH4+, NO3-, F-)",
      "Immunofluorescent detector (E.coli, coliforms)",
    ],
    ai: [
      "ARM Cortex-A78 processor (8 cores)",
      "Cloud AI verification (network comparison)",
      "GPS/GLONASS tagging (0.5m accuracy)",
      "Offline mode (up to 72 hours)",
      "Instant results (1-5 minutes)",
      "Automatic report generation",
    ],
    useCases: [
      "Environmental inspections (field checks)",
      "Mobile laboratories (expeditions)",
      "Rapid deployment in emergencies",
      "Educational institutions (training)",
      "Farming operations (irrigation control)",
      "Mining companies (discharge monitoring)",
    ],
    dimensions: "35x25x20 cm",
    weight: "8 kg",
    power: "AC 220V + built-in battery 24V/10Ah (8 hours)",
    connectivity: ["4G/5G", "WiFi 6", "Bluetooth 5.0", "USB-C"],
    protection: "IP65, shockproof case",
    tempRange: "-20°C to +50°C",
    warranty: "3 years warranty, 7 years lifespan",
    delivery: "2-4 weeks",
  },
  {
    id: "vod-lab-mini",
    name: "VOD-Lab Mini",
    price: 4500,
    priceFormatted: "$4,500",
    description: "Compact system for basic monitoring with key parameters and automatic data transmission",
    parameters: "25",
    samplesPerDay: "50 samples/day",
    accuracy: "±1% for pH, ±0.5 NTU",
    deployment: "Compact Station",
    image: "mini",
    rating: 4.5,
    reviews: 156,
    inStock: false,
    category: "lab",
    specs: [
      { label: "Parameters", value: "25 basic indicators", category: "chemical" },
      { label: "pH Accuracy", value: "±0.1", category: "physical" },
      { label: "Turbidimeter Accuracy", value: "±0.5 NTU", category: "physical" },
      { label: "Throughput", value: "50 samples/day", category: "physical" },
      { label: "Automation", value: "Automatic", category: "ai" },
      { label: "Photometer", value: "Vis (400-700 nm, 8 channels)", category: "chemical" },
      { label: "Connectivity", value: "4G, WiFi, LoRaWAN", category: "ai" },
      { label: "Protection", value: "IP66, -10°C to +45°C", category: "physical" },
      { label: "Calibration", value: "Automatic (weekly)", category: "ai" },
      { label: "Power Consumption", value: "25W average", category: "physical" },
    ],
    sensors: [
      "Multi-channel photometer (8 wavelengths)",
      "Combined pH/EC/Temp sensor",
      "Turbidimeter (0-1000 NTU)",
      "Dissolved oxygen (galvanic)",
      "ORP (oxidation-reduction potential)",
      "Free/total chlorine (amperometric)",
      "Nitrates/nitrites/phosphates (photometry)",
      "Ammonium (ion-selective electrode)",
    ],
    ai: [
      "ESP32-S3 microcontroller (AI accelerator)",
      "Cloud verification (comparison with neighboring nodes)",
      "Automatic calibration (weekly)",
      "Predictive diagnostics (notifications)",
      "Automatic data transmission to blockchain",
    ],
    useCases: [
      "Small settlements (water supply control)",
      "Pools and water parks (quality control)",
      "Fish farms (aquaculture)",
      "Schools and universities (education)",
      "Hotels and resorts (water control)",
      "Food production (incoming control)",
    ],
    dimensions: "25x20x15 cm",
    weight: "4 kg",
    power: "AC 220V + solar panel 50W (optional)",
    connectivity: ["4G", "WiFi", "LoRaWAN", "Ethernet"],
    protection: "IP66, polycarbonate case",
    tempRange: "-10°C to +45°C",
    warranty: "2 years warranty, 5 years lifespan",
    delivery: "1-2 weeks",
  },
  {
    id: "smart-sensor",
    name: "Smart Sensor",
    price: 299,
    priceFormatted: "$299",
    description: "Personal sensor for continuous monitoring with real-time data transmission and integration into VODeco network",
    parameters: "10",
    samplesPerDay: "Real-time (every 5 min)",
    accuracy: "±2% for pH, ±1 NTU",
    deployment: "Personal/Consumer",
    image: "sensor",
    rating: 4.3,
    reviews: 423,
    inStock: false,
    category: "sensor",
    specs: [
      { label: "Parameters", value: "10 basic indicators", category: "physical" },
      { label: "pH Accuracy", value: "±0.2", category: "physical" },
      { label: "Turbidimeter Accuracy", value: "±1 NTU", category: "physical" },
      { label: "Measurement Frequency", value: "Every 5 minutes", category: "ai" },
      { label: "Battery Life", value: "Up to 6 months", category: "physical" },
      { label: "Connectivity", value: "Bluetooth + LoRaWAN", category: "ai" },
      { label: "Protection", value: "IP68, submersion up to 10m", category: "physical" },
      { label: "Calibration", value: "Every 3 months", category: "ai" },
    ],
    sensors: [
      "pH (ISFET glass electrode)",
      "Temperature (PT1000 thermistor, ±0.1°C)",
      "Electrical conductivity (0-100 mS/cm)",
      "Turbidity (90° optical scattering)",
      "Dissolved oxygen (optical)",
      "ORP (platinum electrode)",
      "Salinity (calculated)",
      "TDS (total dissolved solids)",
      "Water level (pressure)",
      "GPS coordinates (when synchronized)",
    ],
    ai: [
      "Bluetooth 5.0 + LoRaWAN (range up to 10 km)",
      "Integration with VOD Check (mobile app)",
      "Automatic transmission to VODeco network",
      "Notifications when out of range",
      "Cloud data history (free for 1 year)",
    ],
    useCases: [
      "Home wells and boreholes",
      "Aquariums and ponds",
      "Private plots (irrigation, pool)",
      "Educational projects (schools)",
      "Citizen science (volunteer monitoring)",
      "Fishing and recreation (site selection)",
    ],
    dimensions: "8x8x15 cm",
    weight: "0.5 kg",
    power: "CR2032 battery (6 months) + solar panel (optional)",
    connectivity: ["Bluetooth 5.0", "LoRaWAN", "NFC (for setup)",
    protection: "IP68, submersion up to 10m",
    tempRange: "0°C to +50°C",
    warranty: "1 year warranty, 3 years lifespan",
    delivery: "Pre-order",
  },
  {
    id: "water-expeditor",
    name: "Water Expeditor",
    price: 18000,
    priceFormatted: "$18,000",
    description: "Portable field analyzer in a rugged case - a laboratory in a suitcase for expeditions and inspections",
    parameters: "50+",
    samplesPerDay: "100 samples/day (field)",
    accuracy: "Laboratory accuracy",
    deployment: "Field Expedition",
    image: "expeditor",
    rating: 4.8,
    reviews: 67,
    inStock: false,
    category: "portable",
    specs: [
      { label: "Parameters", value: "50+ indicators", category: "chemical" },
      { label: "Spectrophotometer", value: "UV-Vis-NIR (190-2500 nm)", category: "chemical" },
      { label: "Microbiology", value: "Automatic cultivation (8 samples)", category: "micro" },
      { label: "Quick Tests", value: "Results in 5-15 minutes", category: "chemical" },
      { label: "Battery Life", value: "8 hours operation", category: "physical" },
      { label: "Kit Weight", value: "12 kg", category: "physical" },
      { label: "Protection", value: "Pelican Case, IP67", category: "physical" },
    ],
    sensors: [
      "Portable spectrophotometer (UV-Vis-NIR, 190-2500 nm, 3.2 kg)",
      "Automatic microbiological analyzer (fluorescence, 4-18 hours)",
      "Quick test strip set (10 parameters, 5-15 minutes)",
      "Digital photometer for reading (smartphone + adapter)",
      "Chemical tests (pH, hardness, chlorine, iron)",
      "Submersible pump (0-30 m)",
      "Sterile samplers (various volumes)",
      "Filters, reagents, consumables for 100 tests",
    ],
    ai: [
      "Rugged tablet (IP67, -20°C to +60°C, 1.2 kg)",
      "GPS/GLONASS/BeiDou (0.5m accuracy)",
      "Connectivity: satellite terminal (Iridium), 4G, WiFi",
      "Software: VOD Check Pro (offline mode, sync)",
      "HSM module for data signing",
      "Optional: sampling drone (2 kg payload, 5 km)",
    ],
    useCases: [
      "Environmental inspections (government)",
      "Scientific expeditions (field research)",
      "NGOs (river, lake monitoring)",
      "Insurance companies (risk assessment)",
      "Mining companies (discharge monitoring)",
      "Emergencies and disasters (rapid assessment)",
    ],
    dimensions: "50x40x25 cm (case)",
    weight: "12 kg (full kit)",
    power: "Built-in battery 24V/10Ah (8 hours) + 12V car adapter",
    connectivity: ["Iridium (satellite)", "4G/5G", "WiFi", "Bluetooth", "USB-C"],
    protection: "Pelican Case, IP67, shockproof",
    tempRange: "-20°C to +60°C",
    warranty: "3 years warranty",
    delivery: "4-6 weeks",
  },
  {
    id: "vod-check",
    name: "VOD Check",
    price: 0,
    priceFormatted: "Free",
    description: "Mobile app for citizens - check water, earn VODcredit, participate in DAO votes",
    parameters: "15 (with test kits)",
    samplesPerDay: "Unlimited",
    accuracy: "Depends on test kits",
    deployment: "Mobile App",
    image: "app",
    rating: 4.6,
    reviews: 2847,
    inStock: false,
    category: "app",
    specs: [
      { label: "Parameters", value: "15 with test kits", category: "chemical" },
      { label: "Platforms", value: "iOS, Android", category: "ai" },
      { label: "Languages", value: "20+ languages", category: "ai" },
      { label: "Rewards", value: "VODcredit for data", category: "ai" },
      { label: "Integration", value: "Smart Sensor, VOD-Lab", category: "ai" },
    ],
    sensors: [
      "Smartphone camera (test strip analysis)",
      "GPS (measurement geolocation)",
      "Bluetooth (Smart Sensor connection)",
      "Accelerometer (photo quality control)",
      "NFC (test kit reading)",
    ],
    ai: [
      "AI test strip recognition (95% accuracy)",
      "AI water photo analysis (turbidity, color, odor)",
      "Automatic data verification (reputation)",
      "Gamification (achievements, ratings, NFT)",
      "Social features (neighbor network, petitions)",
      "Access to water quality map (all sources)",
      "DAO voting (L4 decisions)",
    ],
    useCases: [
      "Tap water checking (daily)",
      "Well and borehole monitoring",
      "Water recreation (safety)",
      "Environmental activism (petitions)",
      "Education (courses, quests)",
      "Earning VODcredit (data sales)",
    ],
    dimensions: "Mobile app",
    weight: "Depends on device",
    power: "Device charge",
    connectivity: ["4G/5G", "WiFi", "Bluetooth", "GPS"],
    protection: "Depends on device",
    tempRange: "Depends on device",
    warranty: "Free",
    delivery: "Instant download",
  },
];

// ============================================================================
// COMPARISON DATA
// ============================================================================

const comparisonFeatures = [
  { feature: "Parameters", pro: "100+", node: "50", mini: "25", sensor: "10" },
  { feature: "pH Accuracy", pro: "+/-0.01", node: "+/-0.05", mini: "+/-0.1", sensor: "+/-0.2" },
  { feature: "Turbidimeter", pro: "Laser +/-0.01 NTU", node: "Optical +/-0.1 NTU", mini: "Optical +/-0.5 NTU", sensor: "Optical +/-1 NTU" },
  { feature: "Throughput", pro: "500/day", node: "200/day", mini: "50/day", sensor: "Real-time" },
  { feature: "Automation", pro: "Full 24/7", node: "Semi-auto", mini: "Auto", sensor: "Autonomous" },
  { feature: "Spectrophotometer", pro: "UV-Vis-NIR", node: "UV-Vis", mini: "Vis 8 channels", sensor: "-" },
  { feature: "Edge AI", pro: "NVIDIA Jetson 32 TOPS", node: "ARM Cortex-A78", mini: "ESP32-S3", sensor: "-" },
  { feature: "Connectivity", pro: "5G+Satellite", node: "4G/5G+WiFi", mini: "4G+LoRaWAN", sensor: "BT+LoRaWAN" },
  { feature: "Protection", pro: "IP68", node: "IP65", mini: "IP66", sensor: "IP68" },
  { feature: "Temperature", pro: "-40C..+60C", node: "-20C..+50C", mini: "-10C..+45C", sensor: "0C..+50C" },
  { feature: "Weight", pro: "25 kg", node: "8 kg", mini: "4 kg", sensor: "0.5 kg" },
  { feature: "Power", pro: "Solar 200W", node: "AC+battery", mini: "AC+solar", sensor: "Battery" },
  { feature: "Price", pro: "$13,400", node: "$8,900", mini: "$4,500", sensor: "$299" },
];

// ============================================================================
// REVIEWS
// ============================================================================

interface Review {
  id: number;
  author: string;
  role: string;
  device: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
  avatar: string;
}

const reviews: Review[] = [
  {
    id: 1,
    author: "Dr. Alexey Petrov",
    role: "Hydrochemist, Moscow State University",
    device: "VOD-Lab Pro",
    rating: 5,
    date: "February 15, 2025",
    text: "We use VOD-Lab Pro for monitoring the Moscow River. Accuracy is comparable to laboratory analyses, but data is real-time. Edge AI handles verification excellently. In 6 months of operation - not a single false trigger.",
    helpful: 47,
    avatar: "AP",
  },
  {
    id: 2,
    author: "Maria Ivanova",
    role: "Environmental Inspector",
    device: "VOD-Lab Node",
    rating: 5,
    date: "March 3, 2025",
    text: "Node is the perfect tool for field inspections. We deploy in 15 minutes, get results in 5 minutes. GPS tagging and automatic blockchain upload - indispensable for official reports.",
    helpful: 32,
    avatar: "MI",
  },
  {
    id: 3,
    author: "Green Valley Farm",
    role: "Agricultural Enterprise",
    device: "VOD-Lab Mini",
    rating: 4,
    date: "January 20, 2025",
    text: "Mini monitors irrigation water 24/7. Automatic nitrate exceedance notifications saved the harvest twice. Would like more soil parameters, but for water it is excellent.",
    helpful: 28,
    avatar: "GV",
  },
  {
    id: 4,
    author: "Dmitry Sokolov",
    role: "Private well owner",
    device: "Smart Sensor",
    rating: 5,
    date: "February 10, 2025",
    text: "Installed Smart Sensor in my well 3 months ago. Now I can see water quality in the app. When water quality deteriorated after rains - I got a notification. For $299 - the best investment in my family's health.",
    helpful: 89,
    avatar: "DS",
  },
  {
    id: 5,
    author: "Clean Volga Expedition",
    role: "Research Group",
    device: "Water Expeditor",
    rating: 5,
    date: "March 5, 2025",
    text: "We traveled 3,000 km along the Volga with Water Expeditor. A laboratory in a suitcase is not a metaphor. Microbiology was determined right on the shore, the spectrophotometer worked flawlessly. Satellite communication is a lifesaver in remote areas.",
    helpful: 56,
    avatar: "CE",
  },
  {
    id: 6,
    author: "Elena Kozlova",
    role: "Eco-activist",
    device: "VOD Check",
    rating: 5,
    date: "February 28, 2025",
    text: "VOD Check changed my understanding of ecology. I upload water measurements from the park - earn VODcredit. Already accumulated 500 coins, exchanged for test kits. The neighborhood network showed that 30% of residents in our area have iron exceedance. Together we achieved water utility inspection!",
    helpful: 124,
    avatar: "EK",
  },
];

// ============================================================================
// FAQ
// ============================================================================

const faqs = [
  {
    question: "How often does device calibration need?",
    answer: "VOD-Lab Pro calibrates automatically daily using NIST reference samples. VOD-Lab Node and Mini - weekly (automatic). Smart Sensor - every 3 months (manual calibration via app). Water Expeditor calibrates before each expedition.",
  },
  {
    question: "Can devices be integrated with existing SCADA systems?",
    answer: "Yes, all VOD-Lab devices support Modbus TCP/RTU, OPC UA, MQTT. We provide REST API and WebSocket for integration with any systems. Ready drivers for Siemens, Schneider Electric, Rockwell Automation.",
  },
  {
    question: "How does warranty and service work?",
    answer: "Warranty: Pro/Node/Expeditor - 3-5 years, Mini - 2 years, Smart Sensor - 1 year. Service: automatic diagnostics, notifications about cartridge/reagent replacement needs. Engineer dispatch within 72 hours (for Pro/Node).",
  },
  {
    question: "Can devices be purchased on lease?",
    answer: "Yes, we offer leasing from $800/month for VOD-Lab Pro (including service and cartridges). Special conditions for educational institutions and NGOs (up to 30% discount).",
  },
  {
    question: "How does data get into the blockchain?",
    answer: "Each device signs data via HSM module (ECDSA secp256k1). Data is transmitted to the validator network via LoRaWAN/satellite/4G. After verification by 2/3 of validators, data is recorded in VOD Chain (approximately 30 seconds).",
  },
  {
    question: "What if a device fails?",
    answer: "Automatic diagnostics warns about problems 24-72 hours in advance. In case of critical failure - automatic switch to backup node (if available in network). Device replacement within 7 days (for Pro/Node).",
  },
  {
    question: "Can devices be used outside the VODeco network?",
    answer: "Yes, devices work autonomously. But connecting to VODeco provides: automatic data verification, VOD emission for quality data, access to the water quality map, DAO participation. Without connection - only local data.",
  },
  {
    question: "Are there educational programs for working with devices?",
    answer: "Yes, VOD-Academy offers courses: 'VOD-Lab Operator' (120 hours, $500), 'Data in Water Management' (80 hours, $300). After training - NFT certificate + VODeco tokens + access to B2B features.",
  },
];

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function VodLabPage() {
  const [activeTab, setActiveTab] = useState<"pro" | "node">("pro");
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [roiModalOpen, setRoiModalOpen] = useState(false);
  const [configuratorOpen, setConfiguratorOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentVideo, setCurrentVideo] = useState<number>(0);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  // ROI Calculator state
  const [roiDevice, setRoiDevice] = useState("vod-lab-pro");
  const [roiWaterVolume, setRoiWaterVolume] = useState(100000);
  const [roiCurrentCost, setRoiCurrentCost] = useState(50);
  const [roiLaborCost, setRoiLaborCost] = useState(30000);

  const activeSpec = devices.find(d => d.id === `vod-lab-${activeTab}`) || devices[0];

  const toggleDeviceCompare = (deviceId: string) => {
    if (selectedDevices.includes(deviceId)) {
      setSelectedDevices(selectedDevices.filter(id => id !== deviceId));
    } else if (selectedDevices.length < 3) {
      setSelectedDevices([...selectedDevices, deviceId]);
    }
  };

  const toggleCart = (deviceId: string) => {
    if (cart.includes(deviceId)) {
      setCart(cart.filter(id => id !== deviceId));
    } else {
      setCart([...cart, deviceId]);
    }
  };

  const toggleFavorite = (deviceId: string) => {
    if (favorites.includes(deviceId)) {
      setFavorites(favorites.filter(id => id !== deviceId));
    } else {
      setFavorites([...favorites, deviceId]);
    }
  };

  const filteredDevices = devices.filter(device => {
    const matchesCategory = activeCategory === "all" || device.category === activeCategory;
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const videos = [
    { title: "VOD-Lab Pro: Feature Overview", duration: "12:34", views: "15K" },
    { title: "VOD-Lab Node: Installation and Setup", duration: "8:45", views: "8K" },
    { title: "Smart Sensor: Personal Water Monitoring", duration: "5:20", views: "23K" },
    { title: "Water Expeditor: In the Field", duration: "15:10", views: "6K" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8">
        {/* ============================================================================
            DEVELOPMENT BANNER
        ============================================================================ */}
        <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border-b border-amber-500/30 py-4 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Wrench className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl md:text-2xl font-bold text-amber-300 uppercase tracking-wide">All Devices In Development</h2>
              <Wrench className="w-6 h-6 text-amber-400" />
            </div>
            <p className="text-amber-200/90 max-w-3xl mx-auto">
              All devices are in development stage. No devices are currently available for purchase. Pre-orders and staking available.
            </p>
            <p className="text-amber-200/70 text-sm mt-2">
              VOD-Lab devices are currently in active development. You can pre-order or invest in the staking pool to support development.
            </p>
          </div>
        </div>

        {/* ============================================================================
            HERO SECTION
        ============================================================================ */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-water-500/10 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-water-500/10 text-water-400 mb-6">
                <Microscope className="w-4 h-4" />
                <span className="text-sm font-medium">VOD-Lab Hardware</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                The Laboratory of the Future
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-water-400 to-cyan-400">
                  for Water Monitoring
                </span>
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                Edge AI + Blockchain water verification in real time.
                From 10 to 100+ parameters with automatic calibration.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="px-8 py-4 bg-water-500 hover:bg-water-600 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  Request a Demo
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setRoiModalOpen(true)}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  ROI Calculator
                </button>
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Litepaper (PDF)
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { value: "6", label: "Devices in catalog" },
                  { value: "100+", label: "Analysis parameters" },
                  { value: "5000+", label: "Nodes in network" },
                  { value: "99.9%", label: "Data accuracy" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="text-3xl font-bold text-water-400 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================================
            DEVICE CATALOG
        ============================================================================ */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Device Catalog</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                From personal sensors to professional laboratories — choose a solution for your needs. All devices are in development.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex-1 min-w-[250px] relative">
                <input
                  type="text"
                  placeholder="Search devices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-water-500"
                />
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
              {[
                { id: "all", label: "All" },
                { id: "lab", label: "Laboratories" },
                { id: "portable", label: "Portable" },
                { id: "sensor", label: "Sensors" },
                { id: "app", label: "Apps" },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-water-500 text-white"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Device Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDevices.map((device, index) => (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-ocean-800 to-ocean-900 rounded-2xl border border-white/10 overflow-hidden hover:border-water-500/50 transition-all"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-water-500/10 to-cyan-500/10 flex items-center justify-center relative">
                    <div className="text-center p-6">
                      {device.image === "pro" && <Microscope className="w-24 h-24 text-water-400 mx-auto mb-4" />}
                      {device.image === "node" && <Beaker className="w-24 h-24 text-cyan-400 mx-auto mb-4" />}
                      {device.image === "mini" && <Package className="w-24 h-24 text-emerald-400 mx-auto mb-4" />}
                      {device.image === "sensor" && <Activity className="w-24 h-24 text-yellow-400 mx-auto mb-4" />}
                      {device.image === "expeditor" && <Truck className="w-24 h-24 text-orange-400 mx-auto mb-4" />}
                      {device.image === "app" && <Smartphone className="w-24 h-24 text-purple-400 mx-auto mb-4" />}
                      <h3 className="text-xl font-bold text-white mb-2">{device.name}</h3>
                      <div className="text-2xl font-bold text-water-400">{device.priceFormatted}</div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <div className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-medium animate-pulse">
                        <Wrench className="w-3 h-3 inline mr-1" />
                        IN DEVELOPMENT
                      </div>
                      {device.inStock && (
                        <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-medium">
                          <CheckCircle2 className="w-3 h-3 inline mr-1" />
                          In Stock
                        </div>
                      )}
                      {device.rating >= 4.8 && (
                        <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-xs font-medium">
                          <Star className="w-3 h-3 inline mr-1" />
                          Top Rated
                        </div>
                      )}
                    </div>

                    {/* Quick actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedDevice(device)}
                        className="p-3 bg-white/10 hover:bg-water-500 rounded-xl transition-colors"
                        title="Explore"
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => toggleCart(device.id)}
                        className="p-3 bg-white/10 hover:bg-water-500 rounded-xl transition-colors"
                        title={cart.includes(device.id) ? "Remove from cart" : "Add to cart"}
                      >
                        <ShoppingCart className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => toggleFavorite(device.id)}
                        className="p-3 bg-white/10 hover:bg-water-500 rounded-xl transition-colors"
                        title={favorites.includes(device.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <HeartIcon className={`w-5 h-5 text-white ${favorites.includes(device.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </button>
                      <button
                        onClick={() => setShareModalOpen(true)}
                        className="p-3 bg-white/10 hover:bg-water-500 rounded-xl transition-colors"
                        title="Share"
                      >
                        <Share2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{device.description}</p>

                    {/* Key specs */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-sm">
                        <div className="text-slate-500">Parameters</div>
                        <div className="font-semibold text-white">{device.parameters}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-slate-500">Throughput</div>
                        <div className="font-semibold text-white">{device.samplesPerDay}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-slate-500">Accuracy</div>
                        <div className="font-semibold text-white">{device.accuracy}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-slate-500">Delivery</div>
                        <div className="font-semibold text-white">{device.delivery}</div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-white">{device.rating}</span>
                        <span className="text-slate-400 text-sm">({device.reviews} reviews)</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedDevice(device)}
                        className="flex-1 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Wrench className="w-4 h-4" />
                        Pre-order / Stake
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleDeviceCompare(device.id)}
                        className={`px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                          selectedDevices.includes(device.id)
                            ? "bg-water-500 text-white"
                            : "bg-white/5 text-slate-400 hover:bg-white/10"
                        }`}
                      >
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setInviteModalOpen(true)}
                        className="px-4 py-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl font-medium transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Compare Bar */}
            {selectedDevices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
              >
                <div className="flex items-center gap-4 px-6 py-4 bg-ocean-900 border border-water-500/30 rounded-2xl shadow-2xl">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-water-400" />
                    <span className="text-white font-medium">
                      Compare: {selectedDevices.length}/3
                    </span>
                  </div>
                  <div className="flex -space-x-2">
                    {selectedDevices.map(id => {
                      const d = devices.find(dev => dev.id === id);
                      return (
                        <div
                          key={id}
                          className="w-8 h-8 rounded-full bg-water-500 flex items-center justify-center text-white text-xs font-bold border-2 border-ocean-900"
                        >
                          {d?.name.charAt(0)}
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setCompareModalOpen(true)}
                    className="px-4 py-2 bg-water-500 hover:bg-water-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Compare
                  </button>
                  <button
                    onClick={() => setSelectedDevices([])}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ============================================================================
            DETAIL SECTION (VOD-Lab Pro/Node)
        ============================================================================ */}
        <section className="py-20 bg-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Detailed Specifications</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Technical specifications of professional VOD-Lab laboratories. All devices are in development stage.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-12">
              {devices.slice(0, 2).map(device => (
                <button
                  key={device.id}
                  onClick={() => setActiveTab(device.id.includes("pro") ? "pro" : "node")}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                    (activeTab === "pro" && device.id.includes("pro")) ||
                    (activeTab === "node" && device.id.includes("node"))
                      ? device.id.includes("pro")
                        ? "bg-water-500 text-white"
                        : "bg-cyan-500 text-white"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {device.id.includes("pro") ? <Microscope className="w-5 h-5" /> : <Beaker className="w-5 h-5" />}
                    {device.name}
                  </div>
                  <div className="text-sm opacity-80">{device.priceFormatted}</div>
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-12 items-start"
            >
              {/* Product Visualization */}
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-ocean-800 to-ocean-900 border border-white/10 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-water-500/20 to-cyan-500/20 border border-water-500/30 flex items-center justify-center">
                      {activeTab === "pro" ? (
                        <Microscope className="w-24 h-24 text-water-400" />
                      ) : (
                        <Beaker className="w-24 h-24 text-cyan-400" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{activeSpec.name}</h3>
                    <p className="text-slate-400 mb-4">{activeSpec.description}</p>
                    <div className="text-3xl font-bold text-water-400">{activeSpec.priceFormatted}</div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium animate-pulse">
                  <Wrench className="w-4 h-4 inline mr-1" />
                  IN DEVELOPMENT
                </div>
                <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-water-500/20 border border-water-500/30 rounded-full text-water-400 text-sm font-medium">
                  <Award className="w-4 h-4 inline mr-1" />
                  Professional Choice
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-water-400" />
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {activeSpec.specs.slice(0, 8).map((spec, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white/5 rounded-xl border border-white/10"
                      >
                        <div className="text-sm text-slate-400 mb-1">{spec.label}</div>
                        <div className="font-semibold text-white">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Beaker className="w-5 h-5 text-water-400" />
                    Sensors & Analyzers
                  </h3>
                  <ul className="space-y-2">
                    {activeSpec.sensors.map((sensor, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-slate-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-water-400 mt-2 flex-shrink-0" />
                        {sensor}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-water-400" />
                    AI & Automation
                  </h3>
                  <ul className="space-y-2">
                    {activeSpec.ai.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-slate-300"
                      >
                        <Zap className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================================
            COMPARISON TABLE
        ============================================================================ */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Model Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-6 text-slate-400 font-medium">Feature</th>
                    <th className="text-center py-4 px-6 text-water-400 font-semibold">
                      <div className="flex flex-col items-center gap-1">
                        <Microscope className="w-6 h-6" />
                        Pro
                      </div>
                    </th>
                    <th className="text-center py-4 px-6 text-cyan-400 font-semibold">
                      <div className="flex flex-col items-center gap-1">
                        <Beaker className="w-6 h-6" />
                        Node
                      </div>
                    </th>
                    <th className="text-center py-4 px-6 text-emerald-400 font-semibold">
                      <div className="flex flex-col items-center gap-1">
                        <Package className="w-6 h-6" />
                        Mini
                      </div>
                    </th>
                    <th className="text-center py-4 px-6 text-yellow-400 font-semibold">
                      <div className="flex flex-col items-center gap-1">
                        <Activity className="w-6 h-6" />
                        Sensor
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-6 text-slate-300">{row.feature}</td>
                      <td className="py-4 px-6 text-center text-white font-medium">{row.pro}</td>
                      <td className="py-4 px-6 text-center text-slate-300">{row.node}</td>
                      <td className="py-4 px-6 text-center text-slate-300">{row.mini}</td>
                      <td className="py-4 px-6 text-center text-slate-300">{row.sensor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============================================================================
            USE CASES
        ============================================================================ */}
        <section className="py-20 bg-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Use Cases</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Real-world applications of VOD-Lab devices around the globe
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Droplets,
                  title: "Urban Systems",
                  description: "Continuous water supply monitoring, real-time contamination detection",
                  devices: ["VOD-Lab Pro", "VOD-Lab Mini"],
                },
                {
                  icon: FlaskConical,
                  title: "Industry",
                  description: "Industrial discharge control, automated regulatory reporting",
                  devices: ["VOD-Lab Pro", "VOD-Lab Node"],
                },
                {
                  icon: Leaf,
                  title: "Agriculture",
                  description: "Irrigation monitoring, nitrate control, irrigation optimization",
                  devices: ["VOD-Lab Mini", "Smart Sensor"],
                },
                {
                  icon: Truck,
                  title: "Expeditions",
                  description: "Field research, environmental inspections, emergencies",
                  devices: ["Water Expeditor", "VOD-Lab Node"],
                },
                {
                  icon: Smartphone,
                  title: "Citizen Science",
                  description: "Volunteer monitoring, eco-activism, education",
                  devices: ["VOD Check", "Smart Sensor"],
                },
                {
                  icon: GraduationCap,
                  title: "Education",
                  description: "Universities, schools, VOD-Academy courses",
                  devices: ["VOD-Lab Node", "VOD-Lab Mini"],
                },
              ].map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-gradient-to-br from-ocean-800 to-ocean-900 rounded-2xl border border-white/10 hover:border-water-500/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-water-500/20 flex items-center justify-center mb-4">
                    <useCase.icon className="w-6 h-6 text-water-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                  <p className="text-slate-400 mb-4">{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.devices.map(device => (
                      <span
                        key={device}
                        className="px-3 py-1 bg-white/5 rounded-full text-xs text-slate-300"
                      >
                        {device}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================================
            SECURITY & BLOCKCHAIN
        ============================================================================ */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Security & Verification
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                6 levels of data protection from physical sensor to blockchain
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: Shield, title: "Physical", desc: "IP68, tamper-proof" },
                { icon: Cpu, title: "Edge", desc: "Local AI verification" },
                { icon: Database, title: "Lab", desc: "Multi-sensor fusion" },
                { icon: Wifi, title: "Network", desc: "Encrypted transmission" },
                { icon: Lock, title: "Consensus", desc: "Peer validation" },
                { icon: Globe, title: "Blockchain", desc: "TON anchoring" },
              ].map((level, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-water-500/10 flex items-center justify-center">
                    <level.icon className="w-6 h-6 text-water-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-1">{level.title}</h4>
                  <p className="text-xs text-slate-400">{level.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================================
            REVIEWS REMOVED - No real reviews yet, devices in development
        ============================================================================ */}
        <section className="py-20 bg-white/5">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-3xl p-12 border border-amber-500/20">
              <MessageSquare className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Reviews Coming Soon
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                VOD-Lab devices are still in development. Real reviews from actual users will be posted once devices ship. Until then, you can pre-order or stake to support development.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================================
            EDUCATIONAL CONTENT
        ============================================================================ */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Training & Support</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Video reviews, instructions, FAQ and service support
              </p>
            </div>

            {/* Videos */}
            <div className="mb-16">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Video className="w-5 h-5 text-water-400" />
                Video Reviews
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {videos.map((video, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-video bg-gradient-to-br from-ocean-800 to-ocean-900 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-water-500/50 transition-all">
                      <div className="w-16 h-16 rounded-full bg-water-500/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white">
                        {video.duration}
                      </div>
                    </div>
                    <h4 className="font-medium text-white mt-3 mb-1 group-hover:text-water-400 transition-colors">
                      {video.title}
                    </h4>
                    <div className="text-sm text-slate-400">{video.views} views</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-water-400" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 max-w-4xl mx-auto">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="font-medium text-white">{faq.question}</span>
                      {activeFaq === index ? (
                        <Minus className="w-5 h-5 text-water-400" />
                      ) : (
                        <Plus className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                    <AnimatePresence>
                      {activeFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-slate-300">{faq.answer}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: "Instructions",
                  description: "Step-by-step guides for installation and operation",
                },
                {
                  icon: Wrench,
                  title: "Service",
                  description: "Warranty and post-warranty maintenance",
                },
                {
                  icon: MessageSquare,
                  title: "24/7 Support",
                  description: "Technical support via chat, email, phone",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-gradient-to-br from-ocean-800 to-ocean-900 rounded-2xl border border-white/10 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-water-500/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-water-400" />
                  </div>
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-slate-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================================
            CTA
        ============================================================================ */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-r from-water-500/10 to-cyan-500/10 rounded-3xl p-12 border border-water-500/20">
              <Award className="w-16 h-16 text-water-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Become a VOD-Lab Operator
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Install a node in your region, earn income from data verification,
                and participate in the global water monitoring network. Devices are in development — stake now to secure your spot.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/tokenhub"
                  className="px-8 py-4 bg-water-500 hover:bg-water-600 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  <Wrench className="w-5 h-5" />
                  Invest in Development
                </Link>
                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Request a Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================================
          MODALS
      ============================================================================ */}

      {/* Compare Modal */}
      <AnimatePresence>
        {compareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setCompareModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ocean-900 rounded-3xl border border-white/10 max-w-6xl w-full max-h-[90vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-ocean-900">
                <h3 className="text-2xl font-bold text-white">Device Comparison</h3>
                <button
                  onClick={() => setCompareModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-4 px-6 text-slate-400 font-medium">Feature</th>
                        {selectedDevices.map(id => {
                          const d = devices.find(dev => dev.id === id);
                          return (
                            <th key={id} className="text-center py-4 px-6 text-white font-semibold">
                              <div className="flex flex-col items-center gap-2">
                                {d?.image === "pro" && <Microscope className="w-8 h-8 text-water-400" />}
                                {d?.image === "node" && <Beaker className="w-8 h-8 text-cyan-400" />}
                                {d?.image === "mini" && <Package className="w-8 h-8 text-emerald-400" />}
                                {d?.image === "sensor" && <Activity className="w-8 h-8 text-yellow-400" />}
                                {d?.image === "expeditor" && <Truck className="w-8 h-8 text-orange-400" />}
                                {d?.image === "app" && <Smartphone className="w-8 h-8 text-purple-400" />}
                                {d?.name}
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: "Price", key: "priceFormatted" },
                        { label: "Parameters", key: "parameters" },
                        { label: "Throughput", key: "samplesPerDay" },
                        { label: "Accuracy", key: "accuracy" },
                        { label: "Weight", key: "weight" },
                        { label: "Protection", key: "protection" },
                        { label: "Temperature", key: "tempRange" },
                        { label: "Power", key: "power" },
                        { label: "Warranty", key: "warranty" },
                        { label: "Rating", key: "rating", format: (v: any) => `⭐ ${v}` },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-white/5">
                          <td className="py-4 px-6 text-slate-300">{row.label}</td>
                          {selectedDevices.map(id => {
                            const d = devices.find(dev => dev.id === id);
                            const value: any = d?.[row.key as keyof Device];
                            return (
                              <td key={id} className="py-4 px-6 text-center text-white">
                                {row.format ? row.format(value) : value}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROI Calculator Modal */}
      <AnimatePresence>
        {roiModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setRoiModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ocean-900 rounded-3xl border border-white/10 max-w-2xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-water-400" />
                  ROI Calculator
                </h3>
                <button
                  onClick={() => setRoiModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Device</label>
                  <select
                    value={roiDevice}
                    onChange={e => setRoiDevice(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-water-500"
                  >
                    {devices.filter(d => d.category !== "app").map(d => (
                      <option key={d.id} value={d.id} className="bg-ocean-900">
                        {d.name} — {d.priceFormatted}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Annual analysis volume (samples)
                  </label>
                  <input
                    type="number"
                    value={roiWaterVolume}
                    onChange={e => setRoiWaterVolume(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-water-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Current cost per analysis ($)
                  </label>
                  <input
                    type="number"
                    value={roiCurrentCost}
                    onChange={e => setRoiCurrentCost(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-water-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Annual personnel costs ($)
                  </label>
                  <input
                    type="number"
                    value={roiLaborCost}
                    onChange={e => setRoiLaborCost(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-water-500"
                  />
                </div>

                {/* ROI Results */}
                {(() => {
                  const device = devices.find(d => d.id === roiDevice);
                  if (!device) return null;
                  const currentAnnualCost = roiWaterVolume * roiCurrentCost + roiLaborCost;
                  const vodLabAnnualCost = roiWaterVolume * 5 + 800 * 12; // $5/analysis + maintenance
                  const annualSavings = currentAnnualCost - vodLabAnnualCost;
                  const paybackMonths = Math.ceil(device.price / (annualSavings / 12));
                  const roi5Years = ((annualSavings * 5 - device.price) / device.price) * 100;

                  return (
                    <div className="p-6 bg-water-500/10 rounded-xl border border-water-500/30">
                      <h4 className="font-bold text-white mb-4">Calculation Results</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-slate-400">Current costs/year</div>
                          <div className="text-2xl font-bold text-white">${currentAnnualCost.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">With VOD-Lab/year</div>
                          <div className="text-2xl font-bold text-white">${vodLabAnnualCost.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">Savings/year</div>
                          <div className="text-2xl font-bold text-emerald-400">${annualSavings.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">Payback</div>
                          <div className="text-2xl font-bold text-water-400">{paybackMonths} mo.</div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-water-500/30">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">5-year ROI</span>
                          <span className="text-3xl font-bold text-emerald-400">{roi5Years.toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Request Modal */}
      <AnimatePresence>
        {demoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setDemoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ocean-900 rounded-3xl border border-white/10 max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Request a Demo</h3>
                <button
                  onClick={() => setDemoModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-water-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-water-500"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-water-500"
                />
                <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-water-500">
                  <option value="" className="bg-ocean-900">Select a device</option>
                  {devices.map(d => (
                    <option key={d.id} value={d.id} className="bg-ocean-900">{d.name}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Comment (optional)"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-water-500 resize-none"
                />
                <button className="w-full px-6 py-4 bg-water-500 hover:bg-water-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Submit Request
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {shareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setShareModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ocean-900 rounded-3xl border border-white/10 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Share Device</h3>
                <button
                  onClick={() => setShareModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-3 bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-[#1877F2] rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                    <Facebook className="w-5 h-5" />
                    Facebook
                  </button>
                  <button className="flex-1 px-4 py-3 bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 text-[#1DA1F2] rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                    <Twitter className="w-5 h-5" />
                    Twitter
                  </button>
                </div>
                <button className="flex-1 w-full px-4 py-3 bg-[#0077B5]/20 hover:bg-[#0077B5]/30 text-[#0077B5] rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </button>
                <div className="pt-4 border-t border-white/10">
                  <label className="block text-sm text-slate-400 mb-2">Or copy the link</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value="https://looporb.io/vod-lab"
                      readOnly
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none"
                    />
                    <button className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors">
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invite Modal */}
      <AnimatePresence>
        {inviteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setInviteModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ocean-900 rounded-3xl border border-white/10 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Invite to Purchase</h3>
                <button
                  onClick={() => setInviteModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <input
                  type="email"
                  placeholder="Recipient email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-water-500"
                />
                <textarea
                  placeholder="Your message (optional)"
                  rows={4}
                  defaultValue="Hi! I found a great device for water monitoring. Check it out, I think you'd be interested."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-water-500 resize-none"
                />
                <button className="w-full px-6 py-4 bg-water-500 hover:bg-water-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Invite
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Missing icons
function Leaf(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
}

function GraduationCap(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/>
      <path d="M22 10v6"/>
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
    </svg>
  );
}
