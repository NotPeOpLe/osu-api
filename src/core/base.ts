import { ofetch } from "ofetch"

export class APIClient {
  protected request

  constructor(token: string, baseURL: string, tokenType: "bearer" | "query") {
    this.request = ofetch.create({
      baseURL,
      headers:
        tokenType === "bearer"
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
      params: tokenType === "query" ? { k: token } : undefined,
    })
  }
}
