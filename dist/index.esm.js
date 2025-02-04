import * as z from 'zod';
import { z as z$1 } from 'zod';
import { ofetch } from 'ofetch';
import { withQuery } from 'ufo';

var GameMode;
(function (GameMode) {
    GameMode[GameMode["Osu"] = 0] = "Osu";
    GameMode[GameMode["Taiko"] = 1] = "Taiko";
    GameMode[GameMode["CatchTheBeat"] = 2] = "CatchTheBeat";
    GameMode[GameMode["Mania"] = 3] = "Mania";
})(GameMode || (GameMode = {}));
var ApprovedType;
(function (ApprovedType) {
    ApprovedType[ApprovedType["Graveyard"] = -2] = "Graveyard";
    ApprovedType[ApprovedType["WIP"] = -1] = "WIP";
    ApprovedType[ApprovedType["Pending"] = 0] = "Pending";
    ApprovedType[ApprovedType["Ranked"] = 1] = "Ranked";
    ApprovedType[ApprovedType["Approved"] = 2] = "Approved";
    ApprovedType[ApprovedType["Qualified"] = 3] = "Qualified";
    ApprovedType[ApprovedType["Loved"] = 4] = "Loved";
})(ApprovedType || (ApprovedType = {}));
var Genre;
(function (Genre) {
    Genre[Genre["Any"] = 0] = "Any";
    Genre[Genre["Unspecified"] = 1] = "Unspecified";
    Genre[Genre["VideoGame"] = 2] = "VideoGame";
    Genre[Genre["Anime"] = 3] = "Anime";
    Genre[Genre["Rock"] = 4] = "Rock";
    Genre[Genre["Pop"] = 5] = "Pop";
    Genre[Genre["Other"] = 6] = "Other";
    Genre[Genre["Novelty"] = 7] = "Novelty";
    Genre[Genre["HipHop"] = 9] = "HipHop";
    Genre[Genre["Electronic"] = 10] = "Electronic";
    Genre[Genre["Metal"] = 11] = "Metal";
    Genre[Genre["Classical"] = 12] = "Classical";
    Genre[Genre["Folk"] = 13] = "Folk";
    Genre[Genre["Jazz"] = 14] = "Jazz";
})(Genre || (Genre = {}));
var Language;
(function (Language) {
    Language[Language["Any"] = 0] = "Any";
    Language[Language["Unspecified"] = 1] = "Unspecified";
    Language[Language["English"] = 2] = "English";
    Language[Language["Japanese"] = 3] = "Japanese";
    Language[Language["Chinese"] = 4] = "Chinese";
    Language[Language["Instrumental"] = 5] = "Instrumental";
    Language[Language["Korean"] = 6] = "Korean";
    Language[Language["French"] = 7] = "French";
    Language[Language["German"] = 8] = "German";
    Language[Language["Swedish"] = 9] = "Swedish";
    Language[Language["Spanish"] = 10] = "Spanish";
    Language[Language["Italian"] = 11] = "Italian";
    Language[Language["Russian"] = 12] = "Russian";
    Language[Language["Polish"] = 13] = "Polish";
    Language[Language["Other"] = 14] = "Other";
})(Language || (Language = {}));
var Mods;
(function (Mods) {
    Mods[Mods["None"] = 0] = "None";
    Mods[Mods["NoFail"] = 1] = "NoFail";
    Mods[Mods["Easy"] = 2] = "Easy";
    Mods[Mods["TouchDevice"] = 4] = "TouchDevice";
    Mods[Mods["Hidden"] = 8] = "Hidden";
    Mods[Mods["HardRock"] = 16] = "HardRock";
    Mods[Mods["SuddenDeath"] = 32] = "SuddenDeath";
    Mods[Mods["DoubleTime"] = 64] = "DoubleTime";
    Mods[Mods["Relax"] = 128] = "Relax";
    Mods[Mods["HalfTime"] = 256] = "HalfTime";
    Mods[Mods["Nightcore"] = 512] = "Nightcore";
    Mods[Mods["Flashlight"] = 1024] = "Flashlight";
    Mods[Mods["Autoplay"] = 2048] = "Autoplay";
    Mods[Mods["SpunOut"] = 4096] = "SpunOut";
    Mods[Mods["Relax2"] = 8192] = "Relax2";
    Mods[Mods["Perfect"] = 16384] = "Perfect";
    Mods[Mods["Key4"] = 32768] = "Key4";
    Mods[Mods["Key5"] = 65536] = "Key5";
    Mods[Mods["Key6"] = 131072] = "Key6";
    Mods[Mods["Key7"] = 262144] = "Key7";
    Mods[Mods["Key8"] = 524288] = "Key8";
    Mods[Mods["FadeIn"] = 1048576] = "FadeIn";
    Mods[Mods["Random"] = 2097152] = "Random";
    Mods[Mods["Cinema"] = 4194304] = "Cinema";
    Mods[Mods["Target"] = 8388608] = "Target";
    Mods[Mods["Key9"] = 16777216] = "Key9";
    Mods[Mods["KeyCoop"] = 33554432] = "KeyCoop";
    Mods[Mods["Key1"] = 67108864] = "Key1";
    Mods[Mods["Key3"] = 134217728] = "Key3";
    Mods[Mods["Key2"] = 268435456] = "Key2";
    Mods[Mods["ScoreV2"] = 536870912] = "ScoreV2";
    Mods[Mods["Mirror"] = 1073741824] = "Mirror";
    Mods[Mods["KeyMod"] = 521109504] = "KeyMod";
    Mods[Mods["FreeModAllowed"] = 522171579] = "FreeModAllowed";
    Mods[Mods["ScoreIncreaseMods"] = 1049688] = "ScoreIncreaseMods";
})(Mods || (Mods = {}));

