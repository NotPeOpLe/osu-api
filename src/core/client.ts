import { ofetch } from "ofetch"
import { withQuery } from "ufo"

export const OAUTH_URL = "https://osu.ppy.sh/oauth"

export type OAuthScopes =
  | "chat.read"
  | "chat.write"
  | "chat.write_manage"
  | "delegate"
  | "forum.write"
  | "friends.read"
  | "identity"
  | "public"

export type GrantType = "code" | "client_credentials" | "refresh_token"
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
    scope: OAuthScopes[]
    state: string
  }) {
    return withQuery(`${OAUTH_URL}/authorize`, {
      client_id: this.id,
      redirect_uri: this.redirectURI,
      response_type: "code",
      scope: scope.join(" "),
      state,
    })
  }

  /**
   * https://osu.ppy.sh/docs/#client-credentials-grant
   */
  getAccessToken(
    grantType: "client_credentials",
    scope?: OAuthScopes[],
  ): Promise<ClientCredentialsToken>

  /**
   * https://osu.ppy.sh/docs/#authorization-code-grant
   */
  getAccessToken(
    grantType: "code",
    code: string,
    scope?: OAuthScopes[],
  ): Promise<AuthorizationCodeToken>

  /**
   * https://osu.ppy.sh/docs/#authorization-code-grant
   *
   * Access token expires after some time as per `expires_in` field. Refresh the token to get new access token without going through authorization process again.
   */
  getAccessToken(
    grantType: "refresh_token",
    refresh_token: string,
    scope?: OAuthScopes[],
  ): Promise<AuthorizationCodeToken>

  public async getAccessToken(
    grantType: GrantType,
    p1?: string | OAuthScopes[],
    p2?: OAuthScopes[],
  ) {
    const body: AccessTokenRequestBody = {
      client_id: this.id,
      client_secret: this.secret,
      grant_type: grantType,
    }

    if (p1 && typeof p1 === "string") {
      if (grantType === "code") {
        body.code = p1
      } else if (grantType === "refresh_token") {
        body.refresh_token = p1
      }
    }

    if (p1 && Array.isArray(p1)) {
      body.scope = p1.join(" ")
    }

    if (p2) {
      body.scope = p2.join(" ")
    }

    return ofetch(`${OAUTH_URL}/token`, {
      method: "POST",
      body: body,
    })
  }
}
