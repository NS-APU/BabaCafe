<script lang="ts">
  import Button from "@smui/button";
  import Textfield from "@smui/textfield";

  let email = "";
  let password = "";
</script>

<h1 class="text-xl font-bold m-4">ログイン画面</h1>

<form class="grid justify-center my-[50px] ">
  <Textfield
    class="w-[300%]"
    variant="standard"
    label="email"
    bind:value={email}
  />

  <Textfield
    class="mt-6 w-[300%]"
    variant="standard"
    label="password"
    bind:value={password}
  />

  <Button class="w-[100px]  bg-secondary px-4 py-2 mt-10 rounded-full">
    <p class="black">ログイン</p>
  </Button>
  <a class="text-[#808080] mt-2" href="./signup/">新規ユーザーの方はこちら</a>
</form>