const dateUTC = z$1
    .string()
    .transform((date) => date + "Z")
    .pipe(z$1.coerce.date());

const parseUserType = (data) => {
    if (!data) {
        return data;
    }
    else {
        const type = typeof data.u === "string" ? "string" : "id";
        return { ...data, type };
    }
};

const BeatmapSchema = z
    .object({
    approved: z.coerce.number().pipe(z.nativeEnum(ApprovedType)),
    submit_date: dateUTC,
    approved_date: dateUTC.nullable(),
    last_update: dateUTC,
    artist: z.string(),
    artist_unicode: z.string(),
    beatmap_id: z.coerce.number(),
    beatmapset_id: z.coerce.number(),
    bpm: z.coerce.number(),
    creator: z.string(),
    creator_id: z.coerce.number(),
    difficultyrating: z.coerce.number(),
    diff_aim: z.coerce.number(),
    diff_speed: z.coerce.number(),
    diff_size: z.coerce.number(),
    diff_overall: z.coerce.number(),
    diff_approach: z.coerce.number(),
    diff_drain: z.coerce.number(),
    hit_length: z.coerce.number(),
    source: z.string(),
    genre_id: z.coerce.number().pipe(z.nativeEnum(Genre)),
    language_id: z.coerce.number().pipe(z.nativeEnum(Language)),
    title: z.string(),
    title_unicode: z.string(),
    total_length: z.coerce.number(),
    version: z.string(),
    file_md5: z.string(),
    mode: z.coerce.number().pipe(z.nativeEnum(GameMode)),
    tags: z
        .string()
        .transform((tags) => (tags.length > 0 ? tags.split(" ") : [])),
    favourite_count: z.coerce.number(),
    rating: z.coerce.number(),
    playcount: z.coerce.number(),
    passcount: z.coerce.number(),
    count_normal: z.coerce.number(),
    count_slider: z.coerce.number(),
    count_spinner: z.coerce.number(),
    max_combo: z.string(),
    storyboard: z.coerce.number().transform(Boolean),
    video: z.coerce.number().transform(Boolean),
    download_unavailable: z.coerce.number().transform(Boolean),
    audio_unavailable: z.coerce.number().transform(Boolean),
})
    .transform((data) => ({
    ...data,
    getCoverImageURL: () => `https://assets.ppy.sh/beatmaps/${data.beatmapset_id}/covers/cover.jpg`,
    getCoverThumbnailURL: () => `https://b.ppy.sh/thumb/${data.beatmapset_id}l.jpg`,
}));
const getBeatmapParamsInterface = z
    .object({
    beatmapId: z.number(),
    beatmapSetId: z.number(),
    user: z.number().or(z.string()),
    mode: z.nativeEnum(GameMode),
    converted: z.boolean(),
    hash: z.string(),
    limit: z.number(),
    mods: z.number(),
    since: z.string().date(),
})
    .partial();
const getBeatmapParamsSchema = getBeatmapParamsInterface
    .optional()
    .transform((data) => ({
    b: data?.beatmapId,
    s: data?.beatmapSetId,
    u: data?.user,
    m: data?.mode,
    a: data?.converted,
    h: data?.hash,
    limit: data?.limit,
    mods: data?.mods,
    since: data?.since,
}))
    .transform(parseUserType);

