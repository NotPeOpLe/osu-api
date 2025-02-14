import type { RulesetStr } from "../osu"

export type BaseBeatmapDifficultyAttributes = {
  max_combo: number
  star_rating: number
}

export type OsuBeatmapDifficultyAttributes = BaseBeatmapDifficultyAttributes & {
  aim_difficulty: number
  approach_rate: number
  flashlight_difficulty: number
  overall_difficulty: number
  slider_factor: number
  speed_difficulty: number
}

export type TaikoBeatmapDifficultyAttributes = BaseBeatmapDifficultyAttributes & {
  stamina_difficulty: number
  rhythm_difficulty: number
  colour_difficulty: number
  approach_rate: number
  great_hit_window: number
}

export type FruitsBeatmapDifficultyAttributes = BaseBeatmapDifficultyAttributes & {
  approach_rate: number
}

export type ManiaBeatmapDifficultyAttributes = BaseBeatmapDifficultyAttributes & {
  great_hit_window: number
  score_multiplier: number
}

export type BeatmapDifficultyAttributes<T extends RulesetStr> = T extends RulesetStr ? {
  osu: OsuBeatmapDifficultyAttributes
  taiko: TaikoBeatmapDifficultyAttributes
  fruits: FruitsBeatmapDifficultyAttributes
  mania: ManiaBeatmapDifficultyAttributes
}[T] : BaseBeatmapDifficultyAttributes
