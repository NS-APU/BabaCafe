import { ShowableError } from "../models/Error";
import { writable } from "svelte/store";

type TNotice = {
  id: number;
  message: string;
  type: "success" | "fail";
};

const { subscribe, update } = writable<TNotice[]>([]);

export const noticesStore = {
  subscribe,
  add({
    message,
    type,
    delay = 3000,
  }: Omit<TNotice, "id"> & { delay?: number }) {
    const newNoticeId = new Date().getTime();
    update((prev) => [...prev, { message, type, id: newNoticeId }]);

    // 一定時間経過したあとに削除する
    setTimeout(() => {
      update((prev) => prev.filter((p) => p.id !== newNoticeId));
    }, delay);
  },
  /**
   * 渡されたエラーが ShowableError の場合はメッセージをそのまま表示する。
   * そうでない場合は、デフォルトのエラーメッセージを表示する。
   */
  showError(err: Error, options?: { defaultErrorMessage: string }) {
    const isShowableError = err.name === ShowableError.name;
    const message = isShowableError
      ? err.message // 表示可能なエラーメッセージであればそのまま表示する。
      : options?.defaultErrorMessage ||
        "エラーが発生しました。時間をおいて再読み込みしてください。";
    noticesStore.add({ message, type: "fail" });

    console.error(err); // 本番環境でもデバッグしやすいように、コンソールにエラーを表示しておく
  },
};
