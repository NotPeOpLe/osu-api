import { describe, test, expect } from "vitest"
import { APIv2, Client } from "@/index"
import type { GetBeatmapPacksResponse } from "@/objects/v2/beatmap-pack"

describe("Test APIv2", async () => {
  const client = new Client({
    id: +import.meta.env.OSU_CLIENT_ID!,
    secret: import.meta.env.OSU_CLIENT_SECRET!,
    redirectURI: import.meta.env.OSU_REDIRECT_URI!,
  })
  const token = await client.getAccessToken("client_credentials", ["public"])
  const api = new APIv2(token.access_token)

  test("Get BeatmapPacks", async () => {
    let beatmapPacks: GetBeatmapPacksResponse | null =
      await api.getBeatmapPacks({ type: "artist" })
    do {
      beatmapPacks = await beatmapPacks.next()
    } while (beatmapPacks)
  })

  test("Get BeatmapPack", async () => {
    const beatmapPack = await api.getBeatmapPack("A38", { legacy_only: true })
  })

  test("Get Beatmap", async () => {
    const beatmap = await api.getBeatmap(4674472)
    console.log(beatmap)
    console.log(beatmap.beatmapset?.nominations_summary)
  })
})