class APIClient {
    request;
    constructor(token, baseURL, tokenType) {
        this.request = ofetch.create({
            baseURL,
            headers: tokenType === "bearer"
                ? {
                    Authorization: `Bearer ${token}`,
                }
                : undefined,
            params: tokenType === "query" ? { k: token } : undefined,
            onResponse: (ctx) => {
                console.debug(ctx.response._data);
            },
        });
    }
}

const UserEventSchema = z.object({
    display_html: z.string(),
    beatmap_id: z.coerce.number(),
    beatmapset_id: z.coerce.number(),
    date: dateUTC,
    epicfactor: z.coerce.number().min(1).max(32),
});
const UserSchema = z
    .object({
    user_id: z.coerce.number(),
    username: z.string(),
    join_date: dateUTC,
    count300: z.coerce.number(),
    count100: z.coerce.number(),
    count50: z.coerce.number(),
    playcount: z.coerce.number(),
    ranked_score: z.coerce.number(),
    total_score: z.coerce.number(),
    pp_rank: z.coerce.number(),
    level: z.coerce.number(),
    pp_raw: z.coerce.number(),
    accuracy: z.coerce.number(),
    count_rank_ss: z.coerce.number(),
    count_rank_ssh: z.coerce.number(),
    count_rank_s: z.coerce.number(),
    count_rank_sh: z.coerce.number(),
    count_rank_a: z.coerce.number(),
    country: z.string(),
    total_seconds_played: z.coerce.number(),
    pp_country_rank: z.coerce.number(),
    events: z.array(UserEventSchema),
})
    .transform((data) => ({
    ...data,
    avatar_url: () => `https://a.ppy.sh/${data.user_id}`,
}));
const GetUserParamsInterface = z
    .object({
    user: z.union([z.string(), z.coerce.number()]),
    mode: z.nativeEnum(GameMode),
    event_days: z.coerce.number().min(1).max(31),
})
    .partial();
const GetUserParamsSchema = GetUserParamsInterface.optional()
    .transform((data) => ({
    u: data?.user,
    m: data?.mode,
    event_days: data?.event_days,
}))
    .transform(parseUserType);

const ScoreSchema = z.object({
    score_id: z.coerce.number(),
    score: z.coerce.number(),
    username: z.string(),
    count300: z.coerce.number(),
    count100: z.coerce.number(),
    count50: z.coerce.number(),
    countmiss: z.coerce.number(),
    maxcombo: z.coerce.number(),
    countkatu: z.coerce.number(),
    countgeki: z.coerce.number(),
    perfect: z.coerce.number().transform(Boolean),
    enabled_mods: z.coerce.number(),
    user_id: z.coerce.number(),
    date: dateUTC,
    rank: z.string(),
    pp: z.coerce.number(),
    replay_available: z.coerce.number().transform(Boolean),
});
const UserScoreSchema = ScoreSchema.extend({
    score_id: z.coerce.number().nullable(),
}).omit({
    username: true,
    replay_available: true,
    pp: true,
});
const getScoresParamsInterface = z.object({
    beatmapId: z.number(),
    user: z.number().or(z.string()).optional(),
    mode: z.nativeEnum(GameMode).optional(),
    mods: z.number().optional(),
    limit: z.number().optional(),
});
const getScoresParamsSchema = getScoresParamsInterface
    .partial()
    .optional()
    .transform((data) => ({
    b: data?.beatmapId,
    u: data?.user,
    m: data?.mode,
    mods: data?.mods,
    limit: data?.limit,
}))
    .transform(parseUserType);
const getUserScoreParamsInterface = getScoresParamsInterface.omit({
    beatmapId: true,
    mods: true,
});
const getUserScoreParamsSchema = getUserScoreParamsInterface
    .partial()
    .optional()
    .transform((data) => ({
    u: data?.user,
    m: data?.mode,
    limit: data?.limit,
}))
    .transform(parseUserType);

