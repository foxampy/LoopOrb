"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  X,
  AlertTriangle,
  Droplets,
  Fish,
  Palette,
  Upload,
  MapPin,
  Navigation,
  Check,
  ChevronRight,
  ChevronLeft,
  Camera,
  Video,
  Loader2,
  Sparkles,
  Trophy,
  DollarSign,
} from "lucide-react";

/**
 * Incident types
 */
export type IncidentType = "spill" | "fish_death" | "color_change" | "other";

/**
 * Emergency report data
 */
export interface EmergencyReportData {
  incidentType: IncidentType;
  description: string;
  mediaFiles: File[];
  mediaPreviews: string[];
  location: {
    lat: number | null;
    lng: number | null;
    address?: string;
  };
  contactEmail?: string;
  contactPhone?: string;
}

/**
 * Modal window steps
 */
type Step = "type" | "media" | "confirm";

/**
 * Incident type options
 */
const INCIDENT_TYPES: {
  id: IncidentType;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  rewardRange: string;
}[] = [
  {
    id: "spill",
    label: "Chemical Spill",
    description: "Chemical spill, petroleum products, hazardous substances",
    icon: Droplets,
    color: "from-amber-500 to-orange-600",
    rewardRange: "$100-500",
  },
  {
    id: "fish_death",
    label: "Fish Kill",
    description: "Mass mortality of aquatic organisms",
    icon: Fish,
    color: "from-red-500 to-rose-600",
    rewardRange: "$50-300",
  },
  {
    id: "color_change",
    label: "Water Color Change",
    description: "Unnatural water color change, algae bloom",
    icon: Palette,
    color: "from-purple-500 to-violet-600",
    rewardRange: "$50-200",
  },
  {
    id: "other",
    label: "Other",
    description: "Other critical contamination",
    icon: AlertTriangle,
    color: "from-slate-500 to-gray-600",
    rewardRange: "$50-150",
  },
];

/**
 * EmergencyModal - Modal window for reporting critical pollution incidents
 *
 * 3 steps:
 * 1. Select incident type
 * 2. Upload photo/video + geolocation
 * 3. Confirm and submit
 *
 * Design: neomorphism + retrofuturism
 * Mobile adaptation: bottom sheet on mobile devices
 */
