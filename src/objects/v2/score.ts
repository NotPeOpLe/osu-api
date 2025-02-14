import type { Beatmap } from "./beatmap"
import type { Beatmapset } from "./beatmapset"
import type { MultiplayerScoresAround } from "./multiplayer"

type Mod = {}
type ScoreStatistics = {}

export type Score = {
  accuracy: number
  beatmap_id: number
  best_id: number | null
  build_id: number | null
  classic_total_score: number // Only for solo_score type
  ended_at: string
  has_replay: boolean
  id: number
  is_perfect_combo: boolean
  legacy_perfect: boolean
  legacy_score_id: number | null
  legacy_total_score: number
  max_combo: number
  maximum_statistics: ScoreStatistics
  mods: Mod[]
  passed: boolean
  playlist_item_id: number // Only for multiplayer score
  ppn: number | null
  preserve: boolean // Whether or not the score may eventually be deleted. Only for solo_score type
  processed: boolean // Only for solo_score type
  rank: string
  ranked: boolean // Whether or not the score can have pp. Only for solo_score type
  room_id: number // Only for multiplayer score
  ruleset_id: number
  started_at: string | null
  statistics: ScoreStatistics
  total_score: number
  type: string
  user_id: number
}

export type ScoreOptional = {
    beatmap: Beatmap
    beatmapset: Beatmapset
    current_user_attributes: number | null	
    match: unknown // Only for legacy match score
    position: number | null // Only for multiplayer score
    rank_country: unknown
    rank_global: unknown
    scores_around: MultiplayerScoresAround | null //Scores around the specified score. Only for multiplayer score
    user: unknown
    weight: unknown
}

export type ScoreIncludes<T extends keyof ScoreOptional = never> = Score & Pick<ScoreOptional, T>