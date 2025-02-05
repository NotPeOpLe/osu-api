import test from "node:test"
import { APIv2, Client } from "osu-api"

test("Test APIv2", async (t) => {
  const client = new Client({
    id: +process.env.OSU_CLIENT_ID!,
    secret: process.env.OSU_CLIENT_SECRET!,
    redirectURI: process.env.OSU_REDIRECT_URI!,
  })

  let api: APIv2

  t.test("Setup APIv2", async (t) => {
    const token = await client.getAccessToken("client_credentials")
    api = new APIv2(token.access_token)
  })
})
