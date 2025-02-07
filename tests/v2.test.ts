import { describe, test, expect } from "vitest"
import { APIv2, Client } from "osu-api"

describe("Test APIv2", async () => {
  const client = new Client({
    id: +process.env.OSU_CLIENT_ID!,
    secret: process.env.OSU_CLIENT_SECRET!,
    redirectURI: process.env.OSU_REDIRECT_URI!,
  })

  let api: APIv2

  test("Setup APIv2", async () => {
    const token = await client.getAccessToken("client_credentials", ["public"])
    api = new APIv2(token.access_token)
  })
})
