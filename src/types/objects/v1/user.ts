import * as z from "zod";
import { GameMode } from "./osu";
import { dateUTC } from "@/utils/zod-utils";

export const UserEventSchema = z.object({
  display_html: z.string(),
  beatmap_id: z.coerce.number(),
  beatmapset_id: z.coerce.number(),
  date: dateUTC,
  epicfactor: z.coerce.number().min(1).max(32),
});

export const UserSchema = z
  .object({
    user_id: z.coerce.number(),
    username: z.string(),
    join_date: dateUTC,
    count300: z.coerce.number(),
    count100: z.coerce.number(),
    count50: z.coerce.number(),
    playcount: z.coerce.number(),
    ranked_score: z.coerce.number(),
    total_score: z.coerce.number(),
    pp_rank: z.coerce.number(),
    level: z.coerce.number(),
    pp_raw: z.coerce.number(),
    accuracy: z.coerce.number(),
    count_rank_ss: z.coerce.number(),
    count_rank_ssh: z.coerce.number(),
    count_rank_s: z.coerce.number(),
    count_rank_sh: z.coerce.number(),
    count_rank_a: z.coerce.number(),
    country: z.string(),
    total_seconds_played: z.coerce.number(),
    pp_country_rank: z.coerce.number(),
    events: z.array(UserEventSchema),
  })
  .transform((data) => ({
    ...data,
    avatar_url: () => `https://a.ppy.sh/${data.user_id}`,
  }));

export const GetUserParamsSchema = z
  .object({
    mode: z.nativeEnum(GameMode),
    event_days: z.coerce.number().min(1).max(31),
  })
  .partial()
  .optional();

export type GetUserParams = z.infer<typeof GetUserParamsSchema>;

export type User = z.infer<typeof UserSchema>;

export type UserEvent = z.infer<typeof UserEventSchema>;
