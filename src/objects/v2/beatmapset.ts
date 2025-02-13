import type { RankStatus, Ruleset } from "../osu"
import type { Beatmap, BeatmapExtended, BeatmapIncludes } from "./beatmap"

export type BeatmapsetCovers = {
  cover: string
  "cover@2x": string
  card: string
  "card@2x": string
  list: string
  "list@2x": string
  slimcover: string
  "slimcover@2x": string
}

export type Beatmapset = {
  artist: string
  artist_unicode: string
  covers: BeatmapsetCovers
  creator: string
  favourite_count: number
  id: number
  nsfw: boolean
  offset: number
  play_count: number
  preview_url: string
  source: string
  status: string
  spotlight: boolean
  title: string
  title_unicode: string
  user_id: number
  video: boolean
}

export type Nomination = {
  beatmapset_id: number
  rulesets: Ruleset[]
  reset: boolean
  user_id: number
}

export type BeatmapsetOptional<
  B extends Beatmap | BeatmapIncludes | BeatmapExtended = Beatmap,
> = {
  beatmaps: B[]
  converts: boolean
  current_nominations: Nomination[]
  current_user_attributes: unknown
  description: unknown
  discussions: unknown
  events: unknown
  genre: unknown
  has_favourited: boolean
  language: unknown
  nominations: unknown
  pack_tags: string[]
  ratings: number[]
  recent_favourites: unknown
  related_users: unknown
  user: unknown
  track_id: number
}

export type BeatmapsetIncludes<
  T extends keyof BeatmapsetOptional<B> = never,
  B extends Beatmap | BeatmapIncludes | BeatmapExtended = Beatmap,
> = Beatmapset & Pick<BeatmapsetOptional<B>, T>

export type BeatmapsetExtended<
  T extends keyof BeatmapsetOptional<B> = never,
  B extends Beatmap | BeatmapIncludes | BeatmapExtended = Beatmap,
> = BeatmapsetIncludes<T, B> & {
  availability: {
    download_disabled: boolean
    more_information: string | null
  }
  bpm: number
  can_be_hyped: boolean
  deleted_at: string | null
  discussion_enabled: boolean
  discussion_locked: boolean
  hype: {
    current: number
    required: number
  }
  is_scoreable: boolean
  last_updated: string
  legacy_thread_url: string | null
  nominations_summary: {
    current: number
    eligible_main_rulesets: Ruleset[]
    required_meta: {
      main_ruleset: number
      non_main_ruleset: number
    }
  }
  ranked: RankStatus
  ranked_date: string | null
  source: string
  storyboard: boolean
  submitted_date: string | null
  tags: string
}
