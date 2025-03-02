import { describe, test, expect } from "vitest"
import { APIv2, Client } from "osu-api"
import type { BeatmapPacks } from "@/objects/v2/beatmap-pack"

describe("Test APIv2", async () => {
  const client = new Client({
    id: +import.meta.env.OSU_CLIENT_ID!,
    secret: import.meta.env.OSU_CLIENT_SECRET!,
    redirectURI: import.meta.env.OSU_REDIRECT_URI!,
  })
  const token = await client.getAccessToken("client_credentials", ["public"])
  const api = new APIv2(token.access_token)

  test("Get BeatmapPacks", async () => {
    let beatmapPacks: BeatmapPacks | null = await api.getBeatmapPacks({
      type: "artist",
    })
    console.log(beatmapPacks)
    do {
      beatmapPacks = await beatmapPacks.next()
      console.log(beatmapPacks)
    } while (beatmapPacks)
  })

  test("Get BeatmapPack", async () => {
    const beatmapPacks = await api.getBeatmapPack("A38", { legacy_only: true })
    console.log(beatmapPacks)
  })

  test("Get User", async () => {
    const user = await api.getUser(9449165)
  })
})
