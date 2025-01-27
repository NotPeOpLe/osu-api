# osu-api

這個項目提供了一個與 osu! API 交互的客戶端。

## 特性

- 使用 `zod` 驗證數據及參數
- 目前已實現：
  - OAuthClient
  - v1 API，包含基本測試和完整測試
- v2 API 製作中

## 安裝

要安裝依賴項，請運行：

```bash
pnpm install
```

## 打包

要打包項目，請運行：

```bash
pnpm build
```

## 使用方法

### OAuthClient

```javascript
import { OAuthClient } from "osu-api";

// 示例用法
const client = new OAuthClient({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  redirectUri: "your-redirect-uri",
});
```

### v1 API

```javascript
import { APIv1 } from "osu-api";

// 示例用法
const api = new APIv1("your-api-token");
api
  .getUser({ u: "username" })
  .then((user) => console.log(user))
  .catch((error) => console.error(error));
```

## 測試

要運行測試，請使用：

```bash
pnpm test
```

## 貢獻

歡迎貢獻！請打開一個 issue 或提交 pull request。

## 許可證

目前沒有