var Team;
(function (Team) {
    Team[Team["Blue"] = 1] = "Blue";
    Team[Team["Red"] = 2] = "Red";
})(Team || (Team = {}));
var TeamMode;
(function (TeamMode) {
    TeamMode[TeamMode["HeadToHead"] = 0] = "HeadToHead";
    TeamMode[TeamMode["TagCoop"] = 1] = "TagCoop";
    TeamMode[TeamMode["TeamVs"] = 2] = "TeamVs";
    TeamMode[TeamMode["TagTeamVs"] = 3] = "TagTeamVs";
})(TeamMode || (TeamMode = {}));
var ScoreMode;
(function (ScoreMode) {
    ScoreMode[ScoreMode["Score"] = 0] = "Score";
    ScoreMode[ScoreMode["Accuracy"] = 1] = "Accuracy";
    ScoreMode[ScoreMode["Combo"] = 2] = "Combo";
    ScoreMode[ScoreMode["ScoreV2"] = 3] = "ScoreV2";
})(ScoreMode || (ScoreMode = {}));
const MatchScoreSchema = z.object({
    slot: z.coerce.number(),
    team: z.nativeEnum(Team),
    user_id: z.coerce.number(),
    score: z.coerce.number(),
    maxcombo: z.coerce.number(),
    rank: z.coerce.number(),
    count50: z.coerce.number(),
    count100: z.coerce.number(),
    count300: z.coerce.number(),
    countmiss: z.coerce.number(),
    countgeki: z.coerce.number(),
    countkatu: z.coerce.number(),
    perfect: z.coerce.number().transform(Boolean),
    pass: z.coerce.number().transform(Boolean),
    enabled_mods: z.number().nullable(),
});
const MatchInfoSchema = z.object({
    match_id: z.coerce.number(),
    name: z.string(),
    start_time: dateUTC,
    end_time: dateUTC.nullable(),
});
const GameSchema = z.object({
    game_id: z.coerce.number(),
    start_time: dateUTC,
    end_time: dateUTC.nullable(),
    beatmap_id: z.coerce.number(),
    play_mode: z.nativeEnum(GameMode),
    match_type: z.coerce.number(),
    scoring_type: z.nativeEnum(ScoreMode),
    team_type: z.nativeEnum(TeamMode),
    mods: z.coerce.number(),
    scores: z.array(MatchScoreSchema),
});
const MatchSchema = z.object({
    match: MatchInfoSchema,
    games: z.array(GameSchema),
});
z.number();

const ReplaySchema = z.object({
    content: z.string(),
    encoding: z.string(),
});
const getReplayParamsInterface = z.object({
    beatmapId: z.number(),
    user: z.number().or(z.string()).optional(),
    mode: z.nativeEnum(GameMode).optional(),
    spec: z.number().optional(),
    type: z.string().optional(),
    mods: z.number().optional(),
});
const getReplayParamsSchema = getReplayParamsInterface
    .partial()
    .optional()
    .transform((data) => ({
    b: data?.beatmapId,
    u: data?.user,
    m: data?.mode,
    s: data?.spec,
    t: data?.type,
    mods: data?.mods,
}))
    .transform(parseUserType);

const BASE_URL = "https://osu.ppy.sh/api";
const OAUTH_URL = "https://osu.ppy.sh/oauth";

