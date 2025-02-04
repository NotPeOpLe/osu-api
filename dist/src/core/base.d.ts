export declare class APIClient {
    protected request: import("ofetch").$Fetch;
    constructor(token: string, baseURL: string, tokenType: "bearer" | "query");
}
