import * as z from "zod";
import { GameMode } from "./osu";
import { dateUTC } from "@/utils/zod-utils";
import { parseUserType } from "./utils";

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

export const UserScoreSchema = ScoreSchema.extend({
  score_id: z.coerce.number().nullable(),
}).omit({
  username: true,
  replay_available: true,
  pp: true,
});

export const getScoresParamsInterface = z.object({
  beatmapId: z.number(),
  user: z.number().or(z.string()).optional(),
  mode: z.nativeEnum(GameMode).optional(),
  mods: z.number().optional(),
  limit: z.number().optional(),
});

export const getScoresParamsSchema = getScoresParamsInterface
  .partial()
  .optional()
  .transform((data) => ({
    b: data?.beatmapId,
    u: data?.user,
    m: data?.mode,
    mods: data?.mods,
    limit: data?.limit,
  }))
  .transform(parseUserType);

const getUserScoreParamsInterface = getScoresParamsInterface.omit({
  beatmapId: true,
  mods: true,
});

export const getUserScoreParamsSchema = getUserScoreParamsInterface
  .partial()
  .optional()
  .transform((data) => ({
    u: data?.user,
    m: data?.mode,
    limit: data?.limit,
  }))
  .transform(parseUserType);

export type GetScoresParams = z.infer<typeof getScoresParamsInterface>;
export type GetScoresOptions = Omit<GetScoresParams, "beatmapId">;
export type GetUserScoreParams = z.infer<typeof getUserScoreParamsInterface>;
export type GetUserScoreOptions = Omit<GetUserScoreParams, "user">;
export type Score = z.infer<typeof ScoreSchema>;
export type UserScore = z.infer<typeof UserScoreSchema>;