class APIv1 extends APIClient {
    constructor(token) {
        super(token, BASE_URL, "query");
    }
    /**
     * 獲取用戶信息。
     * @param user 用戶ID或用戶名。
     * @param options 可選參數，包括：
     * - `mode` (string): 遊戲模式。
     * - `event_days` (number): 事件天數。
     * @returns 用戶信息或undefined。
     */
    async getUser(user, options) {
        const params = GetUserParamsSchema.parse({ user, ...options });
        const [users] = UserSchema.array().parse(await this.request("/get_user", { params }));
        return users;
    }
    /**
     * 獲取譜面信息。
     * @param params 譜面參數，包括：
     * - `since` (string): 起始日期。
     * - `set` (number): 譜面集ID。
     * - `hash` (string): 譜面哈希。
     * @returns 譜面信息數組。
     */
    async getBeatmaps(params) {
        const query = getBeatmapParamsSchema.parse(params);
        return BeatmapSchema.array().parse(await this.request("/get_beatmaps", { query }));
    }
    /**
     * 獲取單個譜面信息。
     * @param beatmapId 譜面ID。
     * @param options 可選參數，包括：
     * - `mods` (string): 模組。
     * - `mode` (string): 遊戲模式。
     * @returns 譜面信息。
     */
    async getBeatmap(beatmapId, options) {
        return (await this.getBeatmaps({ beatmapId, ...options }))[0];
    }
    /**
     * 獲取譜面集信息。
     * @param beatmapSetId 譜面集ID。
     * @param options 可選參數，包括：
     * - `mods` (string): 模組。
     * - `mode` (string): 遊戲模式。
     * @returns 譜面信息數組。
     */
    async getBeatmapSet(beatmapSetId, options) {
        return await this.getBeatmaps({ beatmapSetId, ...options });
    }
    /**
     * 獲取用戶的譜面信息。
     * @param user 用戶ID或用戶名。
     * @param options 可選參數，包括：
     * - `mods` (string): 模組。
     * - `mode` (string): 遊戲模式。
     * @returns 譜面信息數組。
     */
    async getUserBeatmaps(user, options) {
        return await this.getBeatmaps({ user, ...options });
    }
    /**
     * 獲取譜面分數。
     * @param beatmapId 譜面ID。
     * @param options 可選參數，包括：
     * - `mods` (string): 模組。
     * - `mode` (string): 遊戲模式。
     * @returns 分數信息數組。
     */
    async getScores(beatmapId, options) {
        const params = getScoresParamsSchema.parse({ beatmapId, ...options });
        return ScoreSchema.array().parse(await this.request("/get_scores", { params }));
    }
    /**
     * 獲取用戶最佳分數。
     * @param user 用戶ID或用戶名。
     * @param options 可選參數，包括：
     * - `mode` (string): 遊戲模式。
     * - `limit` (number): 返回結果的數量限制。
     * @returns 用戶最佳分數數組。
     */
    async getUserBest(user, options) {
        const params = getUserScoreParamsSchema.parse({ user, ...options });
        return UserScoreSchema.array().parse(await this.request("/get_user_best", { params }));
    }
    /**
     * 獲取用戶最近分數。
     * @param user 用戶ID或用戶名。
     * @param options 可選參數，包括：
     * - `mode` (string): 遊戲模式。
     * - `limit` (number): 返回結果的數量限制。
     * @returns 用戶最近分數數組。
     */
    async getUserRecent(user, options) {
        const params = getUserScoreParamsSchema.parse({ user, ...options });
        return UserScoreSchema.array().parse(await this.request("/get_user_recent", { params }));
    }
    /**
     * 獲取比賽信息。
     * @param matchId 比賽ID。
     * @returns 比賽信息。
     */
    async getMatch(matchId) {
        return MatchSchema.parse(await this.request("/get_match", { params: { mp: matchId } }));
    }
    /**
     * 獲取回放信息。
     * @param beatmapId 譜面ID。
     * @param user 用戶ID或用戶名。
     * @param options 可選參數，包括：
     * - `mode` (string): 遊戲模式。
     * @returns 回放信息。
     */
    async getReplay(beatmapId, user, options) {
        const params = getReplayParamsSchema.parse({ beatmapId, user, ...options });
        return ReplaySchema.parse(await this.request("/get_replay", { params }));
    }
}

class APIv2 extends APIClient {
    constructor(token) {
        super(token, `${BASE_URL}/v2`, "bearer");
    }
}

var OAuthScopes;
(function (OAuthScopes) {
    OAuthScopes["ChatRead"] = "chat.read";
    OAuthScopes["ChatWrite"] = "chat.write";
    OAuthScopes["ChatWriteManage"] = "chat.write_manage";
    OAuthScopes["Delegate"] = "delegate";
    OAuthScopes["ForumWrite"] = "forum.write";
    OAuthScopes["FirendsRead"] = "friends.read";
    OAuthScopes["Identity"] = "identity";
    OAuthScopes["Public"] = "public";
})(OAuthScopes || (OAuthScopes = {}));
var GrantType;
(function (GrantType) {
    GrantType["AuthorizationCode"] = "code";
    GrantType["ClientCredentials"] = "client_credentials";
    GrantType["RefreshAccessToken"] = "refresh_token";
})(GrantType || (GrantType = {}));
class Client {
    id;
    secret;
    redirectURI;
    constructor({ id, secret, redirectURI, }) {
        this.id = id;
        this.secret = secret;
        this.redirectURI = redirectURI;
    }
    buildAuthorizationURL({ scope, state, }) {
        return withQuery(`${OAUTH_URL}/authorize`, {
            client_id: this.id,
            redirect_uri: this.redirectURI,
            response_type: "code",
            scope: scope.join(" "),
            state,
        });
    }
    async getAccessToken(grantType, p1, p2) {
        const body = {
            client_id: this.id,
            client_secret: this.secret,
            grant_type: grantType,
        };
        if (p1 && typeof p1 === "string") {
            if (grantType === GrantType.AuthorizationCode) {
                body.code = p1;
            }
            else if (grantType === GrantType.RefreshAccessToken) {
                body.refresh_token = p1;
            }
        }
        if (p1 && Array.isArray(p1)) {
            body.scope = p1.join(" ");
        }
        if (p2) {
            body.scope = p2.join(" ");
        }
        return ofetch(`${OAUTH_URL}/token`, {
            method: "POST",
            body: body,
        });
    }
}

export { APIv1, APIv2, ApprovedType, Client, GameMode, Genre, Language, Mods };
