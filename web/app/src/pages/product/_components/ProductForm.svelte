<script lang="ts">
  import { goto } from '@roxi/routify';
  import Button from '@smui/button';
  import IconButton from '@smui/icon-button';
  import Select, { Option } from '@smui/select';
  import Textfield from '@smui/textfield';
  import { createField, createForm } from 'felte';
  import CloseIcon from '../../../components/icon/CloseIcon.svelte';
  import {
    CROP_KINDS,
    CROP_KINDS_LABEL,
    CROP_UNITS,
    CROP_UNITS_LABEL,
    SHOCK_LEVEL,
    SHOCK_LEVEL_LABEL,
  } from '../../../constants/product';
  import { ShowableError } from '../../../models/Error';
  import { addToast } from '../../../stores/Toast';
  import { encodeFileToBase64 } from '../../../utils/file';
  import type { TProductForm } from '../../../models/Product';

  const START_DEFAULT_DATE_TIME = new Date();
  START_DEFAULT_DATE_TIME.setHours(0);
  START_DEFAULT_DATE_TIME.setMinutes(0);
  const START_AT_MIN_DATE_TIME = new Date();
  START_AT_MIN_DATE_TIME.setHours(0);
  START_AT_MIN_DATE_TIME.setMinutes(0);
  const START_AT_MAX_DATE_TIME = new Date();
  START_AT_MAX_DATE_TIME.setMonth(START_AT_MAX_DATE_TIME.getMonth() + 1);
  START_AT_MAX_DATE_TIME.setDate(START_AT_MAX_DATE_TIME.getDate() - 1);
  START_AT_MAX_DATE_TIME.setHours(0);
  START_AT_MAX_DATE_TIME.setMinutes(0);

  const END_DEFAULT_DATE_TIME = new Date();
  END_DEFAULT_DATE_TIME.setDate(END_DEFAULT_DATE_TIME.getDate() + 7);
  END_DEFAULT_DATE_TIME.setHours(0);
  END_DEFAULT_DATE_TIME.setMinutes(0);
  const END_AT_MIN_DATE_TIME = new Date();
  END_AT_MIN_DATE_TIME.setDate(END_AT_MIN_DATE_TIME.getDate() + 1);
  END_AT_MIN_DATE_TIME.setHours(0);
  END_AT_MIN_DATE_TIME.setMinutes(0);
  const END_AT_MAX_DATE_TIME = new Date();
  END_AT_MAX_DATE_TIME.setMonth(END_AT_MAX_DATE_TIME.getMonth() + 1);
  END_AT_MAX_DATE_TIME.setHours(0);
  END_AT_MAX_DATE_TIME.setMinutes(0);

  const showPicker = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      e.target.showPicker();
    }
  };

  const FILE_LIMIT_SIZE = 5 * 1024 * 1024;

  export let onConfirm: (values: Required<TProductForm>) => unknown;

  const initialValues = {
    name: '',
    kinds: CROP_KINDS.vegetables,
    description: '',
    startAt: START_DEFAULT_DATE_TIME.toISOString().slice(0, 16),
    endAt: END_DEFAULT_DATE_TIME.toISOString().slice(0, 16),
    unit: CROP_UNITS.gram,
    unitQuantity: 1,
    unitPrice: 0,
    image: '',
    quantity: 1,
    shockLevel: SHOCK_LEVEL.strong,
  };

  const { form, data } = createForm({
    initialValues,
    onSubmit: async (values) => {
      await onConfirm({
        ...values,
        name: name,
        kinds: kinds,
        description: description,
        startAt: startAt,
        endAt: endAt,
        unit: unit,
        unitQuantity: Number(unitQuantity),
        unitPrice: Number(unitPrice),
        image: $data.image,
        quantity: Number(quantity),
        shockLevel: Number(shockLevel),
      });
    },
  });

  // data URLに変換された画像を$data内に保持するためのもの
  const { field, onInput, onBlur } = createField('image');

  async function onImgSelect(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const files = event.target.files;
      if (files[0].size > FILE_LIMIT_SIZE) {
        addToast({
          message: '画像ファイルのサイズは5MB以下にしてください。',
          type: 'error',
        });
        return;
      }
      try {
        onInput(await encodeFileToBase64(files[0]));
        onBlur();
      } catch {
        throw new ShowableError('画像の読み込みに失敗しました。');
      }
    }
  }

  async function onImgDelete() {
    onInput('');
    onBlur();
  }

  let name = '';
  let kinds = CROP_KINDS.vegetables;
  let description = '';
  let startAt = START_DEFAULT_DATE_TIME.toISOString().slice(0, 16);
  let endAt = END_DEFAULT_DATE_TIME.toISOString().slice(0, 16);
  let unit = CROP_UNITS.gram;
  let unitQuantity = 1;
  let unitPrice = 0;
  let quantity = 1;
  let shockLevel = SHOCK_LEVEL.strong;
</script>

