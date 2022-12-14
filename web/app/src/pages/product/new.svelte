<script lang="ts">
  import { ProductRepository, type TProductForm } from "../../models/Product";
  import { noticesStore } from "../../stores/notice";
  import ProductForm from "./_components/ProductForm.svelte";
  import { goto } from "@roxi/routify";

  $: productRepository = new ProductRepository();

  async function onConfirm(values: Required<TProductForm>) {
    console.log(values);
    await productRepository
      .create({ ...values })
      .then(() => {
        noticesStore.add({
          type: "success",
          message: "新規作成に成功しました。",
        });
        $goto("./");
      })
      .catch(noticesStore.showError);
  }
</script>

<div class="m-6">
  <h2 class="text-2xl font-bold">新規出品</h2>

  <div class="px-[10rem] mt-[2rem]">
    <ProductForm {onConfirm} />
  </div>
</div>
