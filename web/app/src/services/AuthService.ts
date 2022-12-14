import { baseAPI } from "../api/base";
import { ShowableError } from "../models/Error";

export class AuthService {
  async login(
    username: string,
    password: string
  ): Promise<Record<string, string>> {
    try {
      return await baseAPI<Record<string, string>>({
        endpoint: "auth/login",
        method: "POST",
        body: {
          username,
          password,
        },
      });
    } catch (err) {
      switch (err.code) {
        case "UserNotFoundException":
          throw new ShowableError("ユーザーが見つかりませんでした。");
        case "NotAuthorizedException":
          throw new ShowableError("パスワードが違います。");
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
        endpoint: "auth/profile",
        method: "GET",
      });
    } catch (err) {
      throw new ShowableError(
        "エラーが発生しました。時間をおいて再読み込みしてください。"
      );
    }
  }
}
