import * as z from "zod";
import { GameMode } from "./osu";
export declare const UserEventSchema: z.ZodObject<{
    display_html: z.ZodString;
    beatmap_id: z.ZodNumber;
    beatmapset_id: z.ZodNumber;
    date: z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodDate>;
    epicfactor: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    date: Date;
    beatmap_id: number;
    beatmapset_id: number;
    display_html: string;
    epicfactor: number;
}, {
    date: string;
    beatmap_id: number;
    beatmapset_id: number;
    display_html: string;
    epicfactor: number;
}>;
export declare const UserSchema: z.ZodEffects<z.ZodObject<{
    user_id: z.ZodNumber;
    username: z.ZodString;
    join_date: z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodDate>;
    count300: z.ZodNumber;
    count100: z.ZodNumber;
    count50: z.ZodNumber;
    playcount: z.ZodNumber;
    ranked_score: z.ZodNumber;
    total_score: z.ZodNumber;
    pp_rank: z.ZodNumber;
    level: z.ZodNumber;
    pp_raw: z.ZodNumber;
    accuracy: z.ZodNumber;
    count_rank_ss: z.ZodNumber;
    count_rank_ssh: z.ZodNumber;
    count_rank_s: z.ZodNumber;
    count_rank_sh: z.ZodNumber;
    count_rank_a: z.ZodNumber;
    country: z.ZodString;
    total_seconds_played: z.ZodNumber;
    pp_country_rank: z.ZodNumber;
    events: z.ZodArray<z.ZodObject<{
        display_html: z.ZodString;
        beatmap_id: z.ZodNumber;
        beatmapset_id: z.ZodNumber;
        date: z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodDate>;
        epicfactor: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        date: Date;
        beatmap_id: number;
        beatmapset_id: number;
        display_html: string;
        epicfactor: number;
    }, {
        date: string;
        beatmap_id: number;
        beatmapset_id: number;
        display_html: string;
        epicfactor: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    playcount: number;
    user_id: number;
    username: string;
    join_date: Date;
    count300: number;
    count100: number;
    count50: number;
    ranked_score: number;
    total_score: number;
    pp_rank: number;
    level: number;
    pp_raw: number;
    accuracy: number;
    count_rank_ss: number;
    count_rank_ssh: number;
    count_rank_s: number;
    count_rank_sh: number;
    count_rank_a: number;
    country: string;
    total_seconds_played: number;
    pp_country_rank: number;
    events: {
        date: Date;
        beatmap_id: number;
        beatmapset_id: number;
        display_html: string;
        epicfactor: number;
    }[];
}, {
    playcount: number;
    user_id: number;
    username: string;
    join_date: string;
    count300: number;
    count100: number;
    count50: number;
    ranked_score: number;
    total_score: number;
    pp_rank: number;
    level: number;
    pp_raw: number;
    accuracy: number;
    count_rank_ss: number;
    count_rank_ssh: number;
    count_rank_s: number;
    count_rank_sh: number;
    count_rank_a: number;
    country: string;
    total_seconds_played: number;
    pp_country_rank: number;
    events: {
        date: string;
        beatmap_id: number;
        beatmapset_id: number;
        display_html: string;
        epicfactor: number;
    }[];
}>, {
    avatar_url: () => string;
    playcount: number;
    user_id: number;
    username: string;
    join_date: Date;
    count300: number;
    count100: number;
    count50: number;
    ranked_score: number;
    total_score: number;
    pp_rank: number;
    level: number;
    pp_raw: number;
    accuracy: number;
    count_rank_ss: number;
    count_rank_ssh: number;
    count_rank_s: number;
    count_rank_sh: number;
    count_rank_a: number;
    country: string;
    total_seconds_played: number;
    pp_country_rank: number;
    events: {
        date: Date;
        beatmap_id: number;
        beatmapset_id: number;
        display_html: string;
        epicfactor: number;
    }[];
}, {
    playcount: number;
    user_id: number;
    username: string;
    join_date: string;
    count300: number;
    count100: number;
    count50: number;
    ranked_score: number;
    total_score: number;
    pp_rank: number;
    level: number;
    pp_raw: number;
    accuracy: number;
    count_rank_ss: number;
    count_rank_ssh: number;
    count_rank_s: number;
    count_rank_sh: number;
    count_rank_a: number;
    country: string;
    total_seconds_played: number;
    pp_country_rank: number;
    events: {
        date: string;
        beatmap_id: number;
        beatmapset_id: number;
        display_html: string;
        epicfactor: number;
    }[];
}>;
declare const GetUserParamsInterface: z.ZodObject<{
    user: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    mode: z.ZodOptional<z.ZodNativeEnum<typeof GameMode>>;
    event_days: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    event_days?: number | undefined;
}, {
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    event_days?: number | undefined;
}>;
export declare const GetUserParamsSchema: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodObject<{
    user: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    mode: z.ZodOptional<z.ZodNativeEnum<typeof GameMode>>;
    event_days: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    event_days?: number | undefined;
}, {
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    event_days?: number | undefined;
}>>, {
    u: string | number | undefined;
    m: GameMode | undefined;
    event_days: number | undefined;
}, {
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    event_days?: number | undefined;
} | undefined>, ({
    u: string | number | undefined;
    m: GameMode | undefined;
    event_days: number | undefined;
} & {
    type: string;
}) | undefined, {
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    event_days?: number | undefined;
} | undefined>;
export type GetUserParams = z.infer<typeof GetUserParamsInterface>;
export type GetUserParamsWithoutUser = Omit<GetUserParams, "user">;
export type User = z.infer<typeof UserSchema>;
export type UserEvent = z.infer<typeof UserEventSchema>;
export {};