<div>
  <form use:form class="grid justify-center">
    <div class="w-full">
      <h1 class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">
        作物について
      </h1>

      <div>
        <Textfield
          class="m-3 w-[300px]"
          label="作物名"
          bind:value={name}
          required
          type={'text'}
          input$maxlength={30}
          input$placeholder="例）とれたて苺"
        />
      </div>

      <div>
        <Select class="m-3 w-[300px]" variant="standard" label="作物の種類" bind:value={kinds} required>
          {#each Object.keys(CROP_KINDS) as kind}
            <Option value={CROP_KINDS[kind]}>{CROP_KINDS_LABEL[kind]}</Option>
          {/each}
        </Select>
      </div>

      <div class="m-3">
        <div class="label required input-title text-text-lightGray">説明</div>
        <Textfield
          class="w-[300px] sm:w-[300px] md:w-[600px]"
          bind:value={description}
          textarea
          input$maxlength={500}
          input$placeholder="例）甘くて美味しい、真っ赤な苺です。"
        />
      </div>

      <div class="m-3">
        <div class="label required input-title text-text-lightGray">予約期間</div>
        <Textfield
          class="m-3 w-[150px]"
          variant="standard"
          label="開始"
          bind:value={startAt}
          type="datetime-local"
          required
          input$min={START_AT_MIN_DATE_TIME.toISOString().slice(0, 16)}
          input$max={START_AT_MAX_DATE_TIME.toISOString().slice(0, 16)}
          on:click={showPicker}
        />
        <span class="label ml-3 mr-3 text-text-lightGray">～</span>
        <Textfield
          class="m-3 w-[150px]"
          variant="standard"
          label="終了"
          bind:value={endAt}
          type="datetime-local"
          required
          input$min={END_AT_MIN_DATE_TIME.toISOString().slice(0, 16)}
          input$max={END_AT_MAX_DATE_TIME.toISOString().slice(0, 16)}
          on:click={showPicker}
        />
      </div>

      <div class="m-3">
        <div class="label required input-title text-text-lightGray">単位</div>
        <Textfield
          class="m-3 w-[100px]"
          label="単位数量"
          bind:value={unitQuantity}
          required
          type={'number'}
          input$min={0}
          input$max={99999}
        />
        <Select class="m-3 w-[100px]" label="単位" variant="standard" bind:value={unit} required>
          {#each Object.keys(CROP_UNITS) as kind}
            <Option value={CROP_UNITS[kind]}>{CROP_UNITS_LABEL[kind]}</Option>
          {/each}
        </Select>
      </div>

      <div class="m-3">
        <div class="label required input-title text-text-lightGray">単価</div>
        <Textfield
          class="m-3 w-[150px]"
          label="金額"
          bind:value={unitPrice}
          required
          type={'number'}
          suffix="円"
          input$min={0}
          input$max={99999}
        />
      </div>

      <div class="m-3">
        <div class="label required input-title text-text-lightGray">出品数量</div>
        <Textfield
          class="ml-3 w-[150px]"
          label="数量"
          bind:value={quantity}
          required
          type={'number'}
          suffix="点"
          input$min={0}
          input$max={999}
        />
      </div>

      <div class="input-row m-3">
        <div class="label required input-title text-text-lightGray">商品画像</div>
        <div class="input-box">
          <div
            class="bg-white relative my-2 min-h-[200px] rounded-lg border-[1px] border-solid border-text-lightGray"
            use:field
          >
            {#if !$data.image}
              <div class="mt-16">
                <!-- <img class="mx-auto" src="/images/icons/upload.svg" alt="" /> -->
                <p class="mt-6 text-center text-sm font-bold text-text-lightGray">画像ファイルをアップロード</p>
                <div class="mt-2 text-center">
                  <label class="upload-button mt-4 h-8 px-3 pt-2 text-text-lightGray">
                    ファイルを選択
                    <input type="file" accept="image/*" class="hidden" on:change={onImgSelect} />
                  </label>
                </div>
              </div>
            {:else}
              <div class="mb-9">
                <IconButton on:click={onImgDelete}>
                  <CloseIcon />
                </IconButton>
                <div class="grid justify-center">
                  <img class="px-10" src={$data.image} alt="" width="360" height="360" />
                </div>
              </div>
            {/if}
          </div>
          <div class="text-sm text-text-lightGray">最大アップロードサイズ:5MB</div>
        </div>
      </div>
    </div>

    <div class="w-full">
      <h1 class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">
        混載について
      </h1>

      <div>
        <Select class="m-3 w-[300px]" variant="standard" label="衝撃" bind:value={shockLevel} required>
          {#each Object.keys(SHOCK_LEVEL) as shockLevel}
            <Option value={SHOCK_LEVEL[shockLevel]}>{SHOCK_LEVEL_LABEL[shockLevel]}</Option>
          {/each}
        </Select>
      </div>

      <div class="flex justify-center">
        <Button
          color="secondary"
          variant="raised"
          class="mr-4  mt-10 w-[150px] rounded-full px-4 py-2"
          on:click={() => $goto('./')}
          type="button"
        >
          <p class="black">キャンセル</p>
        </Button>

        <Button variant="raised" class="mt-10 w-[150px] rounded-full px-4 py-2" color="secondary" type="submit">
          <p class="black">出品</p>
        </Button>
      </div>
    </div>
  </form>
</div>
