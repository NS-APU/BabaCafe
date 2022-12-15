<script lang="ts">
  import { createForm } from "felte";
  import { goto, params } from "@roxi/routify";
  import { ProductRepository, type TProduct } from "../../../models/Product";
  import Button from "@smui/button";
  import TextField from "../../../components/cusstomized/TextField.svelte";
  import NumberField from "../../../components/cusstomized/NumberField.svelte";
  import {
    RESERVATION_STATUS,
    type TReservationForm,
  } from "../../../models/Reservation";
  import { onMount } from "svelte";
  import Select from "../../../components/cusstomized/Select.svelte";
  import { addToast } from "../../../stores/Toast";
  import dayjs from "dayjs";
  import { ShopRepository, type TShop } from "../../../models/Shop";

  export let onConfirm: (values: Required<TReservationForm>) => unknown;

  let shops: TShop[];
  let shopIds: Record<string, string> | undefined = undefined;
  let selectedProduct: TProduct;
  onMount(async () => {
    try {
      [selectedProduct, shops] = await Promise.all([
        new ProductRepository().findOne($params.productId),
        new ShopRepository().getShops(),
      ]);
      shopIds = Object.fromEntries(shops.map(({ id, name }) => [id, name]));

      totalPrice = selectedProduct.price;
    } catch {
      addToast({
        message:
          "情報の取得に失敗しました。もう一度時間をおいて再読み込みしてください。",
        type: "error",
      });
    }
  });

  // フォームの項目
  let quantity = 1;
  let shippingDate = "";
  let shopId = "";

  let loading = false;
  let totalPrice = 0;

  const initialValues = {
    totalPrice: selectedProduct?.price,
    status: RESERVATION_STATUS.ACCEPTING,
    shippingDate: "",
    shopId: "",
    quantity: 1,
  };

  // TODO: バリデーションの実装
  const { form, data } = createForm({
    initialValues,
    onSubmit: (values) => {},
  });

  // TODO: いずれはカート機能の実現を行う。
  async function onSubmit() {
    await onConfirm({
      ...$data,
      reservationDate: dayjs().format("YYYY-MM-DD"),
      products: [
        {
          productId: selectedProduct.id,
          quantity: $data.quantity,
        },
      ],
    });
  }

  function calcTotalPrice() {
    $data.totalPrice = $data.quantity * selectedProduct.price;
  }
</script>

{#if selectedProduct}
  <div>
    <div class="mb-8">
      <p class="flex justify-end">本日あと{selectedProduct.totalAmount}点</p>
      <img
        src={selectedProduct.image ??
          "https://girlydrop.com/wp-content/uploads/post/p5774.jpg"}
        alt=""
      />
      <div class="text-3xl text-[#5A5A5A] mt-4">
        {selectedProduct.name}
      </div>
      <div class="text-2xl text-[#5A5A5A] mt-2">
        {selectedProduct.unitWeight}gあたり{selectedProduct.price}円（税込）
      </div>
    </div>

    <form use:form>
      <NumberField
        name="quantity"
        label="数量"
        textValue={quantity}
        helperText="例）3"
        onChange={() => calcTotalPrice()}
      />

      <div class="mt-4">
        <TextField
          name="shippingDate"
          label="受け取り希望日時"
          textValue={shippingDate}
          helperText="2022-12-12"
        />
      </div>

      {#if shopIds}
        <div class="mt-4">
          <Select
            name="shopId"
            selectSelected={shopId}
            selectOptions={Object.keys(shopIds)}
            texts={shopIds}
            label="受け取り場所"
          />
        </div>
      {/if}

      <div class="text-2xl text-[#5A5A5A] flex justify-end mt-8">
        合計金額：{$data.totalPrice ?? selectedProduct.price}円（税込）
      </div>

      <div class="ml-[17%] flex mt-8">
        <Button
          color="secondary"
          variant="raised"
          class="font-bold text-lg px-7 py-2 mr-14"
          on:click={() => $goto("../../../product/")}
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
          <p class="font-bold text-lg">予約確定</p>
        </Button>
      </div>
    </form>
  </div>
{/if}
