export declare enum OAuthScopes {
    ChatRead = "chat.read",
    ChatWrite = "chat.write",
    ChatWriteManage = "chat.write_manage",
    Delegate = "delegate",
    ForumWrite = "forum.write",
    FirendsRead = "friends.read",
    Identity = "identity",
    Public = "public"
}
export declare enum GrantType {
    AuthorizationCode = "code",
    ClientCredentials = "client_credentials",
    RefreshAccessToken = "refresh_token"
}
export type AuthorizationCodeToken = {
    access_token: string;
    expires_in: number;
    token_type: "Bearer";
    refresh_token: string;
};
export type ClientCredentialsToken = Omit<AuthorizationCodeToken, "refresh_token">;
export declare class Client {
    id: number;
    secret: string;
    redirectURI: string;
    constructor({ id, secret, redirectURI, }: {
        id: number;
        secret: string;
        redirectURI: string;
    });
    buildAuthorizationURL({ scope, state, }: {
        scope: OAuthScopes[];
        state: string;
    }): string;
    /**
     * https://osu.ppy.sh/docs/#client-credentials-grant
     */
    getAccessToken(grantType: GrantType.ClientCredentials, scope?: OAuthScopes[]): Promise<ClientCredentialsToken>;
    /**
     * https://osu.ppy.sh/docs/#authorization-code-grant
     */
    getAccessToken(grantType: GrantType.AuthorizationCode, code: string, scope?: OAuthScopes[]): Promise<AuthorizationCodeToken>;
    /**
     * https://osu.ppy.sh/docs/#authorization-code-grant
     *
     * Access token expires after some time as per `expires_in` field. Refresh the token to get new access token without going through authorization process again.
     */
    getAccessToken(grantType: GrantType.RefreshAccessToken, refresh_token: string, scope?: OAuthScopes[]): Promise<AuthorizationCodeToken>;
}
