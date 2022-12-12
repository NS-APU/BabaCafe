/**
 * エラーメッセージをユーザーに通知してもOKなエラー
 * err.message をそのままユーザーに表示するとプログラマー向けのエラーが表示される事故につながるため、このカスタムエラーを活用する
 */
export class ShowableError extends Error {
  constructor(message: string) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ShowableError);
    }
    this.name = ShowableError.name;
  }
}