export function EmergencyModal({
  onClose,
  onSubmit
}: {
  onClose: () => void;
  onSubmit: (data: EmergencyReportData) => Promise<void>;
}) {
  const t = useTranslations();
  const [currentStep, setCurrentStep] = useState<Step>("type");
  const [selectedType, setSelectedType] = useState<IncidentType | null>(null);
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [location, setLocation] = useState<{ lat: number | null; lng: number | null; address?: string }>({
    lat: null,
    lng: null,
    address: undefined,
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Block background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  /**
   * Get geolocation
   */
  const handleGetLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert(t("emergency.geoNotSupported"));
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert(t("emergency.geoPermissionDenied"));
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, [t]);

  /**
   * Handle file selection
   */
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validation: maximum 5 files
    const totalFiles = Math.min(files.length, 5 - mediaFiles.length);
    const selectedFiles = files.slice(0, totalFiles);

    // Validate types
    const validTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm"];
    const validFiles = selectedFiles.filter(file => validTypes.includes(file.type));

    if (validFiles.length !== selectedFiles.length) {
      alert(t("emergency.invalidFiles"));
    }

    // Create previews
    const previews = validFiles.map(file => URL.createObjectURL(file));

    setMediaFiles(prev => [...prev, ...validFiles]);
    setMediaPreviews(prev => [...prev, ...previews]);
  }, [mediaFiles.length]);

  /**
   * Remove media file
   */
  const handleRemoveMedia = useCallback((index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
    setMediaPreviews(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]);
      return newPreviews.filter((_, i) => i !== index);
    });
  }, []);

  /**
   * Navigate to next step
   */
  const handleNext = useCallback(() => {
    if (currentStep === "type" && selectedType) {
      setCurrentStep("media");
    } else if (currentStep === "media") {
      setCurrentStep("confirm");
    }
  }, [currentStep, selectedType]);

  /**
   * Navigate to previous step
   */
  const handleBack = useCallback(() => {
    if (currentStep === "media") {
      setCurrentStep("type");
    } else if (currentStep === "confirm") {
      setCurrentStep("media");
    }
  }, [currentStep]);

  /**
   * Submit report
   */
  const handleSubmit = useCallback(async () => {
    if (!selectedType) return;

    setIsSubmitting(true);

    try {
      const reportData: EmergencyReportData = {
        incidentType: selectedType,
        description,
        mediaFiles,
        mediaPreviews,
        location,
        contactEmail: contactEmail || undefined,
        contactPhone: contactPhone || undefined,
      };

      await onSubmit(reportData);
    } catch (error) {
      console.error("Error submitting report:", error);
      alert(t("emergency.submitError"));
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedType, description, mediaFiles, mediaPreviews, location, contactEmail, contactPhone, onSubmit]);

  /**
   * Check if can proceed to next step
   */
  const canProceed = () => {
    if (currentStep === "type") return !!selectedType;
    if (currentStep === "media") return mediaFiles.length > 0 || location.lat !== null;
    return true;
  };

  // Render type selection step
  const renderTypeStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Incident Type</h3>
        <p className="text-slate-400 text-sm">Select the pollution category</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {INCIDENT_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;

          return (
            <motion.button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`relative p-4 rounded-2xl border transition-all duration-300 text-left ${
                isSelected
                  ? "border-cyan-400/50 bg-cyan-500/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
              style={{
                boxShadow: isSelected
                  ? "0 0 30px rgba(34, 211, 238, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.1)"
                  : "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2.5 rounded-xl bg-gradient-to-br ${type.color} shrink-0`}
                  style={{
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {React.createElement(Icon, { className: "w-5 h-5 text-white" })}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white text-sm mb-1">{type.label}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{type.description}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Trophy className="w-3 h-3 text-amber-400" />
                    <span className="text-xs text-amber-400 font-medium">{type.rewardRange}</span>
                  </div>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Reward for report */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
        style={{
          boxShadow: "inset 0 2px 8px rgba(245, 158, 11, 0.1)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20">
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-200">Reward After Verification</p>
            <p className="text-xs text-amber-400/70">$50-500 VOD depending on type and confirmation</p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  // Render media upload step
  const renderMediaStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-white mb-2">Photo/Video & Geolocation</h3>
        <p className="text-slate-400 text-sm">Add evidence and specify location</p>
      </div>

      {/* File upload */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-300">Media Files</label>
        
        <motion.div
          onClick={() => fileInputRef.current?.click()}
          className="relative border-2 border-dashed border-white/20 rounded-2xl p-6 cursor-pointer hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all duration-300"
          style={{
            boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-3">
              <Upload className="w-6 h-6 text-cyan-400" />
            </div>
            <p className="text-sm text-white font-medium">Click to Upload</p>
            <p className="text-xs text-slate-400 mt-1">JPG, PNG, WebP, MP4, WebM (max 5 files)</p>
          </div>
        </motion.div>

        {/* Media previews */}
        {mediaPreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {mediaPreviews.map((preview, index) => {
              const isVideo = mediaFiles[index]?.type.startsWith("video/");
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                  style={{
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {isVideo ? (
                    <video src={preview} className="w-full h-full object-cover" />
                  ) : (
                    <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleRemoveMedia(index)}
                      className="p-2 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  {isVideo && (
                    <div className="absolute top-1 right-1 p-1 rounded bg-black/60">
                      <Video className="w-3 h-3 text-white" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Geolocation */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-300">Geolocation</label>

        <motion.button
          onClick={handleGetLocation}
          disabled={isGettingLocation}
          className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
          whileHover={{ scale: isGettingLocation ? 1 : 1.01 }}
          whileTap={{ scale: isGettingLocation ? 1 : 0.99 }}
        >
          {isGettingLocation ? (
            <>
              <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
              <span className="text-white font-medium">Getting coordinates...</span>
            </>
          ) : location.lat !== null ? (
            <>
              <div className="p-2 rounded-xl bg-green-500/20">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">Geolocation acquired</p>
                <p className="text-xs text-slate-400">
                  {location.lat?.toFixed(6)}, {location.lng?.toFixed(6)}
                </p>
              </div>
              <Navigation className="w-5 h-5 text-green-400 ml-auto" />
            </>
          ) : (
            <>
              <div className="p-2 rounded-xl bg-cyan-500/20">
                <MapPin className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-white font-medium">Determine location</span>
              <Navigation className="w-5 h-5 text-cyan-400 ml-auto" />
            </>
          )}
        </motion.button>

        {location.lat === null && (
          <p className="text-xs text-slate-500 text-center">
            Geolocation will be automatically added to the report
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what happened..."
          rows={3}
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 transition-colors resize-none"
          style={{
            boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>
    </div>
  );

  // Render confirmation step
  const renderConfirmStep = () => {
    const selectedIncident = INCIDENT_TYPES.find(t => t.id === selectedType);

    return (
      <div className="space-y-4">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-white mb-2">Confirmation</h3>
          <p className="text-slate-400 text-sm">Review data before submitting</p>
        </div>

        {/* Summary */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          {/* Incident type */}
          {selectedIncident && (
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-gradient-to-br ${selectedIncident.color}`}>
                {React.createElement(selectedIncident.icon, { className: "w-4 h-4 text-white" })}
              </div>
              <div>
                <p className="text-xs text-slate-400">Incident type</p>
                <p className="text-sm font-semibold text-white">{selectedIncident.label}</p>
              </div>
            </div>
          )}

          {/* Geolocation */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20">
              <MapPin className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Geolocation</p>
              <p className="text-sm font-semibold text-white">
                {location.lat !== null && location.lng !== null
                  ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
                  : "Not specified"}
              </p>
            </div>
          </div>

          {/* Media files */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20">
              <Camera className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Media files</p>
              <p className="text-sm font-semibold text-white">{mediaFiles.length} file(s)</p>
            </div>
          </div>

          {/* Reward */}
          {selectedIncident && (
            <div className="flex items-center gap-3 pt-3 border-t border-white/10">
              <div className="p-2 rounded-xl bg-amber-500/20">
                <Trophy className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Potential reward</p>
                <p className="text-sm font-bold text-amber-400">{selectedIncident.rewardRange} VOD</p>
              </div>
            </div>
          )}
        </div>

        {/* Contact details */}
        <div className="space-y-3">
          <p className="text-xs text-slate-400 text-center">
            Provide contact info (optional)
          </p>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 transition-colors text-sm"
            style={{
              boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
          <input
            type="tel"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="Phone"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 transition-colors text-sm"
            style={{
              boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>

        {/* Warning */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <p className="text-xs text-amber-200 text-center">
            ⚠️ False reporting is subject to liability
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        style={{
          background: "radial-gradient(ellipse at center, rgba(10, 22, 40, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)",
        }}
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full sm:max-w-lg sm:mx-4 pointer-events-auto"
          style={{
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          {/* Content container with neomorphism + retrofuturism design */}
          <div
            className="relative rounded-t-3xl sm:rounded-3xl overflow-hidden"
            style={{
              background: `
                linear-gradient(
                  145deg,
                  rgba(30, 41, 59, 0.95) 0%,
                  rgba(15, 23, 42, 0.98) 100%
                )
              `,
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: `
                0 25px 80px rgba(0, 0, 0, 0.5),
                0 0 100px rgba(34, 211, 238, 0.1),
                inset 0 1px 2px rgba(255, 255, 255, 0.1)
              `,
            }}
          >
            {/* Retrofuturistic decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
            
            <svg className="absolute top-4 right-4 w-24 h-24 pointer-events-none opacity-10" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="6 6" />
            </svg>

            {/* Header */}
            <div className="relative flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className="p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-orange-600"
                  style={{
                    boxShadow: "0 4px 15px rgba(239, 68, 68, 0.4)",
                  }}
                >
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Emergency Report</h2>
                  <p className="text-xs text-slate-400">Step {currentStep === "type" ? 1 : currentStep === "media" ? 2 : 3} of 3</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="relative px-5 py-3">
              <div className="flex gap-1">
                {(["type", "media", "confirm"] as Step[]).map((step, index) => {
                  const stepIndex = ["type", "media", "confirm"].indexOf(currentStep);
                  const isActive = index <= stepIndex;
                  const isCurrent = index === stepIndex;

                  return (
                    <div
                      key={step}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                        isActive
                          ? isCurrent
                            ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                            : "bg-cyan-500/50"
                          : "bg-white/10"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Body */}
            <div className="relative p-5 pt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentStep === "type" && renderTypeStep()}
                  {currentStep === "media" && renderMediaStep()}
                  {currentStep === "confirm" && renderConfirmStep()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer with navigation buttons */}
            <div className="relative flex items-center justify-between gap-3 p-5 pt-0 border-t border-white/10">
              {currentStep !== "type" ? (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
                  style={{
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </motion.button>
              ) : (
                <div />
              )}

              {currentStep !== "confirm" ? (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    boxShadow: "0 4px 15px rgba(34, 211, 238, 0.4)",
                  }}
                  whileHover={{ scale: canProceed() ? 1.02 : 1 }}
                  whileTap={{ scale: canProceed() ? 0.98 : 1 }}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting || !canProceed()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    boxShadow: "0 4px 15px rgba(34, 197, 94, 0.4)",
                  }}
                  whileHover={{ scale: !isSubmitting && canProceed() ? 1.02 : 1 }}
                  whileTap={{ scale: !isSubmitting && canProceed() ? 0.98 : 1 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Submit Report
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default EmergencyModal;
