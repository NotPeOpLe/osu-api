import * as z from "zod";
import { GameMode } from "./osu";
export declare const ReplaySchema: z.ZodObject<{
    content: z.ZodString;
    encoding: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
    encoding: string;
}, {
    content: string;
    encoding: string;
}>;
export declare const getReplayParamsInterface: z.ZodObject<{
    beatmapId: z.ZodNumber;
    user: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    mode: z.ZodOptional<z.ZodNativeEnum<typeof GameMode>>;
    spec: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodString>;
    mods: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    beatmapId: number;
    type?: string | undefined;
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    mods?: number | undefined;
    spec?: number | undefined;
}, {
    beatmapId: number;
    type?: string | undefined;
    mode?: GameMode | undefined;
    user?: string | number | undefined;
    mods?: number | undefined;
    spec?: number | undefined;
}>;
export declare const getReplayParamsSchema: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodObject<{
    beatmapId: z.ZodOptional<z.ZodNumber>;
    user: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>>;
    mode: z.ZodOptional<z.ZodOptional<z.ZodNativeEnum<typeof GameMode>>>;
    spec: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    type: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    mods: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    type?: string | undefined;
    mode?: GameMode | undefined;
    beatmapId?: number | undefined;
    user?: string | number | undefined;
    mods?: number | undefined;
    spec?: number | undefined;
}, {
    type?: string | undefined;
    mode?: GameMode | undefined;
    beatmapId?: number | undefined;
    user?: string | number | undefined;
    mods?: number | undefined;
    spec?: number | undefined;
}>>, {
    b: number | undefined;
    u: string | number | undefined;
    m: GameMode | undefined;
    s: number | undefined;
    t: string | undefined;
    mods: number | undefined;
}, {
    type?: string | undefined;
    mode?: GameMode | undefined;
    beatmapId?: number | undefined;
    user?: string | number | undefined;
    mods?: number | undefined;
    spec?: number | undefined;
} | undefined>, ({
    b: number | undefined;
    u: string | number | undefined;
    m: GameMode | undefined;
    s: number | undefined;
    t: string | undefined;
    mods: number | undefined;
} & {
    type: string;
}) | undefined, {
    type?: string | undefined;
    mode?: GameMode | undefined;
    beatmapId?: number | undefined;
    user?: string | number | undefined;
    mods?: number | undefined;
    spec?: number | undefined;
} | undefined>;
export type GetReplayParams = z.infer<typeof getReplayParamsInterface>;
export type GetReplayOptions = Omit<GetReplayParams, "beatmapId" | "user">;
export type Replay = z.infer<typeof ReplaySchema>;
