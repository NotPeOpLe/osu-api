import {
  BeatmapSchema,
  getBeatmapParamsSchema,
  type GetBeatmapParams,
} from "@/types/objects/v1/beatmap";
import { APIClient } from "./base";
import {
  type User,
  type GetUserParams,
  UserSchema,
  GetUserParamsSchema,
} from "@/types/objects/v1/user";
import {
  getScoresParamsSchema,
  getUserScoreParamsSchema,
  ScoreSchema,
  UserScoreSchema,
  type GetScoresParams,
  type GetUserScoreParams,
} from "@/types/objects/v1/score";
import { MatchSchema } from "@/types/objects/v1/match";
import {
  getReplayParamsSchema,
  ReplaySchema,
  type GetReplayParams,
} from "@/types/objects/v1/replay";

export class APIv1 extends APIClient {
  constructor(token: string) {
    super(token, 1);
  }

  private setUserType(params: { u?: string | number; type?: string }) {
    if (params.u && !params.type) {
      params.type = typeof params.u === "string" ? "string" : "id";
    }
  }

  getUser(userId: number, options?: GetUserParams): Promise<User | undefined>;

  getUser(username: string, options?: GetUserParams): Promise<User | undefined>;

  public async getUser(
    user: string | number,
    options: GetUserParams
  ): Promise<User | undefined> {
    const params = {
      u: user,
      ...GetUserParamsSchema.parse(options),
    };
    this.setUserType(params);
    const [users] = UserSchema.array().parse(
      await this.request("/get_user", { params })
    );
    return users;
  }

  public async getBeatmaps(options: GetBeatmapParams) {
    const params = getBeatmapParamsSchema.parse(options);
    if (params) this.setUserType(params);
    return BeatmapSchema.array().parse(
      await this.request("/get_beatmaps", { params })
    );
  }

  public async getScores(options: GetScoresParams) {
    const params = getScoresParamsSchema.parse(options);
    this.setUserType(params);
    return ScoreSchema.array().parse(
      await this.request("/get_scores", { params })
    );
  }

  public async getUserBest(options: GetUserScoreParams) {
    const params = getUserScoreParamsSchema.parse(options);
    this.setUserType(params);
    return UserScoreSchema.array().parse(
      await this.request("/get_user_best", { params })
    );
  }

  public async getUserRecent(options: GetUserScoreParams) {
    const params = getUserScoreParamsSchema.parse(options);
    this.setUserType(params);
    return UserScoreSchema.array().parse(
      await this.request("/get_user_recent", { params })
    );
  }

  public async getMatch(mp: number) {
    return MatchSchema.parse(
      await this.request("/get_match", { params: { mp } })
    );
  }

  public async getReplay(options: GetReplayParams) {
    const params = getReplayParamsSchema.parse(options);
    this.setUserType(params);
    return ReplaySchema.parse(await this.request("/get_replay", { params }));
  }
}
