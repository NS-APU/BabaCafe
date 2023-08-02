<script lang="ts">
  import Button from '@smui/button';

  export let vehicleName: string;
</script>

<div class="ml-6">
  <details class="mb-2 mt-2 outline outline-1 outline-offset-2 outline-[#000000]">
    <!-- TODO -->
    <!-- 1便目 -->
    <summary class="bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">### {vehicleName} ###</summary>
    <p class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">車両</p>

    <div class="flex">
      <div class="mt-2">
        <p>衝撃</p>
        <p class="mt-2">最大取扱量</p>
      </div>
      <div class="ml-5 mt-2">
        <!-- TODO -->
        <p>### データ取得 ###</p>
        <p class="mt-2">### データ取得 ###</p>
      </div>
    </div>
    <p class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">時刻表</p>
    <p class="mt-2">### 表追加 ###</p>

    <!-- TODO:ボタン配置しただけ -->
    <Button class="  mr-2 w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
      <p class="text-lg font-bold">便編集</p>
    </Button>

    <Button class="w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
      <p class="text-lg font-bold">便削除</p>
    </Button>
  </details>
</div>
