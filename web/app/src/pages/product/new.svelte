<script lang="ts">
  import { goto } from "@roxi/routify";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";

  let value;
  let image = "";
</script>

<div class="m-6">
  <h2 class="text-2xl font-bold">新規出品</h2>

  <form class="m-[5%]" action="">
    <Textfield class="w-[400px]" variant="standard" label="商品名" value="">
      <HelperText slot="helper">例）とれたて苺</HelperText>
    </Textfield>

    <Textfield
      class="w-[400px] mt-8"
      variant="standard"
      label="作物の種類"
      value=""
    >
      <HelperText slot="helper">例）苺</HelperText>
    </Textfield>

    <Textfield
      class="w-[400px] mt-8"
      variant="standard"
      label="商品の説明"
      value=""
    >
      <HelperText slot="helper">例）甘くて美味しい、真っ赤な苺です。</HelperText
      >
    </Textfield>

    <Textfield
      class="w-[400px] mt-8"
      variant="standard"
      label="販売可能日"
      value=""
    >
      <HelperText slot="helper">例）20231010</HelperText>
    </Textfield>

    <div class="mt-8">
      <p class="text-text-lightGray">金額</p>
      <div class="flex">
        <Textfield class="w-[100px]" variant="standard" value="" />
        <p class="text-[#919191] mx-4 mt-8">gあたり</p>
        <Textfield class="w-[100px]" variant="standard" value="">
          <HelperText slot="helper">例）4000</HelperText>
        </Textfield>
        <p class="text-text-lightGray mt-8 -ml-6">円</p>
      </div>
    </div>

    <Textfield
      class="w-[400px] mt-8"
      variant="standard"
      label="販売数量"
      value=""
    >
      <HelperText slot="helper">例）200</HelperText>
    </Textfield>

    <div class="input-row mt-6">
      <div class="label required input-title text-text-lightGray">商品画像</div>
      <div class="input-box">
        <div
          class="bg-white rounded-lg border-solid border-[1px] border-text-lightGray min-h-[200px] my-2 relative"
        >
          {#if !image}
            <div class="mt-11">
              <!-- <img class="mx-auto" src="/images/icons/upload.svg" alt="" /> -->
              <p class="text-text-lightGray font-bold text-sm text-center mt-6">
                画像ファイルをアップロード
              </p>
              <div class="text-center mt-2">
                <label
                  class="upload-button h-8 pt-2 px-3 mt-4 text-text-lightGray"
                >
                  ファイルを選択
                  <input type="file" accept="image/*" class="hidden" />
                </label>
              </div>
            </div>
          {:else}
            <div class="mb-9">
              <div class="flex justify-end mt-2 mr-2">削除</div>
              <img class="px-10" src={image} alt="" />
            </div>
          {/if}
        </div>
        <div class="text-text-lightGray">最大アップロードサイズ:5MB</div>
      </div>
    </div>
  </form>

  <div class="ml-[30%]">
    <button
      class="bg-secondary font-bold text-lg px-10 py-2 mr-14 rounded-full"
      on:click={() => $goto("./")}
    >
      キャンセル
    </button>

    <button
      class="bg-secondary font-bold text-lg px-10 py-2 rounded-full"
      on:click={() => $goto("./")}
    >
      出品する
    </button>
  </div>
</div>
