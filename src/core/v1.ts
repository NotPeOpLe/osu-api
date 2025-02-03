import {
  BeatmapSchema,
  getBeatmapParamsSchema,
  type Beatmap,
  type GetBeatmapParams,
  type GetBeatmapParamsWithoutSpecParams,
} from "@/types/objects/v1/beatmap";
import { APIClient } from "./base";
import {
  type User,
  UserSchema,
  GetUserParamsSchema,
  type GetUserParamsWithoutUser,
} from "@/types/objects/v1/user";
import {
  getScoresParamsSchema,
  getUserScoreParamsSchema,
  ScoreSchema,
  UserScoreSchema,
  type GetScoresOptions,
  type GetUserScoreParams,
  type GetUserScoreOptions,
  type UserScore,
} from "@/types/objects/v1/score";
import { MatchSchema, type Match } from "@/types/objects/v1/match";
import {
  getReplayParamsSchema,
  ReplaySchema,
  type GetReplayOptions,
  type Replay,
} from "@/types/objects/v1/replay";
import { BASE_URL } from "./const";

export class APIv1 extends APIClient {
  constructor(token: string) {
    super(token, BASE_URL, "query");
  }

  getUser(
    userId: number,
    options?: GetUserParamsWithoutUser
  ): Promise<User | undefined>;

  getUser(
    username: string,
    options?: GetUserParamsWithoutUser
  ): Promise<User | undefined>;

  public async getUser(
    user: string | number,
    options: GetUserParamsWithoutUser
  ): Promise<User | undefined> {
    const params = GetUserParamsSchema.parse({ user, ...options });
    const [users] = UserSchema.array().parse(
      await this.request("/get_user", { params })
    );
    return users;
  }

  public async getBeatmaps(params: GetBeatmapParams): Promise<Beatmap[]> {
    const query = getBeatmapParamsSchema.parse(params);
    return BeatmapSchema.array().parse(
      await this.request("/get_beatmaps", { query })
    );
  }

  public async getBeatmap(
    beatmapId: number,
    options?: GetBeatmapParamsWithoutSpecParams
  ): Promise<Beatmap> {
    return (await this.getBeatmaps({ beatmapId, ...options }))[0];
  }

  public async getBeatmapSet(
    beatmapSetId: number,
    options?: GetBeatmapParamsWithoutSpecParams
  ): Promise<Beatmap[]> {
    return await this.getBeatmaps({ beatmapSetId, ...options });
  }

  getUserBeatmaps(
    userId: number,
    options?: GetBeatmapParamsWithoutSpecParams
  ): Promise<Beatmap[]>;

  getUserBeatmaps(
    username: string,
    options?: GetBeatmapParamsWithoutSpecParams
  ): Promise<Beatmap[]>;

  public async getUserBeatmaps(
    user: number | string,
    options?: GetBeatmapParamsWithoutSpecParams
  ): Promise<Beatmap[]> {
    return await this.getBeatmaps({ user, ...options });
  }

  public async getScores(beatmapId: number, options?: GetScoresOptions) {
    const params = getScoresParamsSchema.parse({ beatmapId, ...options });
    return ScoreSchema.array().parse(
      await this.request("/get_scores", { params })
    );
  }

  getUserBest(
    userId: number,
    options?: GetUserScoreOptions
  ): Promise<UserScore[]>;
  getUserBest(
    username: string,
    options?: GetUserScoreOptions
  ): Promise<UserScore[]>;
  public async getUserBest(
    user: string | number,
    options?: GetUserScoreOptions
  ): Promise<UserScore[]> {
    const params = getUserScoreParamsSchema.parse({ user, ...options });
    return UserScoreSchema.array().parse(
      await this.request("/get_user_best", { params })
    );
  }

  getUserRecent(
    userId: number,
    options?: GetUserScoreParams
  ): Promise<UserScore[]>;
  getUserRecent(
    username: string,
    options?: GetUserScoreParams
  ): Promise<UserScore[]>;
  public async getUserRecent(
    user: string | number,
    options?: GetUserScoreParams
  ): Promise<UserScore[]> {
    const params = getUserScoreParamsSchema.parse({ user, ...options });
    return UserScoreSchema.array().parse(
      await this.request("/get_user_recent", { params })
    );
  }

  public async getMatch(matchId: number): Promise<Match> {
    return MatchSchema.parse(
      await this.request("/get_match", { params: { mp: matchId } })
    );
  }

  public async getReplay(
    beatmapId: number,
    user: string | number,
    options?: GetReplayOptions
  ): Promise<Replay> {
    const params = getReplayParamsSchema.parse({ beatmapId, user, ...options });
    return ReplaySchema.parse(await this.request("/get_replay", { params }));
  }
}
