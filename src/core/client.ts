import { ofetch } from "ofetch";
import { OAUTH_URL } from "./const";
import { withQuery } from "ufo";

export enum OAuthScopes {
  ChatRead = "chat.read",
  ChatWrite = "chat.write",
  ChatWriteManage = "chat.write_manage",
  Delegate = "delegate",
  ForumWrite = "forum.write",
  FirendsRead = "friends.read",
  Identity = "identity",
  Public = "public",
}

export enum GrantType {
  AuthorizationCode = "code",
  ClientCredentials = "client_credentials",
  RefreshAccessToken = "refresh_token",
}

export type AuthorizationCodeToken = {
  access_token: string;
  expires_in: number;
  token_type: "Bearer";
  refresh_token: string;
};

export type ClientCredentialsToken = Omit<
  AuthorizationCodeToken,
  "refresh_token"
>;

type AccessTokenRequestBody = {
  client_id: number;
  client_secret: string;
  grant_type: GrantType;
  code?: string;
  refresh_token?: string;
  scope?: string;
};

export class Client {
  id: number;
  secret: string;
  redirectURI: string;

  constructor({
    id,
    secret,
    redirectURI,
  }: {
    id: number;
    secret: string;
    redirectURI: string;
  }) {
    this.id = id;
    this.secret = secret;
    this.redirectURI = redirectURI;
  }

  public buildAuthorizationURL({
    scope,
    state,
  }: {
    scope: OAuthScopes[];
    state: string;
  }) {
    return withQuery(`${OAUTH_URL}/authorize`, {
      client_id: this.id,
      redirect_uri: this.redirectURI,
      response_type: "code",
      scope: scope.join(" "),
      state,
    });
  }

  /**
   * https://osu.ppy.sh/docs/#client-credentials-grant
   */
  getAccessToken(
    grantType: GrantType.ClientCredentials,
    scope?: OAuthScopes[],
  ): Promise<ClientCredentialsToken>;

  /**
   * https://osu.ppy.sh/docs/#authorization-code-grant
   */
  getAccessToken(
    grantType: GrantType.AuthorizationCode,
    code: string,
    scope?: OAuthScopes[],
  ): Promise<AuthorizationCodeToken>;

  /**
   * https://osu.ppy.sh/docs/#authorization-code-grant
   *
   * Access token expires after some time as per `expires_in` field. Refresh the token to get new access token without going through authorization process again.
   */
  getAccessToken(
    grantType: GrantType.RefreshAccessToken,
    refresh_token: string,
    scope?: OAuthScopes[],
  ): Promise<AuthorizationCodeToken>;

  public async getAccessToken(
    grantType: GrantType,
    p1?: string | OAuthScopes[],
    p2?: OAuthScopes[],
  ) {
    const body: AccessTokenRequestBody = {
      client_id: this.id,
      client_secret: this.secret,
      grant_type: grantType,
    };

    if (p1 && typeof p1 === "string") {
      if (grantType === GrantType.AuthorizationCode) {
        body.code = p1;
      } else if (grantType === GrantType.RefreshAccessToken) {
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
