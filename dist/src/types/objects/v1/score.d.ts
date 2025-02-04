import * as z from "zod";
import { GameMode } from "./osu";
export declare const ScoreSchema: z.ZodObject<{
    score_id: z.ZodNumber;
    score: z.ZodNumber;
    username: z.ZodString;
    count300: z.ZodNumber;
    count100: z.ZodNumber;
    count50: z.ZodNumber;
    countmiss: z.ZodNumber;
    maxcombo: z.ZodNumber;
    countkatu: z.ZodNumber;
    countgeki: z.ZodNumber;
    perfect: z.ZodEffects<z.ZodNumber, boolean, number>;
    enabled_mods: z.ZodNumber;
    user_id: z.ZodNumber;
    date: z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodDate>;
    rank: z.ZodString;
    pp: z.ZodNumber;
    replay_available: z.ZodEffects<z.ZodNumber, boolean, number>;
}, "strip", z.ZodTypeAny, {
    date: Date;
    user_id: number;
    username: string;
    count300: number;
    count100: number;
    count50: number;
    score_id: number;
    score: number;
    countmiss: number;
    maxcombo: number;
    countkatu: number;
    countgeki: number;
    perfect: boolean;
    enabled_mods: number;
    rank: string;
    pp: number;
    replay_available: boolean;
}, {
    date: string;
    user_id: number;
    username: string;
    count300: number;
    count100: number;
    count50: number;
    score_id: number;
    score: number;
    countmiss: number;
    maxcombo: number;
    countkatu: number;
    countgeki: number;
    perfect: number;
    enabled_mods: number;
    rank: string;
    pp: number;
    replay_available: number;
}>;
export declare const UserScoreSchema: z.ZodObject<Omit<z.objectUtil.extendShape<{
    score_id: z.ZodNumber;
    score: z.ZodNumber;
    username: z.ZodString;
    count300: z.ZodNumber;
    count100: z.ZodNumber;
    count50: z.ZodNumber;
    countmiss: z.ZodNumber;
    maxcombo: z.ZodNumber;
    countkatu: z.ZodNumber;
    countgeki: z.ZodNumber;
    perfect: z.ZodEffects<z.ZodNumber, boolean, number>;
    enabled_mods: z.ZodNumber;
    user_id: z.ZodNumber;
    date: z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodDate>;
    rank: z.ZodString;
    pp: z.ZodNumber;
    replay_available: z.ZodEffects<z.ZodNumber, boolean, number>;
}, {
    score_id: z.ZodNullable<z.ZodNumber>;
}>, "username" | "pp" | "replay_available">, "strip", z.ZodTypeAny, {
    date: Date;
    user_id: number;
    count300: number;
    count100: number;
    count50: number;
    score_id: number | null;
    score: number;
    countmiss: number;
    maxcombo: number;
    countkatu: number;
    countgeki: number;
    perfect: boolean;
    enabled_mods: number;
    rank: string;
}, {
    date: string;
    user_id: number;
    count300: number;
    count100: number;
    count50: number;
    score_id: number | null;
    score: number;
    countmiss: number;
    maxcombo: number;
    countkatu: number;
    countgeki: number;
    perfect: number;
    enabled_mods: number;
    rank: string;
}>;
export declare const getScoresParamsInterface: z.ZodObject<{
    beatmapId: z.ZodNumber;
    user: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    mode: z.ZodOptional<z.ZodNativeEnum<typeof GameMode>>;
    mods: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    beatmapId: number;
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    limit?: number | undefined;
    mods?: number | undefined;
}, {
    beatmapId: number;
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    limit?: number | undefined;
    mods?: number | undefined;
}>;
export declare const getScoresParamsSchema: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodObject<{
    beatmapId: z.ZodOptional<z.ZodNumber>;
    user: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>>;
    mode: z.ZodOptional<z.ZodOptional<z.ZodNativeEnum<typeof GameMode>>>;
    mods: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    limit: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    mode?: GameMode | undefined;
    beatmapId?: number | undefined;
    user?: string | number | undefined;
    limit?: number | undefined;
    mods?: number | undefined;
}, {
    mode?: GameMode | undefined;
    beatmapId?: number | undefined;
    user?: string | number | undefined;
    limit?: number | undefined;
    mods?: number | undefined;
}>>, {
    b: number | undefined;
    u: string | number | undefined;
    m: GameMode | undefined;
    mods: number | undefined;
    limit: number | undefined;
}, {
    mode?: GameMode | undefined;
    beatmapId?: number | undefined;
    user?: string | number | undefined;
    limit?: number | undefined;
    mods?: number | undefined;
} | undefined>, ({
    b: number | undefined;
    u: string | number | undefined;
    m: GameMode | undefined;
    mods: number | undefined;
    limit: number | undefined;
} & {
    type: string;
}) | undefined, {
    mode?: GameMode | undefined;
    beatmapId?: number | undefined;
    user?: string | number | undefined;
    limit?: number | undefined;
    mods?: number | undefined;
} | undefined>;
declare const getUserScoreParamsInterface: z.ZodObject<Omit<{
    beatmapId: z.ZodNumber;
    user: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    mode: z.ZodOptional<z.ZodNativeEnum<typeof GameMode>>;
    mods: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
}, "beatmapId" | "mods">, "strip", z.ZodTypeAny, {
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    limit?: number | undefined;
}, {
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    limit?: number | undefined;
}>;
export declare const getUserScoreParamsSchema: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodObject<{
    mode: z.ZodOptional<z.ZodOptional<z.ZodNativeEnum<typeof GameMode>>>;
    user: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>>;
    limit: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    limit?: number | undefined;
}, {
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    limit?: number | undefined;
}>>, {
    u: string | number | undefined;
    m: GameMode | undefined;
    limit: number | undefined;
}, {
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    limit?: number | undefined;
} | undefined>, ({
    u: string | number | undefined;
    m: GameMode | undefined;
    limit: number | undefined;
} & {
    type: string;
}) | undefined, {
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    limit?: number | undefined;
} | undefined>;
export type GetScoresParams = z.infer<typeof getScoresParamsInterface>;
export type GetScoresOptions = Omit<GetScoresParams, "beatmapId">;
export type GetUserScoreParams = z.infer<typeof getUserScoreParamsInterface>;
export type GetUserScoreOptions = Omit<GetUserScoreParams, "user">;
export type Score = z.infer<typeof ScoreSchema>;
export type UserScore = z.infer<typeof UserScoreSchema>;
export {};
