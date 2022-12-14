<script lang="ts">
  import { goto } from "@roxi/routify";
  import Card, { Content, PrimaryAction, MediaContent } from "@smui/card";
  import Button from "@smui/button";
  import { ProductRepository, type TProduct } from "../../models/Product";
  import CircularProgress from "@smui/circular-progress";
  import { addToast } from "../../stores/Toast";

  let clicked = 0;
  $: productRepository = new ProductRepository();

  async function fetchProducts(): Promise<TProduct[]> {
    try {
      return productRepository.all();
    } catch (err) {
      addToast({
        message:
          "商品の取得に失敗しました。もう一度時間をおいて再読み込みしてください。",
        type: "error",
      });
    }
  }
</script>

{#await fetchProducts()}
  <div style="display: flex; justify-content: center">
    <CircularProgress style="height: 160px; width: 32px;" indeterminate />
  </div>
{:then products}
  <div class="m-6">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold">出品一覧</h1>
      <Button
        color="secondary"
        variant="raised"
        class="px-5 h-10"
        on:click={() => $goto("./new")}
      >
        <p class="font-bold text-lg">新規出品</p>
      </Button>
    </div>

    <div class="card-display">
      {#each products as product, i}
        <div class="card-container relative">
          <Card class="rounded-[24px]">
            <PrimaryAction on:click={$goto(`./${product.id}`)}>
              <div>
                <img
                  class="product-img"
                  src={product.image ??
                    "https://girlydrop.com/wp-content/uploads/post/p5774.jpg"}
                  alt=""
                />
                <MediaContent>
                  <div class="card-content" />
                </MediaContent>
              </div>
              <Content class="mdc-typography--body2">
                <div class="text-sm">
                  {#if product.producer.image}
                    <img
                      class="absolute top-[59%] w-[40px] h-[40px] rounded-[50%]"
                      src={product.producer.image}
                      alt=""
                    />
                  {:else}
                    <img
                      class="absolute top-[59%] w-[40px] h-[40px] rounded-[50%]"
                      src="./../../../public/farmer.png"
                      alt=""
                    />
                  {/if}
                  <div class="absolute top-[66%] left-[60px] text-[#4A4A4A]">
                    {product.producer.name}
                  </div>
                </div>
                <div class="text-xl font-bold mt-4">
                  {product.name}
                </div>
                <div class="text-sm text-[#4A4A4A] mt-2">
                  {product.producer.address + product.producer.address2}
                </div>
                <div class="price-block">
                  <div class="text-lg text-[#4A4A4A] mt-1">
                    {product.unitWeight}gあたり
                  </div>
                  <div class="text-2xl text-[#4A4A4A]">
                    {product.price}
                  </div>
                  <div class="text-[#4A4A4A] mt-1.5">円 ~</div>
                </div>
              </Content>
            </PrimaryAction>
          </Card>
        </div>
      {/each}
    </div>
  </div>
{/await}

<style lang="postcss">
  /* * :global(.card-media-16x9) {
    background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqJwNC26Z0-qKuh5jgSofZZ8gtkZ5hkCIp7Q&usqp=CAU);
  } */
  .card-display {
    @apply grid grid-cols-2 gap-16 mt-8 px-8;
  }

  .card-content {
    @apply bg-[#fff] absolute bottom-4 left-4;
  }
  .product-img {
    @apply h-auto w-[500px];
  }

  .price-block {
    @apply flex relative left-[43%];
  }
</style>
