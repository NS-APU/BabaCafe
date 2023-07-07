<script lang="ts">
  import { goto } from '@roxi/routify';
  import { ProductRepository, type TProductForm } from '../../models/Product';
  import { markAsLogoutState } from '../../stores/Login';
  import { addToast } from '../../stores/Toast';
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
              message: '商品の作成に失敗しました。もう一度時間をおいて再度試してください。',
              type: 'error',
            });
            break;
        }
      });
  }
</script>

<div>
  <ProductForm {onConfirm} />
</div>
