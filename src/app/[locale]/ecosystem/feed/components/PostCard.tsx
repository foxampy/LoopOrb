"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Droplets,
  Gavel,
  AlertTriangle,
  Award,
  TrendingUp
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

interface Post {
  id: string;
  content: string;
  images: string[];
  type: string;
  priority: number;
  createdAt: string;
  author: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    level: number;
    reputation: number;
  };
  project?: {
    id: string;
    name: string;
    slug: string;
  };
  object?: {
    id: string;
    name: string;
    type: string;
  };
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
}

interface PostCardProps {
  post: Post;
  onUpdate: (post: Post) => void;
}

const typeIcons: Record<string, any> = {
  NEWS: TrendingUp,
  PROJECT_UPDATE: Droplets,
  DAO_PROPOSAL: Gavel,
  CRISIS_ALERT: AlertTriangle,
  ACHIEVEMENT: Award,
};

const typeColors: Record<string, string> = {
  NEWS: "bg-blue-500/20 text-blue-400",
  PROJECT_UPDATE: "bg-emerald-500/20 text-emerald-400",
  DAO_PROPOSAL: "bg-purple-500/20 text-purple-400",
  CRISIS_ALERT: "bg-red-500/20 text-red-400",
  ACHIEVEMENT: "bg-yellow-500/20 text-yellow-400",
};

export function PostCard({ post, onUpdate }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    if (isLikeLoading) return;
    setIsLikeLoading(true);

    try {
      const res = await fetch(`/api/posts/id/like?id=${post.id}`, {
        method: "POST",
      });
      const data = await res.json();

      if (data.success) {
        setIsLiked(data.data.liked);
        setLikesCount(prev => data.data.liked ? prev + 1 : prev - 1);
        onUpdate({ ...post, isLiked: data.data.liked, likesCount: data.data.liked ? likesCount + 1 : likesCount - 1 });
      }
    } catch (error) {
      console.error("Like error:", error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `Post by ${post.author.name}`,
        text: post.content.slice(0, 100),
        url: window.location.origin + `/ecosystem/feed/${post.id}`,
      });
    } else {
      await navigator.clipboard.writeText(window.location.origin + `/ecosystem/feed/${post.id}`);
    }
  };

  const TypeIcon = typeIcons[post.type] || null;
  const typeColor = typeColors[post.type] || "bg-slate-500/20 text-slate-400";

  return (
    <article className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors">
      {/* Post Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.author.handle || post.author.id}`}>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-water-500 to-ocean-600 flex items-center justify-center text-white font-medium">
                {post.author.avatar ? (
                  <Image 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  post.author.name[0].toUpperCase()
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-ocean-800 border-2 border-ocean-900 flex items-center justify-center text-[10px] font-bold text-water-400">
                {post.author.level}
              </div>
            </div>
          </Link>
          
          <div>
            <Link href={`/profile/${post.author.handle || post.author.id}`}>
              <h4 className="font-medium text-white hover:text-water-400 transition-colors">
                {post.author.name}
              </h4>
            </Link>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>@{post.author.handle || post.author.id.slice(0, 8)}</span>
              <span>•</span>
              <time>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ru })}</time>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {TypeIcon && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${typeColor}`}>
              <TypeIcon className="w-3 h-3" />
              {post.type === 'CRISIS_ALERT' ? 'Alert' : post.type.replace('_', ' ')}
            </span>
          )}
          <button className="p-1 hover:bg-white/10 rounded-lg transition-colors">
            <MoreHorizontal className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-slate-200 whitespace-pre-wrap">{post.content}</p>
        
        {/* Mentions & Hashtags would be parsed here */}
      </div>

      {/* Post Images */}
      {post.images.length > 0 && (
        <div className={`grid gap-1 ${post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {post.images.slice(0, 4).map((image, index) => (
            <div 
              key={index} 
              className={`relative aspect-video bg-ocean-800 ${index === 3 && post.images.length > 4 ? 'opacity-50' : ''}`}
            >
              <Image
                src={image}
                alt={`Post image ${index + 1}`}
                fill
                className="object-cover"
              />
              {index === 3 && post.images.length > 4 && (
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                  +{post.images.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Context Links */}
      {(post.project || post.object) && (
        <div className="px-4 py-2 flex gap-2">
          {post.project && (
            <Link 
              href={`/projecthub/${post.project.slug}`}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs hover:bg-emerald-500/20 transition-colors"
            >
              <Droplets className="w-3 h-3" />
              {post.project.name}
            </Link>
          )}
          {post.object && (
            <Link 
              href={`/objects/${post.object.id}`}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs hover:bg-blue-500/20 transition-colors"
            >
              <Droplets className="w-3 h-3" />
              {post.object.name}
            </Link>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 flex items-center gap-6 border-t border-white/5">
        <button
          onClick={handleLike}
          disabled={isLikeLoading}
          className={`flex items-center gap-2 text-sm transition-colors ${
            isLiked ? 'text-red-400' : 'text-slate-400 hover:text-red-400'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likesCount}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-water-400 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.commentsCount}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-water-400 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Comments Section (Collapsible) */}
      {showComments && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-white/5"
        >
          {/* Comments would be loaded here */}
          <div className="p-4 text-center text-slate-400 text-sm">
            Комментарии скоро будут доступны
          </div>
        </motion.div>
      )}
    </article>
  );
}
