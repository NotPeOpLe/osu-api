import { APIv1, GameMode } from "osu-api"
import { test, expect } from "vitest"

const api = new APIv1(process.env.OSU_API_KEY)

test("Get user by user_id", async () => {
  const user = await api.getUser(6008293)
  expect(user).toBeDefined()
  expect(user?.username).toBe("840")
  expect(user?.user_id).toBe(6008293)
})

test("Get user by username", async () => {
  const user = await api.getUser("840")
  expect(user).toBeDefined()
  expect(user?.username).toBe("840")
  expect(user?.user_id).toBe(6008293)
})

test("Get user be undefined", async () => {
  const user = await api.getUser("a")
  expect(user).toBeUndefined()
})

test("Get user with mode", async () => {
  await api.getUser("840", { mode: GameMode.Osu })
  await api.getUser("840", { mode: GameMode.Taiko })
  await api.getUser("840", { mode: GameMode.CatchTheBeat })
  await api.getUser("840", { mode: GameMode.Mania })
})

test("Get beatmapset", async () => {
  const beatmaps = await api.getBeatmaps({ beatmapSetId: 773330 })
  expect(beatmaps.length).toBe(11)
  expect(beatmaps[0].title).toBe("Happy Time wa Owaranai")
  expect(beatmaps[0].artist_unicode).toBe("七森中☆ごらく部")
})

test("Get beatmap", async () => {
  const beatmap = await api.getBeatmap(4080382, { mode: GameMode.Osu })
  expect(beatmap.title_unicode).toBe("焼ケ鮭")
})

test("Get beatmap scores", async () => {
  const scores = await api.getScores(3815421)
  expect(scores.length).toBeGreaterThan(0)
})
test("Get beatmap user scores", async () => {
  const scores = await api.getScores(3815421, { user: 6008293 })
  expect(scores.length).toBeGreaterThan(0)
})

test("Get user best scores", async () => {
  const scores = await api.getUserBest(6008293)
  expect(scores.length).toBeGreaterThan(0)
})

test("Get user recent scores", async () => {
  const scores = await api.getUserRecent(6008293)
  expect(scores.length).toBeGreaterThan(0)
  console.log(scores)
})

// test("Get match", async () => {
//   const match = await api.getMatch(12345);
//   expect(match).toBeDefined();
//   expect(match.match.match_id).toBe(12345);
// });

// test("Get replay", async () => {
//   const replay = await api.getReplay({ b: 67890, u: 6008293 });
//   expect(replay).toBeDefined();
//   expect(replay.content).toBeDefined();
// });
