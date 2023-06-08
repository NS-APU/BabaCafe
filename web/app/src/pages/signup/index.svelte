<script lang="ts">
  import { goto } from "@roxi/routify";
  import { onMount } from "svelte";
  import CircularProgress from "@smui/circular-progress";
  import Button from "@smui/button";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import Select, { Option } from "@smui/select";
  import { addToast } from "../../stores/Toast";
  import { isLogined } from "../../stores/Login";
  import { AccountService } from "../../services/AccountService";

  let email: string = "";
  let password: string = "";
  let password_confirm: string = "";

  const USER_CLASSIFICATION = {
    individual: "individual",
    corporate: "corporate",
  } as const;

  const USER_CLASSIFICATION_LABEL = {
    individual: "個人",
    corporate: "法人",
  } as const;

  let classification: typeof USER_CLASSIFICATION[keyof typeof USER_CLASSIFICATION] =
    USER_CLASSIFICATION.individual;

  const USER_ATTRIBUTE = {
    producer: "producer",
    consumer: "consumer",
    logistics: "logistics",
  } as const;

  const USER_ATTRIBUTE_LABEL = {
    producer: "生産者",
    consumer: "消費者",
    logistics: "物流業者",
  } as const;

  let attribute: typeof USER_ATTRIBUTE[keyof typeof USER_ATTRIBUTE] =
    USER_ATTRIBUTE.consumer;

  let name: string = "";
  let tel: string = "";
  let zipCode: string = "";
  let address: string = "";

  async function signup() {
    if (password !== password_confirm) {
      addToast({
        message: "パスワードとパスワード（確認）が一致しません。",
        type: "error",
      });
    } else {
      await new AccountService()
        .signup({
          email,
          password,
          classification,
          attribute,
          name,
          tel,
          zipCode,
          address,
        })
        .then(() => {
          addToast({
            message: "アカウントを作成しました。",
            type: "success",
          });
          $goto("/login");
        })
        .catch((err) => {
          addToast({
            message: err.message,
            type: "error",
          });
        });
    }
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
  <form on:submit|preventDefault={signup} class="grid justify-center">
    <Textfield
      class="m-3 w-[300px]"
      variant="standard"
      label="メールアドレス"
      bind:value={email}
      required
      type={"email"}
      input$maxlength={50}
      input$autocomplete="email"
    >
      <HelperText slot="helper" persistent>例）example@ex.com</HelperText>
    </Textfield>

    <Textfield
      class="m-3 w-[300px]"
      variant="standard"
      label="パスワード"
      bind:value={password}
      required
      type={"password"}
      input$maxlength={50}
      input$autocomplete="new-password"
    />

    <Textfield
      class="m-3 w-[300px]"
      variant="standard"
      label="パスワード（確認）"
      bind:value={password_confirm}
      required
      type={"password"}
      input$maxlength={50}
      input$autocomplete="new-password"
    />

    <Select
      class="m-3 w-[300px]"
      variant="standard"
      label="区分"
      bind:value={classification}
      required
    >
      {#each Object.keys(USER_CLASSIFICATION) as clazz}
        <Option value={USER_CLASSIFICATION[clazz]}
          >{USER_CLASSIFICATION_LABEL[clazz]}</Option
        >
      {/each}
    </Select>

    <Select
      class="m-3 w-[300px]"
      variant="standard"
      label="属性"
      bind:value={attribute}
      required
    >
      {#each Object.keys(USER_ATTRIBUTE) as attr}
        <Option value={USER_ATTRIBUTE[attr]}
          >{USER_ATTRIBUTE_LABEL[attr]}</Option
        >
      {/each}
    </Select>

    <Textfield
      class="m-3 w-[300px]"
      variant="standard"
      label="お名前"
      bind:value={name}
      required
      type={"text"}
      input$maxlength={30}
      input$autocomplete="name"
    >
      <HelperText slot="helper" persistent>
        {#if classification === USER_CLASSIFICATION.individual}
          例）鈴木太郎
        {:else if attribute === USER_ATTRIBUTE.producer}
          例）三種ファーム株式会社
        {:else if attribute === USER_ATTRIBUTE.consumer}
          例）三種フード株式会社
        {:else if attribute === USER_ATTRIBUTE.logistics}
          例）三種交通株式会社
        {/if}
      </HelperText>
    </Textfield>

    <Textfield
      class="m-3 w-[300px]"
      variant="standard"
      label="電話番号"
      bind:value={tel}
      required
      type={"tel"}
      input$maxlength={14}
      input$pattern={"\\d{2,4}-\\d{2,4}-\\d{3,4}"}
      input$autocomplete="tel"
    >
      <HelperText slot="helper" persistent>例）000-0000-0000</HelperText>
    </Textfield>

    <Textfield
      class="m-3 w-[300px]"
      variant="standard"
      label="郵便番号"
      bind:value={zipCode}
      required
      type={"text"}
      input$minlength={8}
      input$maxlength={8}
      input$pattern={"^\\d{3}-\\d{4}$"}
      input$autocomplete="shipping postal-code"
    >
      <HelperText slot="helper" persistent>例）000-0000</HelperText>
    </Textfield>

    <Textfield
      class="m-3 w-[300px]"
      variant="standard"
      label="住所"
      bind:value={address}
      required
      type={"text"}
      input$maxlength={100}
      input$autocomplete="shipping address-level1 address-level2 address-level3 address-level4"
    >
      <HelperText slot="helper" persistent
        >例）秋田県山本郡三種町下岩川長面台50</HelperText
      >
    </Textfield>

    <div class="flex justify-center">
      <Button
        on:click={$goto("../login")}
        variant="raised"
        color="secondary"
        class="w-[100px]  px-4 py-2 mt-10 mr-4 rounded-full"
        type="button"
      >
        <p class="black">戻る</p>
      </Button>

      <Button
        variant="raised"
        color="secondary"
        class="w-[100px] px-4 py-2 mt-10 rounded-full"
        type="submit"
      >
        <p class="black">新規登録</p>
      </Button>
    </div>
  </form>
{/if}
