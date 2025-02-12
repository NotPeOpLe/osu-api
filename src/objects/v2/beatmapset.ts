export type BeatmapsetCovers = {
  cover: string
  "cover@2x": string
  card: string
  "card@2x": string
  list: string
  "list@2x": string
  slimcover: string
  "slimcover@2x": string
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
