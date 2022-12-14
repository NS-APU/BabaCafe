<script context="module" lang="ts">
  import { AuthService } from "./../../services/AuthService";
  import type { GotoHelper, IsActiveHelper } from "@roxi/routify";
  import { accountIdStore } from "../../stores/Account";

  /**
   * 各ページに遷移する前に、もろもろのチェックを行う。
   * 状態によっては、別のページにリダイレクトこともある。
   *
   * routify の $isActive や $goto はコンポーネント外で使えないため、苦肉の策として、以下の param を使う
   * @param isActive 与えられたパスが、今滞在しているパスと同じかを判定する関数。
   * @returns ページに遷移する権限があるか
   */
  export async function canEnterPage(
    redirect: GotoHelper,
    isActive: IsActiveHelper
  ): Promise<boolean> {
    /**
     * 指定したページに遷移する。ただし、指定先のページにすでにいる場合は何もしない
     * @param path 遷移先のページ
     */
    function _redirect(path: string): boolean {
      if (isActive(path)) return true; // すでに指定先のページにいる場合

      redirect(path);
      return false; // リダイレクトするということは、もとのページに入る権限はないので、falseを返す
    }

    try {
      const currentAccount = await new AuthService().getProfile();

      if (!currentAccount) return _redirect("/login");

      return true;
    } catch (err) {
      console.error(err);
      alert("通信に失敗しました。時間をおいて再読込してください。");
      return false;
    }
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import CircularProgress from "@smui/circular-progress";
  import { isActive, redirect } from "@roxi/routify";

  // 外部に処理を切り出すためにstoreを使うと"TypeError: Cannot read property 'component' of null"エラーがでてしまう。
  let loading = true;
  onMount(async () => {
    const ok = await canEnterPage($redirect, $isActive);

    if (ok) {
      loading = false;
    } else {
      loading = false;
      $redirect("./login");
    }
  });
</script>

{#if loading}
  <div style="display: flex; justify-content: center">
    <CircularProgress style="height: 160px; width: 32px;" indeterminate />
  </div>
{:else}
  <slot />
{/if}
