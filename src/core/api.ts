import { ofetch } from "ofetch"
import {
  BeatmapSchema,
  getBeatmapParamsSchema,
  type Beatmap,
  type GetBeatmapParams,
  type GetBeatmapOptions,
} from "@/objects/v1/beatmap"
import {
  type User,
  UserSchema,
  getUserParamsSchema,
  type GetUserOptions,
} from "@/objects/v1/user"
import {
  getScoresParamsSchema,
  getUserScoreParamsSchema,
  ScoreSchema,
  UserScoreSchema,
  type GetScoresOptions,
  type GetUserScoreParams,
  type GetUserScoreOptions,
  type UserScore,
} from "@/objects/v1/score"
import { MatchSchema, type Match } from "@/objects/v1/match"
import {
  getReplayParamsSchema,
  ReplaySchema,
  type GetReplayOptions,
  type Replay,
} from "@/objects/v1/replay"
import type {
  GetBeatmapPackOptions,
  GetBeatmapPackResponse,
  GetBeatmapPacksOptions,
  GetBeatmapPacksResponse,
} from "@/objects/v2/beatmap-pack"

const BASE_URL = "https://osu.ppy.sh/api"

class BaseAPIClient {
  protected request

  constructor(token: string, baseURL: string, tokenType: "bearer" | "query") {
    this.request = ofetch.create({
      baseURL,
      headers:
        tokenType === "bearer"
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
      params: tokenType === "query" ? { k: token } : undefined,
    })
  }
}

export class APIv1 extends BaseAPIClient {
  constructor(token: string) {
    super(token, BASE_URL, "query")
  }

  /**
   * 獲取用戶信息。
   * @param userId 用戶ID。
   * @param options 可選參數，包括：
   * - `mode` (string): 遊戲模式。
   * - `event_days` (number): 事件天數。
   * @returns 用戶信息或undefined。
   */
  getUser(userId: number, options?: GetUserOptions): Promise<User | undefined>

  /**
   * 獲取用戶信息。
   * @param username 用戶名。
   * @param options 可選參數，包括：
   * - `mode` (string): 遊戲模式。
   * - `event_days` (number): 事件天數。
   * @returns 用戶信息或undefined。
   */
  getUser(username: string, options?: GetUserOptions): Promise<User | undefined>

  /**
   * 獲取用戶信息。
   * @param user 用戶ID或用戶名。
   * @param options 可選參數，包括：
   * - `mode` (string): 遊戲模式。
   * - `event_days` (number): 事件天數。
   * @returns 用戶信息或undefined。
   */
  public async getUser(
    user: string | number,
    options: GetUserOptions,
  ): Promise<User | undefined> {
    const params = getUserParamsSchema.parse({ user, ...options })
    const [users] = UserSchema.array().parse(
      await this.request("/get_user", { params }),
    )
    return users
  }

  /**
   * 獲取譜面信息。
   * @param params 譜面參數，包括：
   * - `since` (string): 起始日期。
   * - `set` (number): 譜面集ID。
   * - `hash` (string): 譜面哈希。
   * @returns 譜面信息數組。
   */
  public async getBeatmaps(params: GetBeatmapParams): Promise<Beatmap[]> {
    const query = getBeatmapParamsSchema.parse(params)
    return BeatmapSchema.array().parse(
      await this.request("/get_beatmaps", { query }),
    )
  }

  /**
   * 獲取單個譜面信息。
   * @param beatmapId 譜面ID。
   * @param options 可選參數，包括：
   * - `mods` (string): 模組。
   * - `mode` (string): 遊戲模式。
   * @returns 譜面信息。
   */
  public async getBeatmap(
    beatmapId: number,
    options?: GetBeatmapOptions,
  ): Promise<Beatmap | undefined> {
    return (await this.getBeatmaps({ beatmapId, ...options }))[0]
  }

  /**
   * 獲取譜面集信息。
   * @param beatmapSetId 譜面集ID。
   * @param options 可選參數，包括：
   * - `mods` (string): 模組。
   * - `mode` (string): 遊戲模式。
   * @returns 譜面信息數組。
   */
  public async getBeatmapSet(
    beatmapSetId: number,
    options?: GetBeatmapOptions,
  ): Promise<Beatmap[]> {
    return await this.getBeatmaps({ beatmapSetId, ...options })
  }

