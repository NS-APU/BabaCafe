<script lang="ts">
  import { goto } from '@roxi/routify';
  import { ProductRepository, type TProductForm } from '../../models/Product';
  import { addToast } from '../../stores/Toast';
  import { handleError } from '../../utils/error-handle-helper';
  import ProductForm from './_components/ProductForm.svelte';

  $: productRepository = new ProductRepository();

  async function onConfirm(values: Required<TProductForm>) {
    await productRepository
      .create({ ...values })
      .then(() => {
        addToast({
          message: '商品の登録に成功しました。',
        });
        $goto('./');
      })
      .catch((err) => {
        handleError(err);
      });
  }
</script>

<div>
  <ProductForm pageType="new" {onConfirm} />
</div>
