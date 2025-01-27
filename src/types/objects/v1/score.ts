import * as z from "zod";
import { GameMode } from "./osu";
import { dateUTC } from "@/utils/zod-utils";

export const ScoreSchema = z.object({
  score_id: z.coerce.number(),
  score: z.coerce.number(),
  username: z.string(),
  count300: z.coerce.number(),
  count100: z.coerce.number(),
  count50: z.coerce.number(),
  countmiss: z.coerce.number(),
  maxcombo: z.coerce.number(),
  countkatu: z.coerce.number(),
  countgeki: z.coerce.number(),
  perfect: z.coerce.number().transform(Boolean),
  enabled_mods: z.coerce.number(),
  user_id: z.coerce.number(),
  date: dateUTC,
  rank: z.string(),
  pp: z.coerce.number(),
  replay_available: z.coerce.number().transform(Boolean),
});

export const UserScoreSchema = ScoreSchema.omit({
  username: true,
});

export const getScoresParamsSchema = z.object({
  b: z.number(),
  u: z.number().or(z.string()).optional(),
  m: z.nativeEnum(GameMode).optional(),
  mods: z.number().optional(),
  type: z.string().optional(),
  limit: z.number().optional(),
});

export const getUserScoreParamsSchema = getScoresParamsSchema
  .omit({
    b: true,
    mods: true,
  })
  .required({
    u: true,
  });

export type GetScoresParams = z.infer<typeof getScoresParamsSchema>;
export type GetUserScoreParams = z.infer<typeof getUserScoreParamsSchema>;
export type Score = z.infer<typeof ScoreSchema>;
export type UserScore = z.infer<typeof UserScoreSchema>;
