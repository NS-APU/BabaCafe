<script lang="ts">
  import { ProductRepository, type TProductForm } from "../../models/Product";
  import ProductForm from "./_components/ProductForm.svelte";
  import { goto } from "@roxi/routify";
  import { addToast } from "../../stores/Toast";
  import { markAsLogoutState } from "../../stores/Login";

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
      .catch((err) => {
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
                "商品の作成に失敗しました。もう一度時間をおいて再度試してください。",
              type: "error",
            });
            break;
        }
      });
  }
</script>

<div class="m-6">
  <h2 class="text-2xl font-bold">新規出品</h2>

  <div class="px-[10rem] mt-[2rem]">
    <ProductForm {onConfirm} />
  </div>
</div>
