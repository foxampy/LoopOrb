import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Database types
export interface Profile {
  id: string
  email: string
  name: string
  avatar: string | null
  bio: string | null
  location: string | null
  website: string | null
  occupation: string | null
  created_at: string
  updated_at: string
}

export interface UserStats {
  user_id: string
  level: number
  xp: number
  reputation: number
  projects_created: number
  objects_added: number
  data_entries: number
  missions_completed: number
  followers: number
  following: number
}

export interface UserWallet {
  user_id: string
  balance: number
  staked_amount: number
  total_earned: number
  last_updated: string
}

export interface Project {
  id: string
  slug: string
  name: string
  description: string
  long_description: string | null
  status: 'concept' | 'development' | 'testing' | 'production'
  category: 'hardware' | 'software' | 'infrastructure' | 'research'
  budget: string
  timeline: string
  progress: number
  team_size: number
  impact: string
  video_url: string | null
  whitepaper_url: string | null
  preorder_enabled: boolean
  preorder_goal: number
  preorder_raised: number
  created_at: string
}

export interface Proposal {
  id: string
  title: string
  description: string
  category: string
  status: 'draft' | 'active' | 'passed' | 'rejected' | 'executed'
  level: 'L1_CONSTITUTIONAL' | 'L2_ECONOMIC' | 'L3_PROJECTS'
  votes_for: number
  votes_against: number
  votes_abstain: number
  start_date: string
  end_date: string
  created_by: string
  created_at: string
}

export interface Mission {
  id: string
  title: string
  description: string
  type: 'onboarding' | 'referral' | 'investment' | 'content' | 'data'
  reward_xp: number
  reward_tokens: number
  requirements: Record<string, any>
  is_active: boolean
  created_at: string
}

export interface ResearchPaper {
  id: string
  title: string
  authors: string[]
  abstract: string
  doi: string | null
  url: string
  published_date: string
  category: string
  verified: boolean
  submitted_by: string
  votes_up: number
  votes_down: number
  created_at: string
}

export interface Partner {
  id: string
  name: string
  type: 'government' | 'ngo' | 'corporate' | 'research'
  logo: string | null
  description: string
  website: string
  contact_email: string
  status: 'pending' | 'active' | 'inactive'
  created_at: string
}
