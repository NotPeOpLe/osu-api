import { type Beatmap, type GetBeatmapParams, type GetBeatmapParamsWithoutSpecParams } from "@/types/objects/v1/beatmap";
import { APIClient } from "./base";
import { type User, type GetUserParamsWithoutUser } from "@/types/objects/v1/user";
import { type GetScoresOptions, type GetUserScoreParams, type GetUserScoreOptions, type UserScore } from "@/types/objects/v1/score";
import { type Match } from "@/types/objects/v1/match";
import { type GetReplayOptions, type Replay } from "@/types/objects/v1/replay";
export declare class APIv1 extends APIClient {
    constructor(token: string);
    /**
     * 獲取用戶信息。
     * @param userId 用戶ID。
     * @param options 可選參數，包括：
     * - `mode` (string): 遊戲模式。
     * - `event_days` (number): 事件天數。
     * @returns 用戶信息或undefined。
     */
    getUser(userId: number, options?: GetUserParamsWithoutUser): Promise<User | undefined>;
    /**
     * 獲取用戶信息。
     * @param username 用戶名。
     * @param options 可選參數，包括：
     * - `mode` (string): 遊戲模式。
     * - `event_days` (number): 事件天數。
     * @returns 用戶信息或undefined。
     */
    getUser(username: string, options?: GetUserParamsWithoutUser): Promise<User | undefined>;
    /**
     * 獲取譜面信息。
     * @param params 譜面參數，包括：
     * - `since` (string): 起始日期。
     * - `set` (number): 譜面集ID。
     * - `hash` (string): 譜面哈希。
     * @returns 譜面信息數組。
     */
    getBeatmaps(params: GetBeatmapParams): Promise<Beatmap[]>;
    /**
     * 獲取單個譜面信息。
     * @param beatmapId 譜面ID。
     * @param options 可選參數，包括：
     * - `mods` (string): 模組。
     * - `mode` (string): 遊戲模式。
     * @returns 譜面信息。
     */
    getBeatmap(beatmapId: number, options?: GetBeatmapParamsWithoutSpecParams): Promise<Beatmap>;
    /**
     * 獲取譜面集信息。
     * @param beatmapSetId 譜面集ID。
     * @param options 可選參數，包括：
     * - `mods` (string): 模組。
     * - `mode` (string): 遊戲模式。
     * @returns 譜面信息數組。
     */
    getBeatmapSet(beatmapSetId: number, options?: GetBeatmapParamsWithoutSpecParams): Promise<Beatmap[]>;
    /**
     * 獲取用戶的譜面信息。
     * @param userId 用戶ID。
     * @param options 可選參數，包括：
     * - `mods` (string): 模組。
     * - `mode` (string): 遊戲模式。
     * @returns 譜面信息數組。
     */
    getUserBeatmaps(userId: number, options?: GetBeatmapParamsWithoutSpecParams): Promise<Beatmap[]>;
    /**
     * 獲取用戶的譜面信息。
     * @param username 用戶名。
     * @param options 可選參數，包括：
     * - `mods` (string): 模組。
     * - `mode` (string): 遊戲模式。
     * @returns 譜面信息數組。
     */
    getUserBeatmaps(username: string, options?: GetBeatmapParamsWithoutSpecParams): Promise<Beatmap[]>;
    /**
     * 獲取譜面分數。
     * @param beatmapId 譜面ID。
     * @param options 可選參數，包括：
     * - `mods` (string): 模組。
     * - `mode` (string): 遊戲模式。
     * @returns 分數信息數組。
     */
    getScores(beatmapId: number, options?: GetScoresOptions): Promise<{
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
    }[]>;
    /**
     * 獲取用戶最佳分數。
     * @param userId 用戶ID。
     * @param options 可選參數，包括：
     * - `mode` (string): 遊戲模式。
     * - `limit` (number): 返回結果的數量限制。
     * @returns 用戶最佳分數數組。
     */
    getUserBest(userId: number, options?: GetUserScoreOptions): Promise<UserScore[]>;
    /**
     * 獲取用戶最佳分數。
     * @param username 用戶名。
     * @param options 可選參數，包括：
     * - `mode` (string): 遊戲模式。
     * - `limit` (number): 返回結果的數量限制。
     * @returns 用戶最佳分數數組。
     */
    getUserBest(username: string, options?: GetUserScoreOptions): Promise<UserScore[]>;
    /**
     * 獲取用戶最近分數。
     * @param userId 用戶ID。
     * @param options 可選參數，包括：
     * - `mode` (string): 遊戲模式。
     * - `limit` (number): 返回結果的數量限制。
     * @returns 用戶最近分數數組。
     */
    getUserRecent(userId: number, options?: GetUserScoreParams): Promise<UserScore[]>;
    /**
     * 獲取用戶最近分數。
     * @param username 用戶名。
     * @param options 可選參數，包括：
     * - `mode` (string): 遊戲模式。
     * - `limit` (number): 返回結果的數量限制。
     * @returns 用戶最近分數數組。
     */
    getUserRecent(username: string, options?: GetUserScoreParams): Promise<UserScore[]>;
    /**
     * 獲取比賽信息。
     * @param matchId 比賽ID。
     * @returns 比賽信息。
     */
    getMatch(matchId: number): Promise<Match>;
    /**
     * 獲取回放信息。
     * @param beatmapId 譜面ID。
     * @param user 用戶ID或用戶名。
     * @param options 可選參數，包括：
     * - `mode` (string): 遊戲模式。
     * @returns 回放信息。
     */
    getReplay(beatmapId: number, user: string | number, options?: GetReplayOptions): Promise<Replay>;
}
