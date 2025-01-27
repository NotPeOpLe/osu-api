import { ofetch } from "ofetch";
import { BASE_URL } from "./const";

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class APIClient {
  protected request: <T>(
    path: string,
    method: HTTPMethod,
    params?: Record<string, any>,
    body?: Record<string, any>,
    options?: Record<string, any>
  ) => Promise<T>;

  constructor(token: string, version: 1 | 2) {
    if (version === 1) {
      this.request = function <T>(
        path: string,
        method: HTTPMethod,
        params?: Record<string, any>
      ) {
        return ofetch<T>(`${BASE_URL}/${path}`, {
          method,
          query: { k: token, ...params },
        });
      };
    } else {
      this.request = function <T>(
        path: string,
        method: HTTPMethod,
        params?: Record<string, any>,
        body?: Record<string, any>
      ) {
        return ofetch<T>(`${BASE_URL}/${path}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method,
          query: params,
          body,
        });
      };
    }
  }
}
