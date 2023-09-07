<script lang="ts">
  import { goto, params } from '@roxi/routify';
  import CircularProgress from '@smui/circular-progress';
  import { ProductRepository, type TProduct, type TProductForm } from '../../../models/Product';
  import { addToast } from '../../../stores/Toast';
  import { handleError } from '../../../utils/error-handle-helper';
  import ProductForm from './../_components/ProductForm.svelte';

  $: productRepository = new ProductRepository();

  async function fetchProduct(): Promise<TProduct> {
    try {
      return await productRepository.findOne($params.id);
    } catch (err) {
      handleError(err, '商品の取得');
    }
  }

  async function onConfirm(values: Required<TProductForm>) {
    const operation = '商品の編集';
    await productRepository
      .update($params.id, { ...values })
      .then(() => {
        addToast({
          message: `${operation}に成功しました。`,
        });
        $goto('./../');
      })
      .catch((err) => {
        handleError(err, operation);
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
