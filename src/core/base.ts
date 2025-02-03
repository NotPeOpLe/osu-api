import { ofetch } from "ofetch";
import { BASE_URL } from "./const";

export class APIClient {
  protected request;

  constructor(token: string, version: 1 | 2) {
    this.request = ofetch.create({
      baseURL: `${BASE_URL}`,
      headers:
        version === 2
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
      params: version === 1 ? { k: token } : undefined,
    });
  }
}
