import type { BeatmapUserScore } from "./beatmap-userscores"
import type { Score } from "./score"

export type BeatmapScores = {
  scores: Score[]
  userScore: BeatmapUserScore | null
}
