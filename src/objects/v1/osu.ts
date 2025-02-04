export enum GameMode {
  Osu,
  Taiko,
  CatchTheBeat,
  Mania,
}

export enum ApprovedType {
  Graveyard = -2,
  WIP = -1,
  Pending = 0,
  Ranked = 1,
  Approved = 2,
  Qualified = 3,
  Loved = 4,
}

export enum Genre {
  Any = 0,
  Unspecified = 1,
  VideoGame = 2,
  Anime = 3,
  Rock = 4,
  Pop = 5,
  Other = 6,
  Novelty = 7,
  HipHop = 9,
  Electronic = 10,
  Metal = 11,
  Classical = 12,
  Folk = 13,
  Jazz = 14,
}

export enum Language {
  Any = 0,
  Unspecified = 1,
  English = 2,
  Japanese = 3,
  Chinese = 4,
  Instrumental = 5,
  Korean = 6,
  French = 7,
  German = 8,
  Swedish = 9,
  Spanish = 10,
  Italian = 11,
  Russian = 12,
  Polish = 13,
  Other = 14,
}

export enum Mods {
  None = 0,
  NoFail = 1,
  Easy = 2,
  TouchDevice = 4,
  Hidden = 8,
  HardRock = 16,
  SuddenDeath = 32,
  DoubleTime = 64,
  Relax = 128,
  HalfTime = 256,
  Nightcore = 512, // Only set along with DoubleTime. i.e: NC only gives 576
  Flashlight = 1024,
  Autoplay = 2048,
  SpunOut = 4096,
  Relax2 = 8192, // Autopilot
  Perfect = 16384, // Only set along with SuddenDeath. i.e: PF only gives 16416
  Key4 = 32768,
  Key5 = 65536,
  Key6 = 131072,
  Key7 = 262144,
  Key8 = 524288,
  FadeIn = 1048576,
  Random = 2097152,
  Cinema = 4194304,
  Target = 8388608,
  Key9 = 16777216,
  KeyCoop = 33554432,
  Key1 = 67108864,
  Key3 = 134217728,
  Key2 = 268435456,
  ScoreV2 = 536870912,
  Mirror = 1073741824,
  KeyMod = Key1 |
    Key2 |
    Key3 |
    Key4 |
    Key5 |
    Key6 |
    Key7 |
    Key8 |
    Key9 |
    KeyCoop,
  FreeModAllowed = NoFail |
    Easy |
    Hidden |
    HardRock |
    SuddenDeath |
    Flashlight |
    FadeIn |
    Relax |
    Relax2 |
    SpunOut |
    KeyMod,
  ScoreIncreaseMods = Hidden | HardRock | DoubleTime | Flashlight | FadeIn,
}

export const resultRank = [
  "F",
  "D",
  "C",
  "B",
  "A",
  "S",
  "X",
  "SH",
  "XH",
] as const
type ResultRank = (typeof resultRank)[number]