  /**
   * 獲取用戶的譜面信息。
   * @param userId 用戶ID。
   * @param options 可選參數，包括：
   * - `mods` (string): 模組。
   * - `mode` (string): 遊戲模式。
   * @returns 譜面信息數組。
   */
  getUserBeatmaps(
    userId: number,
    options?: GetBeatmapOptions,
  ): Promise<Beatmap[]>

  /**
   * 獲取用戶的譜面信息。
   * @param username 用戶名。
   * @param options 可選參數，包括：
   * - `mods` (string): 模組。
   * - `mode` (string): 遊戲模式。
   * @returns 譜面信息數組。
   */
  getUserBeatmaps(
    username: string,
    options?: GetBeatmapOptions,
  ): Promise<Beatmap[]>

  /**
   * 獲取用戶的譜面信息。
   * @param user 用戶ID或用戶名。
   * @param options 可選參數，包括：
   * - `mods` (string): 模組。
   * - `mode` (string): 遊戲模式。
   * @returns 譜面信息數組。
   */
  public async getUserBeatmaps(
    user: number | string,
    options?: GetBeatmapOptions,
  ): Promise<Beatmap[]> {
    return await this.getBeatmaps({ user, ...options })
  }

  /**
   * 獲取譜面分數。
   * @param beatmapId 譜面ID。
   * @param options 可選參數，包括：
   * - `mods` (string): 模組。
   * - `mode` (string): 遊戲模式。
   * @returns 分數信息數組。
   */
  public async getScores(beatmapId: number, options?: GetScoresOptions) {
    const params = getScoresParamsSchema.parse({ beatmapId, ...options })
    return ScoreSchema.array().parse(
      await this.request("/get_scores", { params }),
    )
  }

  /**
   * 獲取用戶最佳分數。
   * @param userId 用戶ID。
   * @param options 可選參數，包括：
   * - `mode` (string): 遊戲模式。
   * - `limit` (number): 返回結果的數量限制。
   * @returns 用戶最佳分數數組。
   */
  getUserBest(
    userId: number,
    options?: GetUserScoreOptions,
  ): Promise<UserScore[]>

  /**
   * 獲取用戶最佳分數。
   * @param username 用戶名。
   * @param options 可選參數，包括：
   * - `mode` (string): 遊戲模式。
   * - `limit` (number): 返回結果的數量限制。
   * @returns 用戶最佳分數數組。
   */
  getUserBest(
    username: string,
    options?: GetUserScoreOptions,
  ): Promise<UserScore[]>

  /**
   * 獲取用戶最佳分數。
   * @param user 用戶ID或用戶名。
   * @param options 可選參數，包括：
   * - `mode` (string): 遊戲模式。
   * - `limit` (number): 返回結果的數量限制。
   * @returns 用戶最佳分數數組。
   */
  public async getUserBest(
    user: string | number,
    options?: GetUserScoreOptions,
  ): Promise<UserScore[]> {
    const params = getUserScoreParamsSchema.parse({ user, ...options })
    return UserScoreSchema.array().parse(
      await this.request("/get_user_best", { params }),
    )
  }

  /**
   * 獲取用戶最近分數。
   * @param userId 用戶ID。
   * @param options 可選參數，包括：
   * - `mode` (string): 遊戲模式。
   * - `limit` (number): 返回結果的數量限制。
   * @returns 用戶最近分數數組。
   */
  getUserRecent(
    userId: number,
    options?: GetUserScoreOptions,
  ): Promise<UserScore[]>

  /**
   * 獲取用戶最近分數。
   * @param username 用戶名。
   * @param options 可選參數，包括：
   * - `mode` (string): 遊戲模式。
   * - `limit` (number): 返回結果的數量限制。
   * @returns 用戶最近分數數組。
   */
  getUserRecent(
    username: string,
    options?: GetUserScoreOptions,
  ): Promise<UserScore[]>

  /**
   * 獲取用戶最近分數。
   * @param user 用戶ID或用戶名。
   * @param options 可選參數，包括：
   * - `mode` (string): 遊戲模式。
   * - `limit` (number): 返回結果的數量限制。
   * @returns 用戶最近分數數組。
   */
  public async getUserRecent(
    user: string | number,
    options?: GetUserScoreOptions,
  ): Promise<UserScore[]> {
    const params = getUserScoreParamsSchema.parse({ user, ...options })
    return UserScoreSchema.array().parse(
      await this.request("/get_user_recent", { params }),
    )
  }

