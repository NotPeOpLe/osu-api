import type {
  BeatmapPackIncludes,
  BeatmapPackType,
  BeatmapPacks,
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
import type { UserExtended } from "@/objects/v2/user"

export class APIv2 extends BaseAPIClient {
  constructor(token: string) {
    super(token, `${BASE_URL}/v2`, "bearer")
  }

  public async getBeatmapPacks(options?: {
    type?: keyof typeof BeatmapPackType
    cursor_string?: string
  }): Promise<BeatmapPacks> {
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
  ): Promise<BeatmapPackIncludes<"beatmapsets" | "user_completion_data">> {
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
    },
  ): Promise<BeatmapDifficultyAttributes<R>> {
    return this.request<{
      attributes: BeatmapDifficultyAttributes<R>
    }>(`/beatmaps/${beatmapId}/attributes`, {
      method: "POST",
      body: JSON.stringify({
        mode: options?.mode,
        ruleset: options?.ruleset,
      }),
    }).then((res) => res.attributes)
  }

  public async getOwnData(mode?: RulesetStr): Promise<
    UserExtended<
      | "account_history"
      | "active_tournament_banner"
      | "badges"
      | "beatmap_playcounts_count"
      | "favourite_beatmapset_count"
      | "graveyard_beatmapset_count"
      | "groups"
      | "loved_beatmapset_count"
      | "mapping_follower_count"
      | "monthly_playcounts"
      | "page"
      | "pending_beatmapset_count"
      | "previous_usernames"
      | "rank_highest"
      | "rank_history"
      | "ranked_beatmapset_count"
      | "replays_watched_counts"
      | "scores_best_count"
      | "scores_first_count"
      | "scores_recent_count"
      | "statistics"
      // | "statistics.country_rank"
      // | "statistics.rank"
      // | "statistics.variants"
      | "support_level"
      | "user_achievements"
    >
  > {
    return this.request(`/me/${mode ?? ""}`)
  }

  public async getUser(
    user: number | string,
    mode?: RulesetStr,
  ): Promise<
    UserExtended<
      | "account_history"
      | "active_tournament_banner"
      | "badges"
      | "beatmap_playcounts_count"
      | "favourite_beatmapset_count"
      | "graveyard_beatmapset_count"
      | "groups"
      | "loved_beatmapset_count"
      | "mapping_follower_count"
      | "monthly_playcounts"
      | "page"
      | "pending_beatmapset_count"
      | "previous_usernames"
      | "rank_highest"
      | "rank_history"
      | "ranked_beatmapset_count"
      | "replays_watched_counts"
      | "scores_best_count"
      | "scores_first_count"
      | "scores_recent_count"
      | "statistics"
      // | "statistics.country_rank"
      // | "statistics.rank"
      // | "statistics.variants"
      | "support_level"
      | "user_achievements"
    >
  > {
    return this.request(`/users/${user}/${mode ?? ""}`, {
      query: {
        key: typeof user === "number" ? "id" : "username",
      },
    })
  }
}
