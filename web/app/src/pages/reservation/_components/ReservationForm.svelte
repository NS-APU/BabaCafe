<script lang="ts">
  import { createForm } from "felte";
  import { goto, params } from "@roxi/routify";
  import { ProductRepository, type TProduct } from "../../../models/Product";
  import type { TReservationForm } from "../../../models/Reservation";
  import Textfield from "@smui/textfield";
  import Select, { Option } from "@smui/select";
  import Button from "@smui/button";
  import Paper from "@smui/paper";
  import { onMount } from "svelte";
  import dayjs from "dayjs";
  import { addToast } from "../../../stores/Toast";
  import { AccountService } from "../../../services/AccountService";
  import { markAsLogoutState } from "../../../stores/Login";
  import { CROP_UNITS_LABEL } from "../../../constants/product";

  export let onConfirm: (values: Required<TReservationForm>) => unknown;

  let shops: Record<string, string>[] | undefined = [];
  let shopIds: Record<string, string> | undefined = undefined;
  let selectedProduct: TProduct;
  let totalPrice = 0;

  onMount(async () => {
    try {
      [selectedProduct, shops] = await Promise.all([
        new ProductRepository().findOne($params.productId),
        new AccountService().getShops(),
      ]);
      shopIds = Object.fromEntries(shops.map(({ id, name }) => [id, name]));

      totalPrice = selectedProduct.unitPrice;
    } catch (err) {
      switch (err.error || err.message) {
        case "Unauthorized":
          markAsLogoutState();
          addToast({
            message: "認証が切れました。再度ログインしてください。",
            type: "error",
          });
          $goto("/login");
          break;
        default:
          addToast({
            message:
              "情報の取得に失敗しました。もう一度時間をおいて再読み込みしてください。",
            type: "error",
          });
          break;
      }
    }
  });

  const DESIRE_DEFAULT_DATE_TIME = new Date();
  DESIRE_DEFAULT_DATE_TIME.setHours(0);
  DESIRE_DEFAULT_DATE_TIME.setMinutes(0);

  const showPicker = (e: Event) => {
    if ((e.target instanceof HTMLInputElement)) {
      e.target.showPicker()
    }
  }

  // フォームの項目
  let quantity = 1;
  let desiredAt = DESIRE_DEFAULT_DATE_TIME.toISOString().slice(0, 16);
  let receiveLocationId = shopIds ? Object.keys(shopIds)[0] : '';

  const initialValues = {
    quantity: 1,
    desiredAt:  DESIRE_DEFAULT_DATE_TIME.toISOString().slice(0, 16),
    receiveLocationId: shopIds ? Object.keys(shopIds)[0] : '',
    // totalPrice: totalPrice
  };

  // TODO: バリデーションの実装
  const { form } = createForm({
    initialValues,
    onSubmit: async (values) => {
      await onConfirm({
        ...values,
        productId: selectedProduct.id,
        quantity: quantity,
        desiredAt: desiredAt,
        receiveLocationId: receiveLocationId,
      });
    },
  });

  function calcTotalPrice() {
    totalPrice = quantity * selectedProduct.unitPrice;
  }
</script>

{#if selectedProduct}
  <div class="grid justify-center">
    <div class="container">
      <div class="flex">
        {#if selectedProduct.producer.image}
          <div class="w-[45px] h-[45px] rounded-[50%]">
            <img
            class="w-[45px] h-[45px] rounded-[50%]"
            src={selectedProduct.producer.image}
            alt=""
          />
          </div>
        {:else if selectedProduct.producer.classification === "individual"}
          <img
            class="w-[45px] h-[45px] rounded-[50%]"
            src="/images/farmer.png"
            alt=""
          />
        {:else if selectedProduct.producer.classification === "corporate"}
          <img
            class="w-[45px] h-[45px] rounded-[50%]"
            src="/images/house.png"
            alt=""
          />
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
        src={selectedProduct.image ??
          "https://girlydrop.com/wp-content/uploads/post/p5774.jpg"}
        alt=""
        width="300"
        class="mt-3"
      />
      <Paper
        class="mt-3 w-[300px]"
        color="secondary"
        variant="outlined">
        <div class="text-center text-base text-[#5A5A5A] mt-2">
          {selectedProduct.unitQuantity}{CROP_UNITS_LABEL[selectedProduct.unit]}あたり{selectedProduct.unitPrice}円
        </div>
        <div class="text-center text-base text-[#5A5A5A] mt-2">残りあと{selectedProduct.remaining}点</div>
        <div class="text-center text-base text-[#5A5A5A] mt-2">
          予約期間：
          {dayjs(selectedProduct.startAt).format("MM/DD HH:mm")}
          -
          {dayjs(selectedProduct.endAt).format("MM/DD HH:mm")}
        </div>
      </Paper>
    </div>

    <form use:form class="mt-5" >

      <div class="flex justify-center">
        <Textfield
          class="m-3 w-[200px]"
          label="予約数量"
          bind:value={quantity}
          required
          type={"number"}
          suffix="点"
          input$min={1}
          input$max={selectedProduct.remaining}
          on:change={calcTotalPrice}
        />
      </div>

      <div class="flex justify-center">
        <Textfield
          class="m-3 w-[200px]"
          variant="standard"
          label="受け取り希望日時"
          bind:value={desiredAt}
          type="datetime-local"
          required
          input$min={new Date(selectedProduct.startAt).toISOString().slice(0, 16)}
          input$max={new Date(selectedProduct.endAt).toISOString().slice(0, 16)}
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
              bind:value={receiveLocationId}
              required
            >
              {#each Object.keys(shopIds) as shopId}
                <Option value={shopId}
                  >{shopIds[shopId]}</Option
                >
              {/each}
            </Select>
          </div>
          {#if receiveLocationId}
            <div class="flex justify-center">
              <Paper
                class="p-1 w-[200px]"
                color="secondary"
                variant="outlined">
                <div class="text-base text-[#5A5A5A]">
                  <div>〒{shops.find(shop => shop.id === receiveLocationId).zipCode}</div>
                  <div>{shops.find(shop => shop.id === receiveLocationId).address}</div>
                </div>
              </Paper>
            </div>
          {/if}
        </div>
      {/if}

      <div class="text-2xl text-[#5A5A5A] flex justify-center mt-8">
        合計金額：{totalPrice ?? selectedProduct.unitPrice}円
      </div>

      <div class="flex justify-center">
        <Button
          color="secondary"
          variant="raised"
          class="w-[150px]  px-4 py-2 mt-10 mr-4 rounded-full"
          on:click={() => $goto("../../../product/")}
          type="button"
        >
        <p class="black">キャンセル</p>
        </Button>
        <Button
          variant="raised"
          class="w-[150px] px-4 py-2 mt-10 rounded-full"
          color="secondary"
          type="submit"
        >
          <p class="black">予約確定</p>
        </Button>
      </div>
    </form>
  </div>
{/if}
