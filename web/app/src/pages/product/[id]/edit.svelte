<script lang="ts">
  import { goto, params } from '@roxi/routify';
  import CircularProgress from '@smui/circular-progress';
  import { ProductRepository, type TProduct, type TProductForm } from '../../../models/Product';
  import { addToast } from '../../../stores/Toast';
  import { markAsLogoutState } from './../../../stores/Login';
  import ProductForm from './../_components/ProductForm.svelte';

  $: productRepository = new ProductRepository();

  async function fetchProduct(): Promise<TProduct> {
    try {
      return await productRepository.findOne($params.id);
    } catch (err) {
      switch (err.error || err.message) {
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
            message: '商品の取得に失敗しました。もう一度時間をおいて再読み込みしてください。',
            type: 'error',
          });
          break;
      }
      return null;
    }
  }

  async function onConfirm(values: Required<TProductForm>) {
    await productRepository
      .update($params.id, { ...values })
      .then(() => {
        addToast({
          message: '商品の編集に成功しました。',
        });
        $goto('./../');
      })
      .catch((err) => {
        switch (err.error || err.message) {
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
              message: '商品の編集に失敗しました。もう一度時間をおいて再度試してください。',
              type: 'error',
            });
            break;
        }
      });
  }
</script>

{#await fetchProduct()}
  <div class="flex justify-center">
    <CircularProgress class="h-40 w-8" indeterminate />
  </div>
{:then product}
  <div>
    <ProductForm pageType="edit" {onConfirm} {product} />
  </div>
{/await}
