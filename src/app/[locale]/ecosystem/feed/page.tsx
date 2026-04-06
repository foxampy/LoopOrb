"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CreatePost } from "./components/CreatePost";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Flag,
  MoreHorizontal,
  TrendingUp,
  Globe,
  MapPin,
  Building2,
  Droplets,
  Gavel,
  AlertTriangle,
  Award,
  Newspaper,
  Loader2,
  RefreshCw,
  Filter,
  SortAsc,
  Calendar,
  Users,
  Hash,
  Send,
  X,
  ChevronDown,
  Bell,
  UserPlus,
  Check,
  Copy,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  BookmarkCheck,
  Target,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { ru } from "date-fns/locale";
import { EmptyState } from "@/components/ui/EmptyState";

// ==================== TYPES ====================

type PostType =
  | "NEWS"
  | "SENSOR_DATA"
  | "PROJECT_ANNOUNCEMENT"
  | "DAO_PROPOSAL"
  | "ACHIEVEMENT"
  | "EDUCATIONAL"
  | "USER_POST"
  | "CRISIS_ALERT"
  | "PROJECT_MILESTONE"
  | "FRIEND_ACTIVITY"
  | "TRENDING"
  | "RECOMMENDED"
  | "GENERAL";

type FeedFilter = "all" | "projects" | "sensors" | "following" | "my-posts";
type FeedSort = "popular" | "new" | "discussed";
type TimePeriod = "day" | "week" | "month" | "all";

