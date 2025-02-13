import type { Ruleset, RankStatusType, GameMode, RankStatus } from "../osu"
import type {
  Beatmapset,
  BeatmapsetExtended,
  BeatmapsetIncludes,
} from "./beatmapset"

export type BeatmapOwner = {
  id: number
  username: string
}

export type Failtimes = {
  exit: number[] | null
  fail: number[] | null
}

export type Beatmap = {
  beatmapset_id: number
  difficulty_rating: number
  id: number
  mode: Ruleset
  status: RankStatusType
  total_length: number
  user_id: number
  version: string
}

type BeatmapOptional<
  S extends Beatmapset | BeatmapsetIncludes | BeatmapsetExtended = Beatmapset,
> = {
  beatmapset: S | null
  failtimes: Failtimes
  max_combo: number
  owners: BeatmapOwner[]
  checksum: string | null
}

export type BeatmapIncludes<
  T extends keyof BeatmapOptional<S> = never,
  S extends Beatmapset | BeatmapsetIncludes | BeatmapsetExtended = Beatmapset,
> = Beatmap & Pick<BeatmapOptional<S>, T>

export type BeatmapExtended<
  T extends keyof BeatmapOptional<S> = never,
  S extends Beatmapset | BeatmapsetIncludes | BeatmapsetExtended = Beatmapset,
> = BeatmapIncludes<T, S> & {
  accuracy: number
  ar: number
  beatmapset_id: number
  bpm: number | null
  convert: boolean
  count_circles: number
  count_sliders: number
  count_spinners: number
  cs: number
  deleted_at: string | null
  drain: number
  hit_length: number
  is_scoreable: boolean
  last_updated: string
  mode_int: GameMode
  passcount: number
  playcount: number
  ranked: RankStatus
  url: string
}
