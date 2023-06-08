<script lang="ts">
  import { createField, createForm } from "felte";
  import { goto } from "@roxi/routify";
  import Textfield from "@smui/textfield";
    import type { TProductForm } from "../../../models/Product";
  import Button from "@smui/button";
  import TextField from "../../../components/cusstomized/TextField.svelte";
  import NumberField from "../../../components/cusstomized/NumberField.svelte";
  import { ShowableError } from "../../../models/Error";
  import { encodeFileToBase64 } from "../../../utils/file";
  import IconButton from "@smui/icon-button";
  import CloseIcon from "../../../components/icon/CloseIcon.svelte";

  export let onConfirm: (values: Required<TProductForm>) => unknown;

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
    onSubmit: async (values) => {
      await onConfirm({
        ...values,
        unitWeight: Number($data.unitWeight),
        price: Number($data.price),
        totalAmount: Number($data.totalAmount),
      });
    },
  });

  // data URLに変換された画像を$data内に保持するためのもの
  const { field, onInput, onBlur } = createField("image");

  async function onImgSelect(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const files = event.target.files;
      try {
        onInput(await encodeFileToBase64(files[0]));
        onBlur();
      } catch {
        throw new ShowableError("画像の読み込みに失敗しました。");
      }
    }
  }

  async function onImgDelete() {
    onInput("");
    onBlur();
  }

  let name = "";
  let description = "";
  let startSaleDate = "";
  let unitWeight = 0;
  let price = 0;
  let totalAmount = 0;
</script>

<div>
  <form use:form>
    <div>
      <TextField
        name="name"
        label="商品名"
        textValue={name}
        helperText="例）とれたて苺"
      />
    </div>

    <div class="mt-6">
      <Textfield
        class="w-[400px]"
        variant="standard"
        label="作物の種類"
        value=""
      />
    </div>

    <div class="mt-6">
      <TextField
        name="description"
        label="商品の説明"
        textValue={description}
        helperText="例）甘くて美味しい、真っ赤な苺です。"
      />
    </div>

    <div class="mt-6">
      <TextField
        name="saleStartDate"
        label="販売可能日"
        textValue={startSaleDate}
        helperText="例）20231010"
      />
    </div>

    <div class="mt-8">
      <p class="text-text-lightGray">金額</p>
      <div class="flex -mt-3">
        <NumberField name="unitWeight" textValue={unitWeight} />
        <p class="text-[#919191] mx-4 mt-8">gあたり</p>
        <NumberField name="price" textValue={price} helperText="例）4000" />
        <p class="text-text-lightGray mt-8 -ml-6">円</p>
      </div>
    </div>

    <div class="mt-6">
      <NumberField
        name="totalAmount"
        label="販売数量"
        textValue={totalAmount}
        helperText="例）200"
      />
    </div>

    <div class="input-row mt-10">
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
                    type="file"
                    accept="image/*"
                    class="hidden"
                    on:change={onImgSelect}
                  />
                </label>
              </div>
            </div>
          {:else}
            <div class="mb-9">
              <IconButton on:click={onImgDelete}>
                <CloseIcon />
              </IconButton>
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
      >
        <p class="font-bold text-lg">出品する</p>
      </Button>
    </div>
  </form>
</div>
