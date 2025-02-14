import type { Score } from "./score"

export type MultiplayerScoresCursor = {
  score_id: number
  total_score: number
}

export type MultiplayerScoresSort = "score_asc" | "score_desc"

export type MultiplayerScores = {
  cursor_string: string | null
  params: object
  scores: Score[]
  total: number | null //Index only. Total scores of the specified playlist item.
  user_score: Score | null //Index only. Score of the accessing user if exists.
}

export type MultiplayerScoresAround = {
  higher: MultiplayerScores
  lower: MultiplayerScores
}
