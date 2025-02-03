import * as z from "zod";
import { GameMode } from "./osu";
import { dateUTC } from "@/utils/zod-utils";

export enum Team {
  Blue = 1,
  Red = 2,
}

export enum TeamMode {
  HeadToHead = 0,
  TagCoop = 1,
  TeamVs = 2,
  TagTeamVs = 3,
}

export enum ScoreMode {
  Score = 0,
  Accuracy = 1,
  Combo = 2,
  ScoreV2 = 3,
}

export const MatchScoreSchema = z.object({
  slot: z.coerce.number(),
  team: z.nativeEnum(Team),
  user_id: z.coerce.number(),
  score: z.coerce.number(),
  maxcombo: z.coerce.number(),
  rank: z.coerce.number(),
  count50: z.coerce.number(),
  count100: z.coerce.number(),
  count300: z.coerce.number(),
  countmiss: z.coerce.number(),
  countgeki: z.coerce.number(),
  countkatu: z.coerce.number(),
  perfect: z.coerce.number().transform(Boolean),
  pass: z.coerce.number().transform(Boolean),
  enabled_mods: z.number().nullable(),
});

export const MatchInfoSchema = z.object({
  match_id: z.coerce.number(),
  name: z.string(),
  start_time: dateUTC,
  end_time: dateUTC.nullable(),
});

export const GameSchema = z.object({
  game_id: z.coerce.number(),
  start_time: dateUTC,
  end_time: dateUTC.nullable(),
  beatmap_id: z.coerce.number(),
  play_mode: z.nativeEnum(GameMode),
  match_type: z.coerce.number(),
  scoring_type: z.nativeEnum(ScoreMode),
  team_type: z.nativeEnum(TeamMode),
  mods: z.coerce.number(),
  scores: z.array(MatchScoreSchema),
});

export const MatchSchema = z.object({
  match: MatchInfoSchema,
  games: z.array(GameSchema),
});

export const getMatchParamsSchema = z.number();

export type Match = z.infer<typeof MatchSchema>;
