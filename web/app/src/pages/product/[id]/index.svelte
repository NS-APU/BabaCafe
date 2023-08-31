<script lang="ts">
  import { goto, params } from '@roxi/routify';
  import Button from '@smui/button';
  import CircularProgress from '@smui/circular-progress';
  import Dialog, { Title, Actions } from '@smui/dialog';
  import Paper from '@smui/paper';
  import dayjs from 'dayjs';
  import { USER_ATTRIBUTE } from '../../../constants/account';
  import { CROP_UNITS_LABEL } from '../../../constants/product';
  import { ProductRepository, type TProduct } from '../../../models/Product';
  import { profile } from '../../../stores/Account';
  import { markAsLogoutState } from '../../../stores/Login';
  import { addToast } from '../../../stores/Toast';

  $: productRepository = new ProductRepository();
  $: canCanceled = false;
  let isOpenCanceledConfirmDialog = false;

  async function fetchProduct(): Promise<TProduct> {
    try {
      const product = await productRepository.findOne($params.id);
      canCanceled = product.reservations.length === 0;
      return product;
    } catch (err) {
      handleError(err, '商品の取得');
      return null;
    }
  }

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'canceled':
        await canceled();
        break;
      default:
        // NOP
        break;
    }
  }

  async function canceled() {
    try {
      await productRepository.canceled($params.id);
      addToast({
        message: '出品を取りやめました。',
      });
      $goto('/product');
    } catch (err) {
      handleError(err, '出品のとりやめ');
    }
  }

  function handleError(err, operation: string) {
    switch (err.error || err.message) {
      case 'Bad Request':
        addToast({
          message: `${operation}に失敗しました。開発者へお問い合わせください。`,
          type: 'error',
        });
        break;
      case 'Unauthorized':
        markAsLogoutState();
        addToast({
          message: '認証が切れました。再度ログインしてください。',
          type: 'error',
        });
        $goto('/login');
        break;
      default:
        addToast({
          message: `${operation}に失敗しました。もう一度時間をおいて再読み込みしてください。`,
          type: 'error',
        });
        break;
    }
  }

  function isOutOfStock(product: TProduct): boolean {
    return product.remaining <= 0;
  }
</script>

{#await fetchProduct()}
  <div class="flex justify-center">
    <CircularProgress style="width: 32px; height: 160px;" indeterminate />
  </div>
{:then product}
  <div class="grid justify-center">
    <div class="container">
      <div class="flex">
        {#if product.producer.image}
          <img class="h-[40px] w-[40px] rounded-[50%]" src={product.producer.image} alt="" />
        {:else if product.producer.classification === 'individual'}
          <img class="h-[40px] w-[40px] rounded-[50%]" src="./../../../public/images/farmer.png" alt="" />
        {:else if product.producer.classification === 'corporate'}
          <img class="h-[40px] w-[40px] rounded-[50%]" src="./../../../public/images/house.png" alt="" />
        {/if}
        <div class="ml-4 mt-3">
          <div class="text-xl text-[#8A8A8A]">
            {product.producer.name}
          </div>
        </div>
      </div>
      <div class="mt-3 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-[#5A5A5A]">
          {product.name}
        </h1>
        {#if isOutOfStock(product)}
          <p class="text-xl text-[#ff0000]">終了</p>
        {/if}
      </div>
      <img
        src={product.image ?? './../../../public/images/default_product_image.png'}
        alt=""
        width="300"
        class="mt-3"
      />
    </div>

    <fieldset class="w-[300px] rounded border border-secondary p-3">
      <legend>説明</legend>
      {product.description}
    </fieldset>

    <Paper class="mt-3 w-[300px]" color="secondary" variant="outlined">
      <div class="mt-2 text-center text-base text-[#5A5A5A]">
        {product.unitQuantity}{CROP_UNITS_LABEL[product.unit]}あたり{product.unitPrice}円
      </div>
      <div class="mt-2 text-center text-base text-[#5A5A5A]">
        残りあと{product.remaining}点
      </div>
      <div class="mt-2 text-center text-base text-[#5A5A5A]">
        予約期間：
        {dayjs(product.startAt).format('MM/DD HH:mm')}
        -
        {dayjs(product.endAt).format('MM/DD HH:mm')}
      </div>
    </Paper>

    {#if $profile.attribute === USER_ATTRIBUTE.consumer && !isOutOfStock(product)}
      <div class="flex justify-center">
        <Button
          variant="raised"
          class="mt-10 w-[150px] rounded-full px-4 py-2"
          color="secondary"
          on:click={$goto('../../reservation/new', { productId: $params.id })}
        >
          <p class="black">予約</p>
        </Button>
      </div>
    {:else if $profile.attribute === USER_ATTRIBUTE.producer}
      <div class="flex justify-center">
        <Button
          variant="raised"
          class="mt-10 w-[150px] rounded-full px-4 py-2"
          color="secondary"
          on:click={$goto('../../product/:id/edit', { id: $params.id })}
        >
          <p class="black">編集</p>
        </Button>
      </div>
    {/if}

    {#if $profile.attribute === USER_ATTRIBUTE.producer && canCanceled}
      <div class="flex justify-center">
        <Button
          variant="raised"
          class="mt-10 w-[150px] rounded-full px-4 py-2"
          color="secondary"
          on:click={() => (isOpenCanceledConfirmDialog = true)}
        >
          <p class="black">出品取りやめ</p>
        </Button>
        <Dialog selection bind:open={isOpenCanceledConfirmDialog} on:SMUIDialog:closed={onDialogClosedHandle}>
          <Title>出品を取りやめますか？</Title>
          <Actions>
            <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="outlined">
              <p class="text-lg font-bold">キャンセル</p>
            </Button>
            <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="raised" action="canceled">
              <p class="text-lg font-bold">出品取りやめ</p>
            </Button>
          </Actions>
        </Dialog>
      </div>
    {/if}
  </div>
{/await}
