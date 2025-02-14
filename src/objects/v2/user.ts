import type { RulesetStr } from "../osu"

export type User = {
  avatar_url: string
  country_code: string
  default_group: string | null
  id: number
  is_active: boolean
  is_bot: boolean
  is_deleted: boolean
  is_online: boolean
  is_supporter: boolean
  last_visit: string | null
  pm_friends_only: boolean
  profile_colour: string | null
  username: string
}

type UserAccountHistory = {
  description: string | null
  id: number
  length: number
  permanent: boolean
  timestamp: string
  type: string
}

type ProfileBanner = {
  id: number
  tournament_id: number
  image: string | null
  "image@2x": string | null
}

type UserBadge = {
  awarded_at: string
  description: string
  "image@2x_url": string
  image_url: string
  url: string
}

type UserGroup = {
  playmodes: string[] | null
}

type RankHighest = {
  rank: number
  updated_at: string
}

type UserMonthlyPlaycount = {}

type Kudosu = {
  available: number
  total: number
}

type UserStatistics = {
  count_100: number
  count_300: number
  count_50: number
  count_miss: number
  country_rank: number | null
  grade_counts: {
    a: number
    s: number
    sh: number
    ss: number
    ssh: number
  }
  hit_accuracy: number
  is_ranked: boolean
  level: {
    current: number
    progress: number
  }
  maximum_combo: number
  play_count: number
  play_time: number
  pp: number
  pp_exp: number
  global_rank: number | null
  global_rank_exp: number | null
  ranked_score: number
  replays_watched_by_others: number
  total_hits: number
  total_score: number
}

type UserStatisticsOtpional = {
  rank_change_since_30_days: number | null
  user: User
}

type UserStatisticsRulesets = {}

type ProfilePage =
  | "me"
  | "recent_activity"
  | "beatmaps"
  | "historical"
  | "kudosu"
  | "top_ranks"
  | "medals"

export type UserOptional = {
  account_history: UserAccountHistory[]
  active_tournament_banner: ProfileBanner | null //Deprecated, use active_tournament_banners instead.
  active_tournament_banners: ProfileBanner[]
  badges: UserBadge[]
  beatmap_playcounts_count: number
  blocks: unknown
  country: unknown
  cover: unknown
  favourite_beatmapset_count: number
  follow_user_mapping: number[]
  follower_count: number
  friends: unknown
  graveyard_beatmapset_count: number
  groups: UserGroup[]
  guest_beatmapset_count: number
  is_restricted: boolean | null
  kudosu: Kudosu
  loved_beatmapset_count: number
  mapping_follower_count: number
  monthly_playcounts: UserMonthlyPlaycount[]
  page: unknown
  pending_beatmapset_count: unknown
  previous_usernames: unknown
  rank_highest: RankHighest | null
  rank_history: unknown
  ranked_beatmapset_count: unknown
  replays_watched_counts: unknown
  scores_best_count: number
  scores_first_count: number
  scores_recent_count: number
  session_verified: boolean
  statistics: UserStatistics
  statistics_rulesets: UserStatisticsRulesets
  support_level: unknown
  unread_pm_count: unknown
  user_achievements: unknown
  user_preferences: unknown
}

export type UserIncludes<T extends keyof UserOptional = never> = User &
  Pick<UserOptional, T>

export type UserExtended<T extends keyof UserOptional = never> =
  UserIncludes<T> & {
    cover_url: string //url of profile cover. Deprecated, use cover.url instead.
    discord: string | null
    has_supported: boolean //Whether or not the user has a current or past osu!supporter tag.
    interests: string | null
    join_date: string
    location: string | null
    max_blocks: number //maximum number of users allowed to be blocked
    max_friends: number //maximum number of friends allowed to be added
    occupation: string | null
    playmode: RulesetStr
    playstyle: string[] //Device choices of the user.
    post_count: number //	Number of forum posts
    profile_hue: number | null //Custom colour hue in HSL degrees (0–359).
    profile_order: ProfilePage[] //ordered array of sections in user profile page
    title: string | null //user-specific title
    title_url: string | null
    twitter: string | null
    website: string | null
  }
