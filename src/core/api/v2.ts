import type {
  BeatmapPackType,
  GetBeatmapPackResponse,
  GetBeatmapPacksResponse,
} from "@/objects/v2/beatmap-pack"

import { BaseAPIClient } from "./base"
import { BASE_URL } from "@/utils/consts"
import type { BeatmapExtended } from "@/objects/v2/beatmap"
import type {
  BeatmapsetExtended,
  BeatmapsetIncludes,
} from "@/objects/v2/beatmapset"
import type { RulesetInt, RulesetStr } from "@/objects/osu"
import type { BeatmapDifficultyAttributes } from "@/objects/v2/beatmap-attributes"

export class APIv2 extends BaseAPIClient {
  constructor(token: string) {
    super(token, `${BASE_URL}/v2`, "bearer")
  }

  public async getBeatmapPacks(options?: {
    type?: keyof typeof BeatmapPackType
    cursor_string?: string
  }): Promise<GetBeatmapPacksResponse> {
    const result = await this.request("/beatmaps/packs", { params: options })
    const next = async () => {
      if (!result.cursor_string) return null
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
    pack: `${BeatmapPackType}${number}`,
    options?: {
      legacy_only?: boolean
    },
  ): Promise<GetBeatmapPackResponse> {
    return this.request(`/beatmaps/packs/${pack}`, {
      params: {
        legacy_only:
          options?.legacy_only !== undefined ? +options.legacy_only : undefined,
      },
    })
  }

  public async lookupBeatmap(options?: {
    checksum?: string
    filename?: string
    id?: number
  }): Promise<
    BeatmapExtended<
      "beatmapset" | "failtimes" | "max_combo",
      BeatmapsetExtended<"ratings">
    >
  > {
    return this.request("/beatmaps/lookup", { query: options })
  }

  public async getBeatmap(
    beatmapId: number,
  ): Promise<
    BeatmapExtended<
      "beatmapset" | "failtimes" | "max_combo",
      BeatmapsetExtended<"ratings">
    >
  > {
    return this.request(`/beatmaps/${beatmapId}`)
  }

  public async getBeatmaps(
    ids: number[],
  ): Promise<
    BeatmapExtended<
      "beatmapset" | "failtimes" | "max_combo" | "owners",
      BeatmapsetIncludes<"ratings">
    >[]
  > {
    return this.request("/beatmaps", { params: { ids: ids.join(",") } })
  }

  public async getBeatmapAttributes<R extends RulesetStr>(
    beatmapId: number,
    options?: {
      mode?: number | string[]
      ruleset?: R
    }
  ): Promise<BeatmapDifficultyAttributes<R>> {
    return this.request<{
      attributes: BeatmapDifficultyAttributes<R>
    }>(`/beatmaps/${beatmapId}/attributes`, {
      method: "POST",
      body: JSON.stringify({
        mode: options?.mode,
        ruleset: options?.ruleset,
      })
    }).then((res) => res.attributes)
  }
}
