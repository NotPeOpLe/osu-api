export type BeatmapsetCovers = {
  cover: string
  cover2x: string
  card: string
  card2x: string
  list: string
  list2x: string
  slimcover: string
  slimcover2x: string
}

export type Beatmapset = {
  artist: string
  artist_unicode: string
  covers: BeatmapsetCovers
  creator: string
  favourite_count: number
  id: number
  nsfw: boolean
  offset: number
  play_count: number
  preview_url: string
  source: string
  status: string
  spotlight: boolean
  title: string
  title_unicode: string
  user_id: number
  video: boolean
}
