<script lang="ts">
  import Button from "@smui/button";
  import Textfield from "@smui/textfield";

  let email = "";
  let password = "";
</script>

<h1 class="text-2xl font-bold m-8">ログイン画面</h1>

<form class="grid justify-center mt-[20%] my-[50px]">
  <Textfield
    class="w-[400px]"
    variant="standard"
    label="email"
    bind:value={email}
  />

  <Textfield
    class="mt-6 w-[400px]"
    variant="standard"
    label="password"
    bind:value={password}
  />

  <Button
    class="w-[100px] w-[150px] py-2 rounded-full mt-8 ml-[35%]"
    color="secondary"
    variant="raised"
  >
    <p class="black font-bold">ログイン</p>
  </Button>
  <a class="text-text-lightGray mt-4" href="./signup/"
    >新規ユーザーの方はこちら</a
  >
</form>
