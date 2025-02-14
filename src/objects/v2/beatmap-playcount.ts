import type { Beatmap } from "./beatmap"
import type { Beatmapset } from "./beatmapset"

export type BeatmapPlaycount = {
    beatmap_id: number
    beatmap: Beatmap | null
    beatmapset: Beatmapset | null
    count: number
}