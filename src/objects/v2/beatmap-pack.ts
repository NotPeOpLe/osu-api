import type { Beatmapset } from "./beatmapset"

export type GetBeatmapPacksOptions = {
  type?: string
  cursor_string?: string
}

export type GetBeatmapPackOptions = {
  legacy_only?: boolean
}

export enum BeatmapPackType {
  standard = "S",
  featured = "F",
  tournament = "P",
  loved = "L",
  chart = "R",
  theme = "T",
  artist = "A",
}

export type BeatmapPack = {
  autor: string
  date: string
  name: string
  no_diff_reduction: boolean
  ruleset_id: number
  tag: BeatmapPackType
  url: string
}

export type GetBeatmapPacksResponse = BeatmapPack[]
export type GetBeatmapPackResponse = BeatmapPack & {
  beatmapsets: Beatmapset[]
  user_completion_data: {
    beatmapset_ids: number[]
    completed: boolean
  }
}
