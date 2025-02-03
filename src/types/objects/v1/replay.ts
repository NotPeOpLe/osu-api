import * as z from "zod";
import { GameMode } from "./osu";
import { parseUserType } from "./utils";

export const ReplaySchema = z.object({
  content: z.string(),
  encoding: z.string(),
});

export const getReplayParamsInterface = z.object({
  beatmapId: z.number(),
  user: z.number().or(z.string()).optional(),
  mode: z.nativeEnum(GameMode).optional(),
  spec: z.number().optional(),
  type: z.string().optional(),
  mods: z.number().optional(),
});

export const getReplayParamsSchema = getReplayParamsInterface
  .partial()
  .optional()
  .transform((data) => ({
    b: data?.beatmapId,
    u: data?.user,
    m: data?.mode,
    s: data?.spec,
    t: data?.type,
    mods: data?.mods,
  }))
  .transform(parseUserType);

export type GetReplayParams = z.infer<typeof getReplayParamsInterface>;
export type GetReplayOptions = Omit<GetReplayParams, "beatmapId" | "user">;
export type Replay = z.infer<typeof ReplaySchema>;
