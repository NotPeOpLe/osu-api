import { describe, test, expect } from "vitest"
import { APIv2, Client } from "osu-api"

describe("Test APIv2", async () => {
  const client = new Client({
    id: +import.meta.env.OSU_CLIENT_ID!,
    secret: import.meta.env.OSU_CLIENT_SECRET!,
    redirectURI: import.meta.env.OSU_REDIRECT_URI!,
  })
  const token = await client.getAccessToken("client_credentials", ["public"])
  const api = new APIv2(token.access_token)

  test("Get BeatmapPacks", async () => {
    let beatmapPacks = await api.getBeatmapPacks()
    while (beatmapPacks) {
      beatmapPacks = await beatmapPacks.next()
    }
  })
  test("Get BeatmapPacks", async () => {
    const beatmapPacks = await api.getBeatmapPack("S2")
    console.log(beatmapPacks)
  })
})
