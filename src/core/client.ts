import { ofetch } from "ofetch"

export const OAUTH_URL = "https://osu.ppy.sh/oauth"

export type OAuthScopes =
  | "chat.read"
  | "chat.write"
  | "chat.write_manage"
  | "delegate"
  | "forum.write"
  | "friends.read"
  | "identify"
  | "public"

export type GrantType =
  | "authorization_code"
  | "client_credentials"
  | "refresh_token"
export type AuthorizationCodeToken = {
  access_token: string
  expires_in: number
  token_type: "Bearer"
  refresh_token: string
}

export type ClientCredentialsToken = Omit<
  AuthorizationCodeToken,
  "refresh_token"
>

type AccessTokenRequestBody = {
  client_id: number
  client_secret: string
  grant_type: GrantType
  code?: string
  refresh_token?: string
  scope?: string
}

export class Client {
  id: number
  secret: string
  redirectURI: string

  constructor({
    id,
    secret,
    redirectURI,
  }: {
    id: number
    secret: string
    redirectURI: string
  }) {
    this.id = id
    this.secret = secret
    this.redirectURI = redirectURI
  }

  public buildAuthorizationURL({
    scope,
    state,
  }: {
    scope?: OAuthScopes[]
    state?: string
  }) {
    const url = new URL(`${OAUTH_URL}/authorize`)
    url.searchParams.append("client_id", this.id.toString())
    url.searchParams.append("redirect_uri", this.redirectURI)
    url.searchParams.append("response_type", "code")
    scope && url.searchParams.append("scope", scope.join(" "))
    state && url.searchParams.append("state", state)
    return url
  }

  /**
   * https://osu.ppy.sh/docs/#client-credentials-grant
   */
  getAccessToken(
    grantType: "client_credentials",
    scope: OAuthScopes[],
  ): Promise<ClientCredentialsToken>

  /**
   * https://osu.ppy.sh/docs/#authorization-code-grant
   */
  getAccessToken(
    grantType: "authorization_code",
    code: string,
    scope: OAuthScopes[],
  ): Promise<AuthorizationCodeToken>

  /**
   * https://osu.ppy.sh/docs/#authorization-code-grant
   *
   * Access token expires after some time as per `expires_in` field. Refresh the token to get new access token without going through authorization process again.
   */
  getAccessToken(
    grantType: "refresh_token",
    refresh_token: string,
    scope: OAuthScopes[],
  ): Promise<AuthorizationCodeToken>

  public async getAccessToken(
    grantType: GrantType,
    p1: string | OAuthScopes[],
    p2?: OAuthScopes[],
  ) {
    const body = new URLSearchParams()
    body.append("client_id", this.id.toString())
    body.append("client_secret", this.secret)
    body.append("grant_type", grantType)
    // const body: AccessTokenRequestBody = {
    //   client_id: this.id,
    //   client_secret: this.secret,
    //   grant_type: grantType,
    // }

    if (typeof p1 === "string") {
      if (grantType === "authorization_code") {
        body.append("code", p1)
        body.append("redirect_uri", this.redirectURI)
        // body.code = p1
      } else if (grantType === "refresh_token") {
        body.append("refresh_token", p1)
        // body.refresh_token = p1
      }
    } else if (Array.isArray(p1)) {
      if (p1.length === 0) {
        throw new Error("Scope is required")
      }
      body.append("scope", p1.join(" "))
      // body.scope = p1.join(" ")
    }

    if (p2) {
      if (p2.length === 0) {
        throw new Error("Scope is required")
      }
      body.append("scope", p2.join(" "))
      // body.scope = p2.join(" ")
    }

    return ofetch(`${OAUTH_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body,
      onResponseError: async (c) => {
        console.log(c.request)
        console.log(c.response._data)
      },
    })
  }
}
