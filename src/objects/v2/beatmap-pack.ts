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

export type BeatmapPackOptional = {
  beatmapsets: Beatmapset[]
  user_completion_data: {
    beatmapset_ids: number[]
    completed: boolean
  }
}

export type BeatmapPackIncludes<T extends keyof BeatmapPackOptional = never> =
  BeatmapPack & Pick<BeatmapPackOptional, T>

export type BeatmapPacks = {
  beatmap_packs: BeatmapPack[]
  cursor: {
    pack_id: number
  } | null
  cursor_string: string | null
  next: () => Promise<BeatmapPacks | null>
}
