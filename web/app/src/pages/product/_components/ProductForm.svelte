<script lang="ts">
  import { createField, createForm } from "felte";
  import { goto } from "@roxi/routify";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import { z } from "zod";
  import type { TProductForm } from "../../../models/Product";
  import Button from "@smui/button";
  import TextField from "../../../components/cusstomized/TextField.svelte";
  import NumberField from "../../../components/cusstomized/NumberField.svelte";
  import { ShowableError } from "../../../models/Error";
  import { encodeFileToBase64 } from "../../../utils/file";
  // export let PAGE_TYPE: "new" | "edit" = "new";
  export let product = {} as TProductForm;
  export let onConfirm: (values: Required<TProductForm>) => unknown;

  let loading = false;
  const productSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    saleStartDate: z.string(),
    unitWeight: z.number(),
    price: z.number(),
    totalAmount: z.number(),
  });

  const initialValues = {
    name: "",
    description: "",
    saleStartDate: "",
    unitWeight: 0,
    price: 0,
    totalAmount: 0,
    image: "",
  };

  const { form, data } = createForm({
    initialValues,
    onSubmit: (values) => {},
  });

  // data URLに変換された画像を$data内に保持するためのもの
  const { field, onInput, onBlur } = createField("image");

  async function onImgSelect(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const files = event.target.files;

      loading = true;

      try {
        onInput(await encodeFileToBase64(files[0]));
        onBlur();
      } catch {
        throw new ShowableError("画像の読み込みに失敗しました。");
      } finally {
        loading = false;
      }
    }
  }

  async function onImgDelete() {
    onInput("");
    onBlur();
  }

  async function onSubmit() {
    await onConfirm({
      ...$data,
    });
  }
  let name = "";
  let description = "";
  let startSaleDate = "";
  let unitWeight = 0;
  let price = 0;
  let totalAmount = 0;
  let image = "";
</script>

<div>
  <form use:form>
    <TextField
      name="name"
      label="商品名"
      textValue={name}
      helperText="例）とれたて苺"
    />

    <Textfield
      class="w-[400px] mt-8"
      variant="standard"
      label="作物の種類"
      value=""
    >
      <HelperText slot="helper">例）苺</HelperText>
    </Textfield>

    <TextField
      name="description"
      label="商品の説明"
      textValue={description}
      helperText="例）甘くて美味しい、真っ赤な苺です。"
    />

    <TextField
      name="saleStartDate"
      label="販売可能日"
      textValue={startSaleDate}
      helperText="例）20231010"
    />

    <div class="mt-8">
      <p class="text-text-lightGray">金額</p>
      <div class="flex">
        <NumberField name="unitWeight" textValue={unitWeight} />
        <p class="text-[#919191] mx-4 mt-8">gあたり</p>
        <NumberField name="price" textValue={price} helperText="例）4000" />
        <p class="text-text-lightGray mt-8 -ml-6">円</p>
      </div>
    </div>

    <NumberField
      name="totalAmount"
      label="販売数量"
      textValue={totalAmount}
      helperText="例）200"
    />

    <div class="input-row mt-6">
      <div class="label required input-title text-text-lightGray">商品画像</div>
      <div class="input-box">
        <div
          class="bg-white rounded-lg border-solid border-[1px] border-text-lightGray min-h-[200px] my-2 relative"
          use:field
        >
          {#if !$data.image}
            <div class="mt-16">
              <!-- <img class="mx-auto" src="/images/icons/upload.svg" alt="" /> -->
              <p class="text-text-lightGray font-bold text-sm text-center mt-6">
                画像ファイルをアップロード
              </p>
              <div class="text-center mt-2">
                <label
                  class="upload-button h-8 pt-2 px-3 mt-4 text-text-lightGray"
                >
                  ファイルを選択
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    bind:value={image}
                  />
                </label>
              </div>
            </div>
          {:else}
            <div class="mb-9">
              <div class="flex justify-end mt-2 mr-2">削除</div>
              <img class="px-10" src={$data.image} alt="" />
            </div>
          {/if}
        </div>
        <div class="text-text-lightGray">最大アップロードサイズ:5MB</div>
      </div>
    </div>

    <div class="ml-[17%] flex mt-8">
      <Button
        color="secondary"
        variant="raised"
        class="font-bold text-lg px-7 py-2 mr-14"
        on:click={() => $goto("./")}
        type="button"
      >
        キャンセル
      </Button>

      <Button
        variant="raised"
        class="px-7 py-2"
        color="secondary"
        type="submit"
        on:click={onSubmit}
      >
        <p class="font-bold text-lg">出品する</p>
      </Button>
    </div>
  </form>
</div>
