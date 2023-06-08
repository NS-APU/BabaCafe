<script context="module" lang="ts">
  import { AccountService } from "../../services/AccountService";
  import type { GotoHelper, IsActiveHelper } from "@roxi/routify";
  import { markAsLoginState, markAsLogoutState } from "../../stores/Login";

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
      return false;
    }

    try {
      const currentAccount = await new AccountService().getProfile();

      if (!currentAccount) return _redirect("/login");

      return true;
    } catch (err) {
      addToast({
        message: err.message,
        type: "error",
      });
      return false;
    }
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import CircularProgress from "@smui/circular-progress";
  import { isActive, redirect } from "@roxi/routify";
  import { addToast } from "../../stores/Toast";

  // 外部に処理を切り出すためにstoreを使うと"TypeError: Cannot read property 'component' of null"エラーがでてしまう。
  let loading = true;
  onMount(async () => {
    const ok = await canEnterPage($redirect, $isActive);

    if (ok) {
      loading = false;
      markAsLoginState();
    } else {
      loading = false;
      markAsLogoutState();
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
