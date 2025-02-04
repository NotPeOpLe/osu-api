import * as z from "zod";
import { GameMode } from "./osu";
export declare enum Team {
    Blue = 1,
    Red = 2
}
export declare enum TeamMode {
    HeadToHead = 0,
    TagCoop = 1,
    TeamVs = 2,
    TagTeamVs = 3
}
export declare enum ScoreMode {
    Score = 0,
    Accuracy = 1,
    Combo = 2,
    ScoreV2 = 3
}
export declare const MatchScoreSchema: z.ZodObject<{
    slot: z.ZodNumber;
    team: z.ZodNativeEnum<typeof Team>;
    user_id: z.ZodNumber;
    score: z.ZodNumber;
    maxcombo: z.ZodNumber;
    rank: z.ZodNumber;
    count50: z.ZodNumber;
    count100: z.ZodNumber;
    count300: z.ZodNumber;
    countmiss: z.ZodNumber;
    countgeki: z.ZodNumber;
    countkatu: z.ZodNumber;
    perfect: z.ZodEffects<z.ZodNumber, boolean, number>;
    pass: z.ZodEffects<z.ZodNumber, boolean, number>;
    enabled_mods: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    user_id: number;
    count300: number;
    count100: number;
    count50: number;
    score: number;
    countmiss: number;
    maxcombo: number;
    countkatu: number;
    countgeki: number;
    perfect: boolean;
    enabled_mods: number | null;
    rank: number;
    slot: number;
    team: Team;
    pass: boolean;
}, {
    user_id: number;
    count300: number;
    count100: number;
    count50: number;
    score: number;
    countmiss: number;
    maxcombo: number;
    countkatu: number;
    countgeki: number;
    perfect: number;
    enabled_mods: number | null;
    rank: number;
    slot: number;
    team: Team;
    pass: number;
}>;
export declare const MatchInfoSchema: z.ZodObject<{
    match_id: z.ZodNumber;
    name: z.ZodString;
    start_time: z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodDate>;
    end_time: z.ZodNullable<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodDate>>;
}, "strip", z.ZodTypeAny, {
    match_id: number;
    name: string;
    start_time: Date;
    end_time: Date | null;
}, {
    match_id: number;
    name: string;
    start_time: string;
    end_time: string | null;
}>;
export declare const GameSchema: z.ZodObject<{
    game_id: z.ZodNumber;
    start_time: z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodDate>;
    end_time: z.ZodNullable<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodDate>>;
    beatmap_id: z.ZodNumber;
    play_mode: z.ZodNativeEnum<typeof GameMode>;
    match_type: z.ZodNumber;
    scoring_type: z.ZodNativeEnum<typeof ScoreMode>;
    team_type: z.ZodNativeEnum<typeof TeamMode>;
    mods: z.ZodNumber;
    scores: z.ZodArray<z.ZodObject<{
        slot: z.ZodNumber;
        team: z.ZodNativeEnum<typeof Team>;
        user_id: z.ZodNumber;
        score: z.ZodNumber;
        maxcombo: z.ZodNumber;
        rank: z.ZodNumber;
        count50: z.ZodNumber;
        count100: z.ZodNumber;
        count300: z.ZodNumber;
        countmiss: z.ZodNumber;
        countgeki: z.ZodNumber;
        countkatu: z.ZodNumber;
        perfect: z.ZodEffects<z.ZodNumber, boolean, number>;
        pass: z.ZodEffects<z.ZodNumber, boolean, number>;
        enabled_mods: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        user_id: number;
        count300: number;
        count100: number;
        count50: number;
        score: number;
        countmiss: number;
        maxcombo: number;
        countkatu: number;
        countgeki: number;
        perfect: boolean;
        enabled_mods: number | null;
        rank: number;
        slot: number;
        team: Team;
        pass: boolean;
    }, {
        user_id: number;
        count300: number;
        count100: number;
        count50: number;
        score: number;
        countmiss: number;
        maxcombo: number;
        countkatu: number;
        countgeki: number;
        perfect: number;
        enabled_mods: number | null;
        rank: number;
        slot: number;
        team: Team;
        pass: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    beatmap_id: number;
    mods: number;
    start_time: Date;
    end_time: Date | null;
    game_id: number;
    play_mode: GameMode;
    match_type: number;
    scoring_type: ScoreMode;
    team_type: TeamMode;
    scores: {
        user_id: number;
        count300: number;
        count100: number;
        count50: number;
        score: number;
        countmiss: number;
        maxcombo: number;
        countkatu: number;
        countgeki: number;
        perfect: boolean;
        enabled_mods: number | null;
        rank: number;
        slot: number;
        team: Team;
        pass: boolean;
    }[];
}, {
    beatmap_id: number;
    mods: number;
    start_time: string;
    end_time: string | null;
    game_id: number;
    play_mode: GameMode;
    match_type: number;
    scoring_type: ScoreMode;
    team_type: TeamMode;
    scores: {
        user_id: number;
        count300: number;
        count100: number;
        count50: number;
        score: number;
        countmiss: number;
        maxcombo: number;
        countkatu: number;
        countgeki: number;
        perfect: number;
        enabled_mods: number | null;
        rank: number;
        slot: number;
        team: Team;
        pass: number;
    }[];
}>;
export declare const MatchSchema: z.ZodObject<{
    match: z.ZodObject<{
        match_id: z.ZodNumber;
        name: z.ZodString;
        start_time: z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodDate>;
        end_time: z.ZodNullable<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodDate>>;
    }, "strip", z.ZodTypeAny, {
        match_id: number;
        name: string;
        start_time: Date;
        end_time: Date | null;
    }, {
        match_id: number;
        name: string;
        start_time: string;
        end_time: string | null;
    }>;
    games: z.ZodArray<z.ZodObject<{
        game_id: z.ZodNumber;
        start_time: z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodDate>;
        end_time: z.ZodNullable<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodDate>>;
        beatmap_id: z.ZodNumber;
        play_mode: z.ZodNativeEnum<typeof GameMode>;
        match_type: z.ZodNumber;
        scoring_type: z.ZodNativeEnum<typeof ScoreMode>;
        team_type: z.ZodNativeEnum<typeof TeamMode>;
        mods: z.ZodNumber;
        scores: z.ZodArray<z.ZodObject<{
            slot: z.ZodNumber;
            team: z.ZodNativeEnum<typeof Team>;
            user_id: z.ZodNumber;
            score: z.ZodNumber;
            maxcombo: z.ZodNumber;
            rank: z.ZodNumber;
            count50: z.ZodNumber;
            count100: z.ZodNumber;
            count300: z.ZodNumber;
            countmiss: z.ZodNumber;
            countgeki: z.ZodNumber;
            countkatu: z.ZodNumber;
            perfect: z.ZodEffects<z.ZodNumber, boolean, number>;
            pass: z.ZodEffects<z.ZodNumber, boolean, number>;
            enabled_mods: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            user_id: number;
            count300: number;
            count100: number;
            count50: number;
            score: number;
            countmiss: number;
            maxcombo: number;
            countkatu: number;
            countgeki: number;
            perfect: boolean;
            enabled_mods: number | null;
            rank: number;
            slot: number;
            team: Team;
            pass: boolean;
        }, {
            user_id: number;
            count300: number;
            count100: number;
            count50: number;
            score: number;
            countmiss: number;
            maxcombo: number;
            countkatu: number;
            countgeki: number;
            perfect: number;
            enabled_mods: number | null;
            rank: number;
            slot: number;
            team: Team;
            pass: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        beatmap_id: number;
        mods: number;
        start_time: Date;
        end_time: Date | null;
        game_id: number;
        play_mode: GameMode;
        match_type: number;
        scoring_type: ScoreMode;
        team_type: TeamMode;
        scores: {
            user_id: number;
            count300: number;
            count100: number;
            count50: number;
            score: number;
            countmiss: number;
            maxcombo: number;
            countkatu: number;
            countgeki: number;
            perfect: boolean;
            enabled_mods: number | null;
            rank: number;
            slot: number;
            team: Team;
            pass: boolean;
        }[];
    }, {
        beatmap_id: number;
        mods: number;
        start_time: string;
        end_time: string | null;
        game_id: number;
        play_mode: GameMode;
        match_type: number;
        scoring_type: ScoreMode;
        team_type: TeamMode;
        scores: {
            user_id: number;
            count300: number;
            count100: number;
            count50: number;
            score: number;
            countmiss: number;
            maxcombo: number;
            countkatu: number;
            countgeki: number;
            perfect: number;
            enabled_mods: number | null;
            rank: number;
            slot: number;
            team: Team;
            pass: number;
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    match: {
        match_id: number;
        name: string;
        start_time: Date;
        end_time: Date | null;
    };
    games: {
        beatmap_id: number;
        mods: number;
        start_time: Date;
        end_time: Date | null;
        game_id: number;
        play_mode: GameMode;
        match_type: number;
        scoring_type: ScoreMode;
        team_type: TeamMode;
        scores: {
            user_id: number;
            count300: number;
            count100: number;
            count50: number;
            score: number;
            countmiss: number;
            maxcombo: number;
            countkatu: number;
            countgeki: number;
            perfect: boolean;
            enabled_mods: number | null;
            rank: number;
            slot: number;
            team: Team;
            pass: boolean;
        }[];
    }[];
}, {
    match: {
        match_id: number;
        name: string;
        start_time: string;
        end_time: string | null;
    };
    games: {
        beatmap_id: number;
        mods: number;
        start_time: string;
        end_time: string | null;
        game_id: number;
        play_mode: GameMode;
        match_type: number;
        scoring_type: ScoreMode;
        team_type: TeamMode;
        scores: {
            user_id: number;
            count300: number;
            count100: number;
            count50: number;
            score: number;
            countmiss: number;
            maxcombo: number;
            countkatu: number;
            countgeki: number;
            perfect: number;
            enabled_mods: number | null;
            rank: number;
            slot: number;
            team: Team;
            pass: number;
        }[];
    }[];
}>;
export declare const getMatchParamsSchema: z.ZodNumber;
export type Match = z.infer<typeof MatchSchema>;
