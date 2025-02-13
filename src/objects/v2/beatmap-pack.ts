import type { Beatmapset } from "./beatmapset"

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
  tag: string
  url: string
}

export type GetBeatmapPacksResponse = {
  beatmap_packs: BeatmapPack[]
  cursor: {
    pack_id: number
  } | null
  cursor_string: string | null
  next: () => Promise<GetBeatmapPacksResponse | null>
}

export type GetBeatmapPackResponse = BeatmapPack & {
  beatmapsets: Beatmapset[]
  user_completion_data: {
    beatmapset_ids: number[]
    completed: boolean
  }
}
