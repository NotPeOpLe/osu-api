import * as z from "zod";
import { GameMode, ApprovedType, Language, Genre } from "./osu";
import { dateUTC } from "@/utils/zod-utils";
import { parseUserType } from "./utils";

export const BeatmapSchema = z
  .object({
    approved: z.coerce.number().pipe(z.nativeEnum(ApprovedType)),
    submit_date: dateUTC,
    approved_date: dateUTC.nullable(),
    last_update: dateUTC,
    artist: z.string(),
    artist_unicode: z.string(),
    beatmap_id: z.coerce.number(),
    beatmapset_id: z.coerce.number(),
    bpm: z.coerce.number(),
    creator: z.string(),
    creator_id: z.coerce.number(),
    difficultyrating: z.coerce.number(),
    diff_aim: z.coerce.number(),
    diff_speed: z.coerce.number(),
    diff_size: z.coerce.number(),
    diff_overall: z.coerce.number(),
    diff_approach: z.coerce.number(),
    diff_drain: z.coerce.number(),
    hit_length: z.coerce.number(),
    source: z.string(),
    genre_id: z.coerce.number().pipe(z.nativeEnum(Genre)),
    language_id: z.coerce.number().pipe(z.nativeEnum(Language)),
    title: z.string(),
    title_unicode: z.string(),
    total_length: z.coerce.number(),
    version: z.string(),
    file_md5: z.string(),
    mode: z.coerce.number().pipe(z.nativeEnum(GameMode)),
    tags: z
      .string()
      .transform((tags) => (tags.length > 0 ? tags.split(" ") : [])),
    favourite_count: z.coerce.number(),
    rating: z.coerce.number(),
    playcount: z.coerce.number(),
    passcount: z.coerce.number(),
    count_normal: z.coerce.number(),
    count_slider: z.coerce.number(),
    count_spinner: z.coerce.number(),
    max_combo: z.string(),
    storyboard: z.coerce.number().transform(Boolean),
    video: z.coerce.number().transform(Boolean),
    download_unavailable: z.coerce.number().transform(Boolean),
    audio_unavailable: z.coerce.number().transform(Boolean),
  })
  .transform((data) => ({
    ...data,
    getCoverImageURL: () =>
      `https://assets.ppy.sh/beatmaps/${data.beatmapset_id}/covers/cover.jpg`,
    getCoverThumbnailURL: () =>
      `https://b.ppy.sh/thumb/${data.beatmapset_id}l.jpg`,
  }));

const getBeatmapParamsInterface = z
  .object({
    beatmapId: z.number(),
    beatmapSetId: z.number(),
    user: z.number().or(z.string()),
    mode: z.nativeEnum(GameMode),
    converted: z.boolean(),
    hash: z.string(),
    limit: z.number(),
    mods: z.number(),
    since: z.string().date(),
  })
  .partial()
  .optional();

export const getBeatmapParamsSchema = getBeatmapParamsInterface
  .transform((data) => ({
    b: data?.beatmapId,
    s: data?.beatmapSetId,
    u: data?.user,
    m: data?.mode,
    a: data?.converted,
    h: data?.hash,
    limit: data?.limit,
    mods: data?.mods,
    since: data?.since,
  }))
  .transform(parseUserType);

// export const getBeatmapParamsSchema = z
//   .object({
//     b: z.number(),
//     s: z.number(),
//     u: z.number().or(z.string()),
//     m: z.nativeEnum(GameMode),
//     a: z.boolean(),
//     h: z.string(),
//     limit: z.number(),
//     mods: z.number(),
//     since: z.string().date(),
//     type: z.string(),
//   })
//   .partial()
//   .optional();

export type Beatmap = z.infer<typeof BeatmapSchema>;
export type GetBeatmapParams = z.infer<typeof getBeatmapParamsInterface>;
export type GetBeatmapParamsParsed = z.infer<typeof getBeatmapParamsSchema>;
