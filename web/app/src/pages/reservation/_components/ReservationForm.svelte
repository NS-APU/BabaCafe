<script lang="ts">
  import { goto, params } from '@roxi/routify';
  import Button from '@smui/button';
  import Paper from '@smui/paper';
  import Select, { Option } from '@smui/select';
  import Textfield from '@smui/textfield';
  import dayjs from 'dayjs';
  import { createForm } from 'felte';
  import { onMount } from 'svelte';
  import { CROP_UNITS_LABEL } from '../../../constants/product';
  import { ProductRepository, type TProduct } from '../../../models/Product';
  import { AccountService } from '../../../services/AccountService';
  import { handleError } from '../../../utils/error-handle-helper';
  import type { TReservationForm, TReservation } from '../../../models/Reservation';

  const QUANTITY_MAX = 100;
  const QUANTITY_MIN = 1;

  const DESIRE_DEFAULT_DATE_TIME = dayjs().minute(0);

  const DATE_FORMAT_DESCRIPTION = 'MM/DD HH:mm';
  const DATE_FORMAT_TEXTFIELD = 'YYYY-MM-DDTHH:mm';

  export let onConfirm: (values: Required<TReservationForm>) => unknown;

  export let reservation: TReservation | undefined = undefined;
  export let pageType: 'new' | 'edit';

  let shops: Record<string, string>[] | undefined = [];
  let shopIds: Record<string, string> | undefined = undefined;
  let selectedProduct: TProduct;
  let totalPrice = 0;
  let quantityRangeMax: number;

  onMount(async () => {
    try {
      [selectedProduct, shops] = await Promise.all([
        new ProductRepository().findOne($params.productId),
        new AccountService().getShops(),
      ]);
      shopIds = Object.fromEntries(shops.map(({ id, name }) => [id, name]));
      quantityRangeMax = selectedProduct.remaining > QUANTITY_MAX ? QUANTITY_MAX : selectedProduct.remaining;
      totalPrice = selectedProduct.unitPrice;
    } catch (err) {
      handleError(err);
    }
  });

  const showPicker = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      e.target.showPicker();
    }
  };

  // TODO: バリデーションの実装
  const { form, data } = createForm({
    initialValues: {
      quantity: reservation?.quantity || 1,
      desiredAt: reservation?.desiredAt
        ? dayjs(reservation.desiredAt).format(DATE_FORMAT_TEXTFIELD)
        : DESIRE_DEFAULT_DATE_TIME.format(DATE_FORMAT_TEXTFIELD),
      receiveLocationId: reservation?.receiveLocationId || '',
    },
    onSubmit: async (values) => {
      await onConfirm({
        ...values,
        productId: selectedProduct.id,
        quantity: $data.quantity,
        desiredAt: $data.desiredAt,
        receiveLocationId: $data.receiveLocationId,
      });
    },
  });

  function calcTotalPrice() {
    totalPrice = $data.quantity * selectedProduct.unitPrice;
  }
</script>

{#if selectedProduct}
  <div class="grid justify-center">
    <div class="container">
      <div class="flex">
        {#if selectedProduct.producer.image}
          <div class="h-[45px] w-[45px] rounded-[50%]">
            <img class="h-[45px] w-[45px] rounded-[50%]" src={selectedProduct.producer.image} alt="" />
          </div>
        {:else if selectedProduct.producer.classification === 'individual'}
          <img class="h-[45px] w-[45px] rounded-[50%]" src="/images/farmer.png" alt="" />
        {:else if selectedProduct.producer.classification === 'corporate'}
          <img class="h-[45px] w-[45px] rounded-[50%]" src="/images/house.png" alt="" />
        {/if}
        <div class="ml-4 mt-3">
          <div class="text-xl text-[#8A8A8A]">
            {selectedProduct.producer.name}
          </div>
        </div>
      </div>
      <h1 class="mt-3 text-2xl font-bold text-[#5A5A5A]">
        {selectedProduct.name}
      </h1>
      <img
        src={selectedProduct.image ?? 'https://girlydrop.com/wp-content/uploads/post/p5774.jpg'}
        alt=""
        width="300"
        class="mt-3"
      />
      <Paper class="mt-3 w-[300px]" color="secondary" variant="outlined">
        <div class="mt-2 text-center text-base text-[#5A5A5A]">
          {selectedProduct.unitQuantity}{CROP_UNITS_LABEL[selectedProduct.unit]}あたり{selectedProduct.unitPrice}円
        </div>
        <div class="mt-2 text-center text-base text-[#5A5A5A]">残りあと{selectedProduct.remaining}点</div>
        <div class="mt-2 text-center text-base text-[#5A5A5A]">
          予約期間：
          {dayjs(selectedProduct.startAt).format(DATE_FORMAT_DESCRIPTION)}
          -
          {dayjs(selectedProduct.endAt).format(DATE_FORMAT_DESCRIPTION)}
        </div>
      </Paper>
    </div>

    <form use:form class="mt-5">
      <div class="flex justify-center">
        <Textfield
          class="m-3 w-[200px]"
          label="予約数量"
          bind:value={$data.quantity}
          required
          type={'number'}
          suffix="点"
          input$min={QUANTITY_MIN}
          input$max={quantityRangeMax}
          on:change={calcTotalPrice}
        />
      </div>

      <div class="flex justify-center">
        <Textfield
          class="m-3 w-[200px]"
          variant="standard"
          label="受け取り希望日時"
          bind:value={$data.desiredAt}
          type="datetime-local"
          required
          input$min={dayjs(selectedProduct.startAt).format(DATE_FORMAT_TEXTFIELD)}
          input$max={dayjs(selectedProduct.endAt).format(DATE_FORMAT_TEXTFIELD)}
          on:click={showPicker}
        />
      </div>

      {#if shopIds}
        <div>
          <div class="flex justify-center">
            <Select
              class="m-3 w-[200px]"
              label="受け取り場所"
              variant="standard"
              bind:value={$data.receiveLocationId}
              required
            >
              {#each Object.keys(shopIds) as shopId}
                <Option value={shopId}>{shopIds[shopId]}</Option>
              {/each}
            </Select>
          </div>
          {#if $data.receiveLocationId}
            <div class="flex justify-center">
              <Paper class="w-[200px] p-1" color="secondary" variant="outlined">
                <div class="text-base text-[#5A5A5A]">
                  <div>〒{shops.find((shop) => shop.id === $data.receiveLocationId).zipCode}</div>
                  <div>{shops.find((shop) => shop.id === $data.receiveLocationId).address}</div>
                </div>
              </Paper>
            </div>
          {/if}
        </div>
      {/if}

      <div class="mt-8 flex justify-center text-2xl text-[#5A5A5A]">
        合計金額：{totalPrice ?? selectedProduct.unitPrice}円
      </div>

      <div class="flex justify-center">
        <Button
          color="secondary"
          variant="raised"
          class="mt-10  mr-4 w-[150px] rounded-full px-4 py-2"
          on:click={() => $goto('../../../product/')}
          type="button"
        >
          <p class="black">キャンセル</p>
        </Button>
        <Button variant="raised" class="mt-10 w-[150px] rounded-full px-4 py-2" color="secondary" type="submit">
          <p class="black">{pageType === 'new' ? '予約確定' : '編集'}</p>
        </Button>
      </div>
    </form>
  </div>
{/if}
