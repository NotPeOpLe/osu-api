export enum GameMode {
  osu,
  taiko,
  fruits,
  mania,
}

export type Ruleset = keyof typeof GameMode

export enum RankStatus {
  graveyard = -2,
  wip = -1,
  pending = 0,
  ranked = 1,
  approved = 2,
  qualified = 3,
  loved = 4,
}

export type RankStatusType = keyof typeof RankStatus
