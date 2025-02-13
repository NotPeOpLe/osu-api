export type BeatmapDifficultyAttributes = {
  max_combo: number
  star_rating: number
}

export type OsuBeatmapDifficultyAttributes = BeatmapDifficultyAttributes & {
  aim_difficulty: number
  approach_rate: number
  flashlight_difficulty: number
  overall_difficulty: number
  slider_factor: number
  speed_difficulty: number
}

export type TaikoBeatmapDifficultyAttributes = BeatmapDifficultyAttributes & {
  stamina_difficulty: number
  rhythm_difficulty: number
  colour_difficulty: number
  approach_rate: number
  great_hit_window: number
}

export type FruitsBeatmapDifficultyAttributes = BeatmapDifficultyAttributes & {
  approach_rate: number
}

export type ManiaBeatmapDifficultyAttributes = BeatmapDifficultyAttributes & {
  great_hit_window: number
  score_multiplier: number
}
