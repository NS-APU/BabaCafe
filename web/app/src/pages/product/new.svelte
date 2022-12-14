<script lang="ts">
  import { ProductRepository, type TProductForm } from "../../models/Product";
  import ProductForm from "./_components/ProductForm.svelte";
  import { goto } from "@roxi/routify";
  import { addToast } from "../../stores/Toast";

  $: productRepository = new ProductRepository();

  async function onConfirm(values: Required<TProductForm>) {
    await productRepository
      .create({ ...values })
      .then(() => {
        addToast({
          message: "商品の登録に成功しました。",
        });
        $goto("./");
      })
      .catch(() => {
        addToast({
          message:
            "商品の作成に失敗しました。もう一度時間をおいて再度試してください。",
          type: "error",
        });
      });
  }
</script>

<div class="m-6">
  <h2 class="text-2xl font-bold">新規出品</h2>

  <div class="px-[10rem] mt-[2rem]">
    <ProductForm {onConfirm} />
  </div>
</div>
