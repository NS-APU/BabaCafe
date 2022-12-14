declare module "@roxi/routify" {
  // routifyの`$params`で補完が効くようにする。特定のページでしか使わないparamsもここに書いてしまう。
  export const params: import("svelte/store").Readable<{
    id: string;
  }>;
}
