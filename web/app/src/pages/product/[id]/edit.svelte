<script lang="ts">
  import { ProductRepository, type TProduct } from "../../../models/Product";
  import ProductForm from "./../_components/ProductForm.svelte";
  import { goto, params } from "@roxi/routify";
  import { addToast } from "../../../stores/Toast";
  import { markAsLogoutState } from "./../../../stores/Login";
  import CircularProgress from "@smui/circular-progress";

  $: productRepository = new ProductRepository();

  async function fetchProduct(): Promise<TProduct> {
    try {
      return await productRepository.findOne($params.id);
    } catch (err) {
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
              "商品の取得に失敗しました。もう一度時間をおいて再読み込みしてください。",
            type: "error",
          });
          break;
      }
      return null;
    }
  }

  async function onConfirm(values: Required<TProductForm>) {
    await productRepository
      .update({ ...values })
      .then(() => {
        addToast({
          message: "商品の編集に成功しました。",
        });
        $goto("./../");
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
                "商品の編集に失敗しました。もう一度時間をおいて再度試してください。",
              type: "error",
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
    <ProductForm {onConfirm} {product} />
  </div>
{/await}
