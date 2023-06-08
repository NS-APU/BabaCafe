<script lang="ts">
  import { onMount } from "svelte";
  import CircularProgress from "@smui/circular-progress";
  import Button from "@smui/button";
  import Textfield from "@smui/textfield";
  import { AccountService } from "../../services/AccountService";
  import { goto } from "@roxi/routify";
  import { accountIdStore } from "../../stores/Account";
  import { addToast } from "../../stores/Toast";
  import { isLogined, markAsLoginState } from "../../stores/Login";

  let email = "" as string;
  let password = "" as string;

  async function login() {
    await new AccountService()
      .login(email, password)
      .then((res) => {
        localStorage.setItem("accessToken", res.access_token);
        $accountIdStore = res.id;
        $goto("/reservation");
        markAsLoginState();
        addToast({
          message: "ログインしました。",
          type: "success",
        });
      })
      .catch((err) => {
        addToast({
          message: err.message,
          type: "error",
        });
      });
  }

  onMount(() => {
    if ($isLogined) {
      $goto("/reservation");
    }
  });
</script>

{#if $isLogined}
  <div style="display: flex; justify-content: center">
    <CircularProgress style="height: 160px; width: 32px;" indeterminate />
  </div>
{:else}
  <form
    on:submit|preventDefault={login}
    class="grid justify-center mt-[10%] my-[50px]"
  >
    <Textfield
      class="m-3 w-[300px]"
      variant="standard"
      label="メールアドレス"
      bind:value={email}
      required
      input$maxlength={50}
      input$type={"email"}
      input$autocomplete="email"
    />

    <Textfield
      class="m-3 w-[300px]"
      variant="standard"
      label="パスワード"
      bind:value={password}
      required
      input$maxlength={50}
      input$type={"password"}
      input$autocomplete="current-password"
    />

    <Button
      class="login-btn mt-10 mx-14"
      color="secondary"
      variant="raised"
      type="submit"
    >
      <p class="black font-bold">ログイン</p>
    </Button>

    <div class="flex justify-center">
      <a class="text-text-lightGray mt-10" href="./signup/">アカウント作成</a>
    </div>
  </form>
{/if}
