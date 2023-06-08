import { baseAPI } from "../api/base";
import { ShowableError } from "../models/Error";

export class AccountService {
  async login(
    username: string,
    password: string
  ): Promise<Record<string, string>> {
    try {
      return await baseAPI<Record<string, string>>({
        endpoint: "account/login",
        method: "POST",
        body: {
          username,
          password,
        },
      });
    } catch (err) {
      switch (err.message) {
        case "Unauthorized":
          throw new ShowableError("メールアドレスまたはパスワードに誤りがあります。");
        default:
          throw new ShowableError(
            "エラーが発生しました。時間をおいて再読み込みしてください。"
          );
      }
    }
  }

  async getProfile(): Promise<Record<string, string>> {
    try {
      return await baseAPI<Record<string, string>>({
        endpoint: "account/profile",
        method: "GET",
      });
    } catch (err) {
      switch (err.error || err.message) {
        case "Unauthorized":
          throw new ShowableError("ログインしてください。");
        default:
          throw new ShowableError(
            "エラーが発生しました。時間をおいて再読み込みしてください。"
          );
      }
    }
  }

  async signup(body): Promise<Record<string, string>> {
    try {
      return await baseAPI<Record<string, string>>({
        endpoint: "account/signup",
        method: "POST",
        body
      });
    } catch (err) {
      switch (err.error || err.message) {
        case "BadRequest":
          throw new ShowableError("入力項目に誤りがあります。");
        case "Conflict":
          throw new ShowableError("すでにアカウントが存在しています。");
        default:
          throw new ShowableError(
            "エラーが発生しました。時間をおいて再読み込みしてください。"
          );
      }
    }
  }
}
