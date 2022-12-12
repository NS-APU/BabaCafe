<script lang="ts">
  import { goto } from "@roxi/routify";
  import Button from "@smui/button";
  import Textfield from "@smui/textfield";
  import Radio from "@smui/radio";
  import Formfield from "@smui/form-field";
  import HelperText from "@smui/textfield/helper-text";
  import { GENDER_TEXTS } from "../../constants/gender";
  import Select, { Option } from "@smui/select";

  let email = "";
  let password = "";
  let gender: "male" | "female" = "male";
  const shops = ["BaBaCafe"];

  const USER_STATUS = {
    PRODUCER: "producer",
    STAFF: "staff",
  } as const;

  const USER_STATUS_LABEL = {
    PRODUCER: "農家",
    STAFF: "店舗スタッフ",
  } as const;

  let userStatus: typeof USER_STATUS[keyof typeof USER_STATUS] =
    USER_STATUS.PRODUCER;
</script>

<h1 class="text-2xl font-bold m-8">新規登録画面</h1>

<form class="grid justify-center my-[50px]">
  <Textfield
    class="w-[400px]"
    variant="standard"
    label="お名前"
    bind:value={email}
  >
    <HelperText slot="helper">例）鈴木太郎</HelperText>
  </Textfield>

  <Textfield
    class="mt-6 w-[400px]"
    variant="standard"
    label="パスワード"
    bind:value={password}
  >
    <HelperText slot="helper">例）example_password</HelperText>
  </Textfield>

  <Textfield
    class="mt-6 w-[400px]"
    variant="standard"
    label="メールアドレス"
    bind:value={password}
  >
    <HelperText slot="helper">例）example@ex.com</HelperText>
  </Textfield>

  <Textfield
    class="mt-6 w-[400px]"
    variant="standard"
    label="電話番号"
    bind:value={password}
  >
    <HelperText slot="helper">例）000-0000-0000</HelperText>
  </Textfield>

  <Textfield
    class="mt-6 w-[400px]"
    variant="standard"
    label="郵便番号"
    bind:value={password}
  >
    <HelperText slot="helper">例）000-0000</HelperText>
  </Textfield>

  <Textfield
    class="mt-6 w-[400px]"
    variant="standard"
    label="住所１（都道府県・市区町村）"
    bind:value={password}
  >
    <HelperText slot="helper">例）秋田県山本郡三種町</HelperText>
  </Textfield>

  <Textfield
    class="mt-6 w-[400px]"
    variant="standard"
    label="住所２（その他）"
    bind:value={password}
  >
    <HelperText slot="helper">例）下岩川長面台50</HelperText>
  </Textfield>

  <Textfield
    class="mt-6 w-[400px]"
    variant="standard"
    label="生年月日"
    bind:value={password}
  >
    <HelperText slot="helper">例）19990101</HelperText>
  </Textfield>

  <div class="mt-6">
    <p class="text-[#808080]">性別</p>
    <div class="flex">
      {#each Object.keys(GENDER_TEXTS) as value}
        <Formfield>
          <Radio bind:group={gender} {value} touch />
          <span slot="label">{GENDER_TEXTS[value]}</span>
        </Formfield>
      {/each}
    </div>
  </div>

  <Select
    class="w-[400px] mt-6"
    variant="standard"
    label="ユーザーステータス"
    bind:value={userStatus}
  >
    <Option value="" />
    {#each Object.keys(USER_STATUS) as status}
      <Option value={USER_STATUS[status]}>{USER_STATUS_LABEL[status]}</Option>
    {/each}
  </Select>

  {#if userStatus === "producer"}
    <Textfield
      class="w-[400px] mt-6"
      variant="standard"
      label="農業法人名"
      bind:value={email}
    >
      <HelperText slot="helper">例）陽だまりマルシェ、Green家</HelperText>
    </Textfield>

    <Textfield
      class="w-[400px] mt-6"
      variant="standard"
      label="郵便番号（農地）"
      bind:value={email}
    >
      <HelperText slot="helper">例）111-1111</HelperText>
    </Textfield>

    <Textfield
      class="w-[400px] mt-6"
      variant="standard"
      label="農地住所"
      bind:value={email}
    >
      <HelperText slot="helper">例）秋田県山本郡三種町</HelperText>
    </Textfield>

    <Textfield
      class="w-[400px] mt-6"
      variant="standard"
      label="農地住所2"
      bind:value={email}
    >
      <HelperText slot="helper">例）下岩川長面台50</HelperText>
    </Textfield>
  {:else if userStatus === USER_STATUS.STAFF}
    <Select
      class="w-[400px] mt-6"
      variant="standard"
      label="店舗"
      bind:value={email}
    >
      <Option value="" />
      {#each shops as shop}
        <Option value={shop}>{shop}</Option>
      {/each}
    </Select>
  {/if}

  <div>
    <div class="ml-8">
      <Button
        on:click={$goto("../login")}
        variant="raised"
        color="secondary"
        class="w-[100px]  px-4 py-2 mt-10 mr-4 rounded-full"
      >
        <p class="black">戻る</p>
      </Button>

      <Button
        variant="raised"
        color="secondary"
        class="w-[100px] px-4 py-2 mt-10 rounded-full"
      >
        <p class="black">新規登録</p>
      </Button>
    </div>
  </div>
</form>
