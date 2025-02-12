import { z } from "zod"

export const GameModeStr = ["osu", "taiko", "fruits", "mania"] as const
export enum GameMode {
  osu,
  taiko,
  fruits,
  mania,
}

export const zodGameModeInt = z
  .nativeEnum(GameMode)
  .or(z.enum(GameModeStr).transform((mode) => GameMode[mode]))
