import * as z from "zod";

export const ReplaySchema = z.object({
  content: z.string(),
  encoding: z.string(),
});

export const getReplayParamsSchema = z.object({
  b: z.number(),
  u: z.number().or(z.string()).optional(),
  m: z.number().optional(),
  s: z.number().optional(),
  type: z.string().optional(),
  mods: z.number().optional(),
});

export type GetReplayParams = z.infer<typeof getReplayParamsSchema>;
export const Replay = ReplaySchema;
