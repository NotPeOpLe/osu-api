export const GameModeStr = ["osu", "taiko", "fruits", "mania"] as const
export enum GameMode {
  osu,
  taiko,
  fruits,
  mania,
}

import { z } from "zod"

// export type GameModeStr = keyof typeof GameModeInt

// export const GameModeStr = ["osu", "taiko", "fruits", "mania"] as const

// export const GameMode = {
//   osu: 0,
//   taiko: 1,
//   fruits: 2,
//   mania: 3,
// } as const

export const zodGameModeInt = z
  .nativeEnum(GameMode)
  .or(z.enum(GameModeStr).transform((mode) => GameMode[mode]))

zodGameModeInt.parse(0)
const x = zodGameModeInt.parse("osu")
