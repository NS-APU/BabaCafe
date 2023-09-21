<script lang="ts">
  import { goto } from '@roxi/routify';
  import Button from '@smui/button';
  import Card, { Content, PrimaryAction } from '@smui/card';
  import CircularProgress from '@smui/circular-progress';
  import dayjs from 'dayjs';
  import { USER_ATTRIBUTE } from '../../constants/account';
  import { CROP_UNITS_LABEL } from '../../constants/product';
  import { ProductRepository, type TProduct } from '../../models/Product';
  import { profile } from '../../stores/Account';
  import { handleError } from '../../utils/error-handle-helper';

  $: productRepository = new ProductRepository();

  async function fetchProducts(): Promise<TProduct[]> {
    try {
      const products = await productRepository.all();
      return products;
    } catch (err) {
      handleError(err);
      return [];
    }
  }
</script>

{#await fetchProducts()}
  <div class="flex justify-center">
    <CircularProgress class="h-40 w-8" indeterminate />
  </div>
{:then products}
  <div class="m-6">
    {#if $profile.attribute === USER_ATTRIBUTE.producer}
      <div class="flex justify-center">
        <Button
          color="secondary"
          variant="raised"
          class="mt-10 w-[150px] rounded-full px-4 py-2"
          on:click={() => $goto('./new')}
        >
          <p class="black">出品</p>
        </Button>
      </div>
    {/if}

    <div class="container mx-auto my-12 md:px-12">
      <div class="-mx-1 flex flex-wrap lg:-mx-4">
        {#each products as product}
          <div class="my-1 flex px-1 sm:justify-center md:w-1/2 md:w-full lg:my-4 lg:w-1/3 lg:px-4 xl:w-1/4">
            <Card class="rounded-[24px]">
              <PrimaryAction on:click={$goto(`./${product.id}`)} class="h-full">
                <Content class="mdc-typography--body2 relative top-[10px]">
                  <div>
                    <!-- TODO: imageタグ内の重複コードを解消する -->
                    {#if product.producer.image}
                      <img class="absolute top-0 h-[30px] w-[30px] rounded-[50%]" src={product.producer.image} alt="" />
                    {:else if product.producer.classification === 'corporate'}
                      <img class="absolute top-0 h-[30px] w-[30px] rounded-[50%]" src="/images/house.png" alt="" />
                    {:else}
                      <img class="absolute top-0 h-[30px] w-[30px] rounded-[50%]" src="/images/farmer.png" alt="" />
                    {/if}
                    <div class="absolute left-[60px] top-[6%] text-sm text-[#4A4A4A]">
                      {product.producer.name}
                    </div>
                    <div class="mt-4 w-[260px] truncate text-xl font-bold">
                      {product.name}
                    </div>
                  </div>
                </Content>
                <div>
                  <img
                    class="block h-48 w-96 object-contain"
                    src={product.image ?? '/images/default_product_image.png'}
                    alt=""
                  />
                </div>
                <Content class="mdc-typography--body2 relative">
                  <div class="flex justify-center">
                    <div class="mt-1 text-lg text-[#4A4A4A]">
                      {product.unitQuantity}{CROP_UNITS_LABEL[product.unit]}
                    </div>
                    <div class="ml-5 text-2xl text-[#4A4A4A]">
                      {product.unitPrice} 円
                    </div>
                  </div>
                  <div class="mt-1 flex justify-center text-lg text-[#4A4A4A]">
                    予約期間：
                    <div>{dayjs(product.startAt).format('MM/DD')}</div>
                    <div>〜</div>
                    <div>{dayjs(product.endAt).format('MM/DD')}</div>
                  </div>
                </Content>
              </PrimaryAction>
            </Card>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/await}
