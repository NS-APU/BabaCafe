<script lang="ts">
  import { goto, params } from "@roxi/routify";
  import { ProductRepository, type TProduct } from "../../../models/Product";
  import CircularProgress from "@smui/circular-progress";
  import Paper from "@smui/paper";
  import Button from "@smui/button";
  import { addToast } from "../../../stores/Toast";
  import { markAsLogoutState } from "../../../stores/Login";

  async function fetchProduct(): Promise<TProduct> {
    try {
      return await new ProductRepository().findOne($params.id);
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
              "商品の取得に失敗しました。もう一度時間をおいて再読み込みしてください。",
            type: "error",
          });
          break;
      }
      return null;
    }
  }

  // onMount(async () => {
  //   $accountIdStore;
  // });
</script>

{#await fetchProduct()}
  <div style="display: flex; justify-content: center">
    <CircularProgress style="height: 160px; width: 32px;" indeterminate />
  </div>
{:then product}
  <div class="container">
    <img
      class="w-full h-auto"
      src={product.image ??
        "https://girlydrop.com/wp-content/uploads/post/p5774.jpg"}
      alt=""
    />
    <div>
      <h1 class="text-3xl font-bold text-[#5A5A5A] my-6">
        {product.name}
      </h1>

      <div class="flex">
        {#if product.producer.image}
          <div class="w-[90px] h-[90px] rounded-[50%]">
            {product.producer.image}
          </div>
        {:else}
          <img
            class="w-[90px] h-[90px] rounded-[50%]"
            src="./../../../../public/images/farmer.png"
            alt=""
          />
        {/if}
        <div class="ml-4 mt-5">
          <p class="text-[#8A8A8A] mb-1">
            {product.producer.address + product.producer.address2}
          </p>
          <div class="text-3xl text-[#8A8A8A]">
            {product.producer.name}
          </div>
        </div>
      </div>

      <Paper
        class="mt-5 flex justify-between"
        color="secondary"
        variant="outlined"
      >
        <div class="">
          <div>
            残りあと{product.totalAmount}点
          </div>
          <div class="text-lg">
            {product.name}
          </div>
        </div>
        <div class="text-2xl text-[#5A5A5A] mt-4">
          {product.unitWeight}gあたり{product.price}円（税込）
        </div>
      </Paper>

      <div class="mt-12">
        <h2 class="font-bold text-3xl text-[#5A5A5A]">【商品説明】</h2>
        <div class="text-xl mt-4">
          {product.description}
        </div>
      </div>

      <div class="flex justify-center">
        <Button
          class="mt-14 px-7 h-12"
          color="secondary"
          variant="raised"
          on:click={$goto("../../reservation/new", { productId: $params.id })}
        >
          <p class="text-lg font-bold">予約手続きへ</p>
        </Button>
      </div>
    </div>
  </div>
{/await}

<style lang="postcss">
  .container {
    @apply px-[70px] my-10;
  }
</style>
