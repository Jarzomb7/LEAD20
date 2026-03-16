export type Plan = 'free' | 'pro' | 'agency'
export type Platform = 'facebook' | 'linkedin' | 'useme' | 'freelancer' | 'upwork' | 'twitter' | 'reddit' | 'other'
export type LeadStatus = 'new' | 'contacted' | 'negotiation' | 'won' | 'lost'

export interface Keyword {
  id: string
  user_id: string
  keyword: string
  is_active: boolean
  created_at: string
}

export interface Group {
  id: string
  user_id: string
  group_url: string
  group_name: string
  platform: Platform
  is_active: boolean
  created_at: string
}

export interface Lead {
  id: string
  user_id: string
  platform: Platform
  group_name: string
  post_text: string
  post_link: string
  score: number
  status: LeadStatus
  notes?: string
  keyword_matched?: string
  date_found: string
  created_at: string
}

export interface WebsiteAnalysis {
  url: string
  mobile_responsive: boolean
  has_meta_title: boolean
  has_meta_description: boolean
  has_privacy_policy: boolean
  has_cookie_banner: boolean
  page_speed_score: number
  issues: string[]
  recommendations: string[]
  score: number
}