interface User {
  id: string;
  name: string;
  handle?: string;
  avatar?: string;
  level: number;
  reputation: number;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: User;
  likesCount: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface Post {
  id: string;
  content: string;
  images: string[];
  video?: string;
  files?: { name: string; url: string }[];
  type: PostType;
  priority: number;
  createdAt: string;
  author: User;
  project?: {
    id: string;
    name: string;
    slug: string;
    coverImage?: string;
  };
  object?: {
    id: string;
    name: string;
    type: string;
  };
  poll?: {
    question: string;
    options: { id: string; text: string; votes: number; percentage: number }[];
    totalVotes: number;
    userVoted?: string;
    endsAt?: string;
  };
  tags: string[];
  mentions: string[];
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isReposted: boolean;
  sensorData?: {
    type: "water_quality" | "air_quality" | "soil_moisture" | "temperature";
    value: number;
    unit: string;
    status: "normal" | "warning" | "critical";
    location: string;
  };
}

interface FeedStats {
  totalPosts: number;
  newToday: number;
  trending: number;
  alerts: number;
}

// Feed data is loaded from the backend API
// No mock data - platform is in development

// ==================== CONSTANTS ====================

const PRIORITY_ORDER: Record<PostType, number> = {
  CRISIS_ALERT: 10,
  DAO_PROPOSAL: 9,
  PROJECT_MILESTONE: 8,
  FRIEND_ACTIVITY: 7,
  TRENDING: 6,
  RECOMMENDED: 5,
  PROJECT_ANNOUNCEMENT: 4,
  ACHIEVEMENT: 4,
  EDUCATIONAL: 3,
  SENSOR_DATA: 2,
  USER_POST: 1,
  NEWS: 6,
  GENERAL: 0,
};

const typeIcons: Record<PostType, any> = {
  NEWS: TrendingUp,
  SENSOR_DATA: Droplets,
  PROJECT_ANNOUNCEMENT: Building2,
  DAO_PROPOSAL: Gavel,
  ACHIEVEMENT: Award,
  EDUCATIONAL: Newspaper,
  USER_POST: Users,
  CRISIS_ALERT: AlertTriangle,
  PROJECT_MILESTONE: Award,
  FRIEND_ACTIVITY: Users,
  TRENDING: TrendingUp,
  RECOMMENDED: TrendingUp,
  GENERAL: Newspaper,
};

const typeColors: Record<PostType, string> = {
  NEWS: "bg-blue-500/20 text-blue-400",
  SENSOR_DATA: "bg-cyan-500/20 text-cyan-400",
  PROJECT_ANNOUNCEMENT: "bg-emerald-500/20 text-emerald-400",
  DAO_PROPOSAL: "bg-purple-500/20 text-purple-400",
  ACHIEVEMENT: "bg-yellow-500/20 text-yellow-400",
  EDUCATIONAL: "bg-indigo-500/20 text-indigo-400",
  USER_POST: "bg-slate-500/20 text-slate-400",
  CRISIS_ALERT: "bg-red-500/20 text-red-400 animate-pulse",
  PROJECT_MILESTONE: "bg-green-500/20 text-green-400",
  FRIEND_ACTIVITY: "bg-pink-500/20 text-pink-400",
  TRENDING: "bg-orange-500/20 text-orange-400",
  RECOMMENDED: "bg-violet-500/20 text-violet-400",
  GENERAL: "bg-gray-500/20 text-gray-400",
};

const typeLabels: Record<PostType, string> = {
  NEWS: "News",
  SENSOR_DATA: "Sensor Data",
  PROJECT_ANNOUNCEMENT: "Project Announcement",
  DAO_PROPOSAL: "DAO Vote",
  ACHIEVEMENT: "Achievement",
  EDUCATIONAL: "Education",
  USER_POST: "User Post",
  CRISIS_ALERT: "Alert",
  PROJECT_MILESTONE: "Project Milestone",
  FRIEND_ACTIVITY: "Friend Activity",
  TRENDING: "Trending",
  RECOMMENDED: "Recommended",
  GENERAL: "General",
};

const filterOptions = [
  { id: "all" as FeedFilter, label: "All", icon: Globe },
  { id: "projects" as FeedFilter, label: "Projects", icon: Building2 },
  { id: "sensors" as FeedFilter, label: "Sensors", icon: Droplets },
  { id: "following" as FeedFilter, label: "Following", icon: Users },
  { id: "my-posts" as FeedFilter, label: "My Posts", icon: Newspaper },
];

const sortOptions = [
  { id: "popular" as FeedSort, label: "Popular", icon: TrendingUp },
  { id: "new" as FeedSort, label: "New", icon: SortAsc },
  { id: "discussed" as FeedSort, label: "Discussed", icon: MessageCircle },
];

const timePeriods = [
  { id: "day" as TimePeriod, label: "Day", icon: Calendar },
  { id: "week" as TimePeriod, label: "Week", icon: Calendar },
  { id: "month" as TimePeriod, label: "Month", icon: Calendar },
  { id: "all" as TimePeriod, label: "All time", icon: Calendar },
];

// ==================== COMPONENTS ====================

// Share Modal Component
function ShareModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.origin + `/ecosystem/feed/${post.id}` : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: "Telegram",
      icon: Send,
      color: "bg-blue-500",
      action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`, "_blank"),
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500",
      action: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.content.slice(0, 100))}`,
          "_blank"
        ),
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank"),
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700",
      action: () =>
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        ),
    },
    {
      name: "Copy",
      icon: copied ? Check : Copy,
      color: "bg-slate-600",
      action: handleCopy,
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full sm:max-w-md bg-[#0a1628] border border-white/10 rounded-t-2xl sm:rounded-2xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Share</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.action}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center`}>
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-slate-400">{option.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Пост от ${post.author.name}`,
                    text: post.content.slice(0, 100),
                    url: shareUrl,
                  });
                }
              }}
              className="w-full py-3 bg-water-500 hover:bg-water-600 text-white rounded-xl font-medium transition-colors"
            >
              More options
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Report Modal Component
function ReportModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const [reason, setReason] = useState("");
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportReasons = [
    { id: "spam", label: "Spam", icon: TrendingUp },
    { id: "harassment", label: "Harassment", icon: Users },
    { id: "misinformation", label: "Misinformation", icon: AlertTriangle },
    { id: "nsfw", label: "Inappropriate content", icon: Flag },
    { id: "other", label: "Other", icon: MoreHorizontal },
  ];

  const handleSubmit = async () => {
    if (!selectedReason) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-md bg-[#0a1628] border border-white/10 rounded-2xl p-6 mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 mb-6">
            <Flag className="w-6 h-6 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Report</h3>
          </div>

          <p className="text-slate-400 text-sm mb-4">
            Select a reason for reporting this post from {post.author.name}:
          </p>

          <div className="space-y-2 mb-4">
            {reportReasons.map((reason) => (
              <button
                key={reason.id}
                onClick={() => setSelectedReason(reason.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                  selectedReason === reason.id
                    ? "border-red-500/50 bg-red-500/10"
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                <reason.icon className="w-5 h-5 text-slate-400" />
                <span className="text-white">{reason.label}</span>
                {selectedReason === reason.id && <Check className="w-5 h-5 text-red-400 ml-auto" />}
              </button>
            ))}
          </div>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Additional details (optional)"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 resize-none focus:outline-none focus:border-water-500"
            rows={3}
          />

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedReason || isSubmitting}
              className="flex-1 py-3 bg-red-500 hover:bg-red-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Comments Section Component
function CommentsSection({ post, onClose }: { post: Post; onClose: () => void }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    // Load comments
    fetch(`/api/posts/id/comments?id=${post.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setComments(data.data.comments || []);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [post.id]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/posts/id/comments?id=${post.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment.trim() }),
      });
      const data = await res.json();

      if (data.success) {
        setComments([data.data.comment, ...comments]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Comment error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInvite = () => {
    setShowInviteModal(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full sm:max-w-2xl bg-[#0a1628] border border-white/10 rounded-t-2xl sm:rounded-2xl flex flex-col max-h-[80vh] sm:max-h-[70vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-water-400" />
              Комментарии ({post.commentsCount})
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleInvite}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Пригласить друга"
              >
                <UserPlus className="w-5 h-5 text-slate-400" />
              </button>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 text-water-500 animate-spin" />
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Be the first to comment</p>
              </div>
            ) : (
              comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmitComment()}
                placeholder="Write a comment..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-water-500"
              />
              <button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || isSubmitting}
                className="px-6 py-3 bg-water-500 hover:bg-water-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Comment Item Component
function CommentItem({ comment }: { comment: Comment }) {
  const [isLiked, setIsLiked] = useState(comment.isLiked);
  const [likesCount, setLikesCount] = useState(comment.likesCount);

  const handleLike = async () => {
    // Optimistic update
    setIsLiked(!isLiked);
    setLikesCount((prev) => prev + (isLiked ? -1 : 1));

    // API call would go here
  };

  return (
    <div className="bg-white/5 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-water-500 to-ocean-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
          {comment.author.avatar ? (
            <Image src={comment.author.avatar} alt={comment.author.name} width={32} height={32} className="rounded-full" />
          ) : (
            comment.author.name[0].toUpperCase()
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-white text-sm">{comment.author.name}</span>
            <span className="text-xs text-slate-500">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: ru })}
            </span>
          </div>
          <p className="text-slate-300 text-sm">{comment.content}</p>
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs transition-colors ${
                isLiked ? "text-red-400" : "text-slate-500 hover:text-red-400"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              {likesCount}
            </button>
            <button className="text-xs text-slate-500 hover:text-water-400 transition-colors">
              Reply
            </button>
          </div>
        </div>
      </div>
      {/* Replies would be nested here */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 ml-8 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}

// Invite Modal Component
function InviteModal({ onClose }: { onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  // Friends list will be loaded from API when social features are available
  const filteredFriends: { id: string; name: string; handle: string; avatar: string }[] = [];

  const toggleFriend = (id: string) => {
    setSelectedFriends((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const handleInvite = () => {
    // Send invitations
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-md bg-[#0a1628] border border-white/10 rounded-2xl p-6 mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Invite Friends</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search friends..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-water-500 mb-4"
          />

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredFriends.map((friend) => (
              <button
                key={friend.id}
                onClick={() => toggleFriend(friend.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                  selectedFriends.includes(friend.id)
                    ? "border-water-500/50 bg-water-500/10"
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-water-500 to-ocean-600 flex items-center justify-center text-white font-medium">
                  {friend.avatar ? (
                    <Image src={friend.avatar} alt={friend.name} width={40} height={40} className="rounded-full" />
                  ) : (
                    friend.name[0].toUpperCase()
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-white text-sm">{friend.name}</div>
                  <div className="text-xs text-slate-500">{friend.handle}</div>
                </div>
                {selectedFriends.includes(friend.id) && (
                  <Check className="w-5 h-5 text-water-400" />
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleInvite}
              disabled={selectedFriends.length === 0}
              className="flex-1 py-3 bg-water-500 hover:bg-water-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
            >
              Invite ({selectedFriends.length})
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Poll Component
function PollCard({ poll, onVote }: { poll: Post["poll"]; onVote: (optionId: string) => void }) {
  const [votedOption, setVotedOption] = useState<string | undefined>(poll?.userVoted);
  const [localVotes, setLocalVotes] = useState(poll?.options.map((o) => o.votes) || []);

  const handleVote = (optionId: string) => {
    if (votedOption) return; // Already voted
    setVotedOption(optionId);
    // API call would go here
    onVote(optionId);
  };

  if (!poll) return null;

  return (
    <div className="mt-4 bg-white/5 rounded-xl p-4">
      <p className="font-medium text-white mb-4">{poll.question}</p>
      <div className="space-y-2">
        {poll.options.map((option, index) => {
          const hasVoted = votedOption !== undefined;
          const isVotedOption = votedOption === option.id;
          const percentage = hasVoted ? option.percentage : 0;

          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              className={`w-full relative overflow-hidden rounded-lg p-3 text-left transition-colors ${
                hasVoted
                  ? isVotedOption
                    ? "bg-water-500/20 border border-water-500/50"
                    : "bg-white/5 border border-white/10"
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
            >
              {hasVoted && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`absolute inset-y-0 left-0 ${isVotedOption ? "bg-water-500/30" : "bg-slate-500/20"}`}
                />
              )}
              <div className="relative flex items-center justify-between">
                <span className="text-white text-sm">{option.text}</span>
                {hasVoted && <span className="text-slate-400 text-sm font-medium">{percentage}%</span>}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-3 text-xs text-slate-500">
        {poll.totalVotes.toLocaleString()} votes •{" "}
        {poll.endsAt
          ? `Ends ${formatDistanceToNow(new Date(poll.endsAt))}`
          : "Voting has ended"}
      </div>
    </div>
  );
}

// Post Card Component
function PostCardComponent({
  post,
  onUpdate,
}: {
  post: Post;
  onUpdate: (post: Post) => void;
}) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  const controls = useAnimation();

  const handleLike = async () => {
    if (isLikeAnimating) return;

    setIsLikeAnimating(true);
    await controls.start({ scale: [1, 1.3, 1], transition: { duration: 0.3 } });

    setIsLiked(!isLiked);
    setLikesCount((prev) => prev + (isLiked ? -1 : 1));

    try {
      const res = await fetch(`/api/posts/id/like?id=${post.id}`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        onUpdate({ ...post, isLiked: !isLiked, likesCount: likesCount + (isLiked ? -1 : 1) });
      }
    } catch (error) {
      console.error("Like error:", error);
    }

    setTimeout(() => setIsLikeAnimating(false), 300);
  };

  const handleBookmark = async () => {
    setIsBookmarked(!isBookmarked);
    onUpdate({ ...post, isBookmarked: !isBookmarked });
    // API call would go here
  };

  const TypeIcon = typeIcons[post.type];
  const typeColor = typeColors[post.type];

  // Swipe gestures for mobile
  const swipeConstraints = { x: ["-100%", "100%"] };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, info) => {
          // Swipe left to report, swipe right to like
          if (info.offset.x > 100) {
            handleLike();
          } else if (info.offset.x < -100) {
            setShowReportModal(true);
          }
        }}
      >
        {/* Post Header */}
        <div className="p-4 flex items-start justify-between">
          <Link href={`/profile/${post.author.handle || post.author.id}`} className="flex items-center gap-3">
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
            <div>
              <h4 className="font-medium text-white hover:text-water-400 transition-colors">
                {post.author.name}
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{post.author.handle || post.author.id.slice(0, 8)}</span>
                <span>•</span>
                <time>
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ru })}
                </time>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${typeColor}`}>
              <TypeIcon className="w-3 h-3" />
              {typeLabels[post.type]}
            </span>
            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <MoreHorizontal className="w-5 h-5 text-slate-400" />
              </button>
              <AnimatePresence>
                {showMoreMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 top-full mt-1 w-48 bg-[#0a1628] border border-white/10 rounded-xl shadow-xl z-10 overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        handleBookmark();
                        setShowMoreMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-white/5 transition-colors"
                    >
                      <BookmarkCheck className="w-4 h-4" />
                      {isBookmarked ? "Remove from bookmarks" : "Bookmark"}
                    </button>
                    <button
                      onClick={() => {
                        setShowShareModal(true);
                        setShowMoreMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-white/5 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    <button
                      onClick={() => {
                        setShowReportModal(true);
                        setShowMoreMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Flag className="w-4 h-4" />
                      Report
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-slate-200 whitespace-pre-wrap">{post.content}</p>

          {/* Hashtags & Mentions */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag) => (
                <span key={tag} className="text-water-400 text-sm hover:underline cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sensor Data Display */}
        {post.sensorData && (
          <div className="mx-4 mb-3 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Droplets className="w-8 h-8 text-cyan-400" />
                <div>
                  <div className="text-sm text-slate-400">{post.sensorData.location}</div>
                  <div className="text-2xl font-bold text-white">
                    {post.sensorData.value} {post.sensorData.unit}
                  </div>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  post.sensorData.status === "critical"
                    ? "bg-red-500/20 text-red-400 animate-pulse"
                    : post.sensorData.status === "warning"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {post.sensorData.status === "critical"
                  ? "Critical"
                  : post.sensorData.status === "warning"
                  ? "Warning"
                  : "Normal"}
              </div>
            </div>
          </div>
        )}

        {/* Post Images */}
        {post.images.length > 0 && (
          <div
            className={`grid gap-1 ${
              post.images.length === 1
                ? "grid-cols-1"
                : post.images.length === 2
                ? "grid-cols-2"
                : "grid-cols-3"
            }`}
          >
            {post.images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className={`relative aspect-video bg-ocean-800 ${
                  index === 3 && post.images.length > 4 ? "opacity-50" : ""
                }`}
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

        {/* Video */}
        {post.video && (
          <div className="mx-4 my-3 relative aspect-video bg-ocean-800 rounded-xl overflow-hidden">
            <video src={post.video} controls className="w-full h-full" />
          </div>
        )}

        {/* Poll */}
        {post.poll && <PollCard poll={post.poll} onVote={() => {}} />}

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
        <div className="px-4 py-3 flex items-center justify-between border-t border-white/5">
          <div className="flex items-center gap-1 sm:gap-6">
            <motion.button
              animate={controls}
              onClick={handleLike}
              className={`flex items-center gap-2 text-sm transition-colors ${
                isLiked ? "text-red-400" : "text-slate-400 hover:text-red-400"
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              <span className="hidden sm:inline">{likesCount}</span>
            </motion.button>

            <button
              onClick={() => setShowComments(true)}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-water-400 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">{post.commentsCount}</span>
            </button>

            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-water-400 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:inline">{post.repostsCount}</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked ? "text-water-400 bg-water-500/10" : "text-slate-400 hover:bg-white/10"
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </motion.article>

      {/* Modals */}
      {showComments && <CommentsSection post={post} onClose={() => setShowComments(false)} />}
      {showShareModal && <ShareModal post={post} onClose={() => setShowShareModal(false)} />}
      {showReportModal && <ReportModal post={post} onClose={() => setShowReportModal(false)} />}
    </>
  );
}