  /**
   * 獲取比賽信息。
   * @param matchId 比賽ID。
   * @returns 比賽信息。
   */
  public async getMatch(matchId: number): Promise<Match> {
    return MatchSchema.parse(
      await this.request("/get_match", { params: { mp: matchId } }),
    )
  }

  /**
   * 獲取回放信息。
   * @param beatmapId 譜面ID。
   * @param userId 用戶ID。
   * @param options 可選參數，包括：
   * - `mode` (string): 遊戲模式。
   * @returns 回放信息。
   */
  getReplay(
    beatmapId: number,
    userId: number,
    options?: GetReplayOptions,
  ): Promise<Replay>

  /**
   * 獲取回放信息。
   * @param beatmapId 譜面ID。
   * @param username 用戶名。
   * @param options 可選參數，包括：
   * - `mode` (string): 遊戲模式。
   * @returns
   */
  getReplay(
    beatmapId: number,
    username: string,
    options?: GetReplayOptions,
  ): Promise<Replay>

  /**
   * 獲取回放信息。
   * @param beatmapId 譜面ID。
   * @param user 用戶ID或用戶名。
   * @param options 可選參數，包括：
   * - `mode` (string): 遊戲模式。
   * @returns 回放信息。
   */
  public async getReplay(
    beatmapId: number,
    user: string | number,
    options?: GetReplayOptions,
  ): Promise<Replay> {
    const params = getReplayParamsSchema.parse({ beatmapId, user, ...options })
    return ReplaySchema.parse(await this.request("/get_replay", { params }))
  }
}

interface APIv2Methods {
  // Beatmap Pack
  getBeatmapPacks(
    options?: GetBeatmapPacksOptions,
  ): Promise<GetBeatmapPacksResponse>
  getBeatmapPack(
    pack: string,
    options?: GetBeatmapPackOptions,
  ): Promise<GetBeatmapPackResponse>

  // Beatmap
  // lookupBeatmap(options?: object): Promise<Beatmap>
  // getBeatmap(beatmapId: number): Promise<Beatmap>
  // getBeatmaps(beatmapIds: number[]): Promise<Beatmap[]>
  // getBeatmapAttributes(beatmapId: number, options?: object): Promise<any>
  // getBeatmapScores(beatmapId: number, options?: object): Promise<any>
  // getBeatmapUserScore(
  //   beatmapId: number,
  //   userId: number,
  //   options?: object,
  // ): Promise<any>
  // getBeatmapUserScores(
  //   beatmapId: number,
  //   userId: number,
  //   options?: object,
  // ): Promise<any>

  // // Beatmapset Discussions
  // getBeatmapsetDiscussionPosts(options?: object): Promise<any>
  // getBeatmapsetDiscussionVotes(options?: object): Promise<any>
  // getBeatmapsetDiscussion(options?: object): Promise<any>

  // // Beatmapsets
  // searchBeatmapset(options?: object): Promise<any>
  // lookupBeatmapset(options?: object): Promise<any>
  // getBeatmapset(beatmapsetId: number): Promise<any>
  // downloadBeatmapset(beatmapsetId: number): Promise<any>
}

export class APIv2 extends BaseAPIClient implements APIv2Methods {
  constructor(token: string) {
    super(token, `${BASE_URL}/v2`, "bearer")
  }

  public async getBeatmapPacks(
    options?: GetBeatmapPacksOptions,
  ): Promise<GetBeatmapPacksResponse> {
    const result = await this.request("/beatmaps/packs", { params: options })
    const next = () => {
      if (!result.cursor_string) return
      return this.getBeatmapPacks({
        ...options,
        cursor_string: result.cursor_string,
      })
    }
    return {
      ...result,
      next,
    }
  }

  public async getBeatmapPack(
    pack: string,
    options?: GetBeatmapPackOptions,
  ): Promise<GetBeatmapPackResponse> {
    return this.request(`/beatmaps/packs/${pack}`, {
      params: {
        legacy_only: options?.legacy_only ? +options.legacy_only : undefined,
      },
    })
  }
}
