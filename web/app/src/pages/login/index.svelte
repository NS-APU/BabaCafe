<script lang="ts">
  import Button from "@smui/button";
  import Textfield from "@smui/textfield";
  import { AuthService } from "../../services/AuthService";
  import { noticesStore } from "../../stores/notice";
  import { goto } from "@roxi/routify";
  import { accountIdStore } from "../../stores/Account";

  let email: string = "";
  let password: string = "";

  type authInfo = {
    email: string;
    password: string;
  };

  let hasEmailNotFoundError: boolean = false;
  let hasPasswordFailedError: boolean = false;

  async function login() {
    hasEmailNotFoundError = false;
    hasPasswordFailedError = false;
    try {
      const authRes = await new AuthService().login(email, password);
      if (authRes) {
        localStorage.setItem("accessToken", authRes.access_token);
        $accountIdStore = authRes.accountId;
        $goto("/reservation");
      }
    } catch (err) {
      switch (err.message) {
        case "ユーザーが見つかりませんでした。":
          return (hasEmailNotFoundError = true);
        case "パスワードが違います。":
          return (hasPasswordFailedError = true);
        default:
          return noticesStore.showError(err);
      }
    }
  }
</script>

<h1 class="text-2xl font-bold m-8">ログイン画面</h1>

<form
  on:submit|preventDefault={login}
  class="grid justify-center mt-[20%] my-[50px]"
>
  <Textfield
    class="w-[400px]"
    variant="standard"
    label="メールアドレス"
    bind:value={email}
  />

  <Textfield
    class="mt-6 w-[400px]"
    variant="standard"
    label="パスワード"
    bind:value={password}
  />

  <Button
    class="w-[100px] w-[150px] py-2 mt-14 ml-[35%]"
    color="secondary"
    variant="raised"
    type="submit"
  >
    <p class="black font-bold">ログイン</p>
  </Button>
  <a class="text-text-lightGray mt-10" href="./signup/"
    >新規ユーザーの方はこちら</a
  >
</form>