// Feed Stats Component
function FeedStatsCard({ stats }: { stats: FeedStats }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
      <h3 className="font-semibold text-white mb-4">Feed Stats</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">Total posts</span>
          <span className="text-white font-medium">{stats.totalPosts.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">New today</span>
          <span className="text-green-400 font-medium">+{stats.newToday}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">Trending</span>
          <span className="text-orange-400 font-medium">{stats.trending}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">Alerts</span>
          <span className="text-red-400 font-medium">{stats.alerts}</span>
        </div>
      </div>
    </div>
  );
}

// Trending Tags Component
function TrendingTagsCard({ tags }: { tags: { tag: string; count: number }[] }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
      <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-water-400" />
        Trends
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(({ tag, count }) => (
          <button
            key={tag}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full text-xs text-slate-300 transition-colors flex items-center gap-1"
          >
            <Hash className="w-3 h-3 text-slate-500" />
            {tag}
            <span className="text-slate-500">{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ==================== MAIN PAGE COMPONENT ====================

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FeedFilter>("all");
  const [sortBy, setSortBy] = useState<FeedSort>("popular");
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [trendingTags, setTrendingTags] = useState<{ tag: string; count: number }[]>([]);
  const [stats, setStats] = useState<FeedStats>({ totalPosts: 0, newToday: 0, trending: 0, alerts: 0 });
  const [showFilters, setShowFilters] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);
  const pullRef = useRef<HTMLDivElement>(null);
  const [pullDistance, setPullDistance] = useState(0);

  // Load initial data
  useEffect(() => {
    loadFeed();
    calculateTrendingTags();
  }, []);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [page, hasMore, isLoading]);

  // Pull to refresh
  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      pullRef.current?.addEventListener("touchmove", handleTouchMove);
      pullRef.current?.addEventListener("touchend", handleTouchEnd);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    const distance = Math.max(0, (e as any).touches[0].clientY - 50);
    setPullDistance(Math.min(distance, 150));
  };

  const handleTouchEnd = () => {
    if (pullDistance > 80) {
      handleRefresh();
    }
    setPullDistance(0);
    pullRef.current?.removeEventListener("touchmove", handleTouchMove);
    pullRef.current?.removeEventListener("touchend", handleTouchEnd);
  };

  const loadFeed = async () => {
    setIsLoading(true);
    try {
      // TODO: Fetch from API when backend is ready
      // const res = await fetch(`/api/feed?filter=${activeFilter}&sort=${sortBy}&page=${page}`);
      // const data = await res.json();
      // setPosts(data.data.posts);
      // applyFiltersAndSort(data.data.posts);
      setPosts([]);
      setFilteredPosts([]);
    } catch (error) {
      console.error("Feed load error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    if (!hasMore) return;
    setPage((prev) => prev + 1);
    // Simulate loading more posts
    await new Promise((resolve) => setTimeout(resolve, 500));
    // In production, fetch from API with pagination
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadFeed();
    setIsRefreshing(false);
  };

  const calculateTrendingTags = () => {
    // Will be calculated from real posts when backend is ready
    setTrendingTags([]);
  };

  const applyFiltersAndSort = (postsToFilter: Post[]) => {
    let filtered = [...postsToFilter];

    // Filter by type
    if (activeFilter === "projects") {
      filtered = filtered.filter(
        (p) =>
          p.type === "PROJECT_ANNOUNCEMENT" ||
          p.type === "PROJECT_MILESTONE" ||
          p.project !== undefined
      );
    } else if (activeFilter === "sensors") {
      filtered = filtered.filter((p) => p.type === "SENSOR_DATA" || p.sensorData !== undefined);
    } else if (activeFilter === "following") {
      // In production, filter by followed users
      filtered = filtered.filter((p) => p.type === "FRIEND_ACTIVITY");
    } else if (activeFilter === "my-posts") {
      // TODO: Filter by authenticated user when auth is implemented
      filtered = [];
    }

    // Filter by time period
    const now = new Date();
    const timeFilters: Record<TimePeriod, number> = {
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      all: Infinity,
    };

    if (timePeriod !== "all") {
      const cutoff = now.getTime() - timeFilters[timePeriod];
      filtered = filtered.filter((p) => new Date(p.createdAt).getTime() > cutoff);
    }

    // Sort
    if (sortBy === "popular") {
      filtered.sort((a, b) => b.likesCount - a.likesCount);
    } else if (sortBy === "new") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "discussed") {
      filtered.sort((a, b) => b.commentsCount - a.commentsCount);
    }

    // Priority sort (CRISIS_ALERT > DAO_PROPOSAL > etc.)
    filtered.sort((a, b) => PRIORITY_ORDER[b.type] - PRIORITY_ORDER[a.type]);

    setFilteredPosts(filtered);
  };

  useEffect(() => {
    applyFiltersAndSort(posts);
  }, [activeFilter, sortBy, timePeriod, posts]);

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
  };

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-20 pb-8"
        ref={pullRef}
        onTouchStart={handleTouchStart}
      >
        {/* Pull to refresh indicator */}
        {pullDistance > 0 && (
          <div
            className="fixed top-16 left-0 right-0 flex justify-center pointer-events-none z-40"
            style={{ transform: `translateY(${pullDistance - 100}px)` }}
          >
            <div className="bg-water-500/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
              <RefreshCw className={`w-4 h-4 text-water-400 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="text-sm text-water-400">
                {pullDistance > 80 ? "Release to refresh" : "Pull to refresh"}
              </span>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Newspaper className="w-6 h-6 text-water-400" />
                    Ecosystem Feed
                  </h1>
                  <p className="text-slate-400 text-sm">
                    News, sensor data, DAO votes and more
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <RefreshCw
                      className={`w-5 h-5 text-slate-400 ${isRefreshing ? "animate-spin" : ""}`}
                    />
                  </button>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2 rounded-lg transition-colors ${
                      showFilters ? "bg-water-500/20 text-water-400" : "bg-white/5 hover:bg-white/10 text-slate-400"
                    }`}
                  >
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Create Post */}
              <CreatePost onPostCreated={handlePostCreated} />

              {/* Filters Bar */}
              <div className="space-y-3">
                {/* Main Filters */}
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setActiveFilter(option.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          activeFilter === option.id
                            ? "bg-water-500 text-white"
                            : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{option.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Advanced Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-wrap gap-2 overflow-hidden"
                    >
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm">
                        <SortAsc className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400">Sort:</span>
                        {sortOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <button
                              key={option.id}
                              onClick={() => setSortBy(option.id)}
                              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-colors ${
                                sortBy === option.id
                                  ? "bg-water-500/20 text-water-400"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              <Icon className="w-3 h-3" />
                              {option.label}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400">Period:</span>
                        {timePeriods.map((option) => {
                          const Icon = option.icon;
                          return (
                            <button
                              key={option.id}
                              onClick={() => setTimePeriod(option.id)}
                              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-colors ${
                                timePeriod === option.id
                                  ? "bg-water-500/20 text-water-400"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              <Icon className="w-3 h-3" />
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Posts Feed */}
              {isLoading && page === 1 ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 text-water-500 animate-spin" />
                </div>
              ) : filteredPosts.length === 0 ? (
                <EmptyState
                  type="empty"
                  title="Feed Coming Soon"
                  description="The LoopOrb feed is currently under development. Soon you'll see news, sensor data, DAO votes, project updates, and community posts here. Stay tuned!"
                  className="py-16"
                />
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {filteredPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <PostCardComponent post={post} onUpdate={handlePostUpdate} />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Load More Indicator */}
                  <div ref={observerTarget} className="py-8 flex justify-center">
                    {hasMore ? (
                      <Loader2 className="w-6 h-6 text-slate-600 animate-spin" />
                    ) : (
                      <p className="text-slate-500 text-sm">No more posts</p>
                    )}
                  </div>
                </div>
              )}

              {!isLoading && filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <Globe className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No posts</h3>
                  <p className="text-slate-400">Try changing filters</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <FeedStatsCard stats={stats} />
              <TrendingTagsCard tags={trendingTags} />

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-water-500/10 to-cyan-500/10 rounded-xl border border-water-500/20 p-4">
                <h3 className="font-semibold text-white mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Link
                    href="/ecosystem/missions"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Target className="w-5 h-5 text-water-400" />
                    <div>
                      <div className="text-sm font-medium text-white">Missions</div>
                      <div className="text-xs text-slate-400">Earn UNITY</div>
                    </div>
                  </Link>
                  <Link
                    href="/dao"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Gavel className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-sm font-medium text-white">DAO</div>
                      <div className="text-xs text-slate-400">Participate in votes</div>
                    </div>
                  </Link>
                  <Link
                    href="/projecthub"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Building2 className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-sm font-medium text-white">Projects</div>
                      <div className="text-xs text-slate-400">Find a project you like</div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-water-500/10 to-cyan-500/10 rounded-xl border border-water-500/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-water-400" />
                  <h3 className="font-semibold text-white">LoopOrb Daily</h3>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                  Get the top water news every morning
                </p>
                <button className="w-full py-2 bg-water-500 hover:bg-water-600 text-white rounded-lg text-sm font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
