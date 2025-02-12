import type {
  GetBeatmapPackOptions,
  GetBeatmapPackResponse,
  GetBeatmapPacksOptions,
  GetBeatmapPacksResponse,
} from "@/objects/v2/beatmap-pack"

import { BaseAPIClient } from "./base"
import { BASE_URL } from "@/utils/consts"

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
