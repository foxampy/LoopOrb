"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Image as ImageIcon, 
  MapPin, 
  X,
  Loader2,
  Hash
} from "lucide-react";


interface CreatePostProps {
  onPostCreated: (post: any) => void;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.user) {
          setUser(data.data.user);
        }
      });
  }, []);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    if (!content.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          images,
        }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        onPostCreated(data.data.post);
        setContent("");
        setImages([]);
        setIsExpanded(false);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // For now, just create object URLs (in production, upload to storage)
    Array.from(files).forEach(file => {
      if (images.length >= 4) return;
      const url = URL.createObjectURL(file);
      setImages(prev => [...prev, url]);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (!user) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 text-center">
        <p className="text-slate-400">Войдите, чтобы создать пост</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
      <div className="p-4">
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-water-500 to-ocean-600 flex items-center justify-center text-white font-medium flex-shrink-0">
            {user.name?.[0].toUpperCase() || "U"}
          </div>
          
          {/* Input Area */}
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Поделитесь новостью о воде..."
              className="w-full bg-transparent text-white placeholder-slate-500 resize-none outline-none min-h-[40px]"
              rows={isExpanded ? 3 : 1}
              maxLength={5000}
            />
            
            {/* Character Count */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-end text-xs text-slate-500 mt-1"
                >
                  {content.length}/5000
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Image Previews */}
        <AnimatePresence>
          {images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-2 mt-3 overflow-x-auto"
            >
              {images.map((image, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-lg bg-ocean-800 overflow-hidden">
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between mt-4 pt-4 border-t border-white/5"
            >
              <div className="flex items-center gap-2">
                {/* Image Upload */}
                <label className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-water-400 transition-colors cursor-pointer">
                  <ImageIcon className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={images.length >= 4}
                  />
                </label>
                
                {/* Location */}
                <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-water-400 transition-colors">
                  <MapPin className="w-5 h-5" />
                </button>
                
                {/* Hashtag */}
                <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-water-400 transition-colors">
                  <Hash className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    setContent("");
                    setImages([]);
                  }}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!content.trim() || isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-water-500 hover:bg-water-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Опубликовать
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
