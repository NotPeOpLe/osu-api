import { APIClient } from "./base";
import { BASE_URL } from "./const";

export class APIv2 extends APIClient {
  constructor(token: string) {
    super(token, `${BASE_URL}/v2`, "bearer");
  }
}
