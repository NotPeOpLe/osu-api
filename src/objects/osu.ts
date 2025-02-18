export enum RulesetInt {
  osu,
  taiko,
  fruits,
  mania,
}

export type RulesetStr = keyof typeof RulesetInt

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
