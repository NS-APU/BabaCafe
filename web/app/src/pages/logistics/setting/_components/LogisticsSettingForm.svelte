<script lang="ts">
  import Button from '@smui/button';
  import IconButton, { Icon } from '@smui/icon-button';
</script>

<!-- <div class="grid justify-center"> -->
<div class="grid">
  <div class="container">
    <div class="text-lg">
      <div class="top_txt">
        <p class="">集荷・配送方法</p>
        <!-- TODO: Icon実装 -->
        <IconButton>
          <Icon tag="material-icons">edit</Icon>
        </IconButton>
      </div>
      <!-- TODO -->
      <p class="mt-4">### 集荷・配送方法の設定表示欄 ###</p>

      <p class="top_txt mt-8">巡回経路の設定</p>
      <div class="">
        <details class="mb-2 mt-2 outline outline-1 outline-offset-2 outline-[#000000]">
          <!-- TODO -->
          <summary class="accordion">### 路線アコーディオン 上り ###</summary>
          <!-- TODO: Icon実装、summaryと同行に表示 -->
          <IconButton>
            <Icon tag="material-icons">edit</Icon>
          </IconButton>
          <IconButton>
            <Icon tag="material-icons">delete</Icon>
          </IconButton>
          <div class="ml-6">
            <details class="mb-2 mt-2 outline outline-1 outline-offset-2 outline-[#000000]">
              <!-- TODO -->
              <!-- 1便目 -->
              <summary class="accordion">### 便アコーディオン (1便) ###</summary>
              <p class="top_txt mt-2">車両</p>

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
              <p class="top_txt mt-4">時刻表</p>
              <p class="mt-2">### 表追加 ###</p>

              <!-- TODO:ボタン配置しただけ -->
              <Button class="  mr-2 w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
                <p class="text-lg font-bold">便編集</p>
              </Button>

              <Button class="w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
                <p class="text-lg font-bold">便削除</p>
              </Button>
            </details>
            <!-- 2便目 -->
            <details class="mb-2 mt-2 outline outline-1 outline-offset-2 outline-[#000000]">
              <summary class="accordion">### 便アコーディオン (2便) ###</summary>
              <p class="top_txt mt-2">車両</p>

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
              <p class="top_txt mt-4">時刻表</p>
              <p class="mt-2">### 表追加 ###</p>

              <!-- TODO:ボタン配置しただけ -->
              <Button class="  mr-2 w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
                <p class="text-lg font-bold">便編集</p>
              </Button>

              <Button class="w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
                <p class="text-lg font-bold">便削除</p>
              </Button>
            </details>
            <Button class="w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
              <p class="text-lg font-bold">便追加</p>
            </Button>
          </div>
        </details>
      </div>

      <div class="">
        <details class="mb-2 mt-2 outline outline-1 outline-offset-2 outline-[#000000]">
          <!-- TODO -->
          <summary class="accordion">### 路線アコーディオン 下り ###</summary>
          <!-- TODO: Icon実装、summaryと同行に表示 -->
          <IconButton>
            <Icon tag="material-icons">edit</Icon>
          </IconButton>
          <IconButton>
            <Icon tag="material-icons">delete</Icon>
          </IconButton>
          <div class="ml-6">
            <details class="mb-2 mt-2 outline outline-1 outline-offset-2 outline-[#000000]">
              <!-- TODO -->
              <!-- 1便目 -->
              <summary class="accordion">### 便アコーディオン (1便) ###</summary>
              <p class="top_txt mt-2">車両</p>

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
              <p class="top_txt mt-4">時刻表</p>
              <p class="mt-2">### 表追加 ###</p>

              <!-- TODO:ボタン配置しただけ -->
              <Button class="  mr-2 w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
                <p class="text-lg font-bold">便編集</p>
              </Button>

              <Button class="w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
                <p class="text-lg font-bold">便削除</p>
              </Button>
            </details>
            <!-- 2便目 -->
            <details class="mb-2 mt-2 outline outline-1 outline-offset-2 outline-[#000000]">
              <summary class="accordion">### 便アコーディオン (2便) ###</summary>
              <p class="top_txt mt-2">車両</p>

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
              <p class="top_txt mt-4">時刻表</p>
              <p class="mt-2">### 表追加 ###</p>

              <!-- TODO:ボタン配置しただけ -->
              <Button class="  mr-2 w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
                <p class="text-lg font-bold">便編集</p>
              </Button>

              <Button class="w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
                <p class="text-lg font-bold">便削除</p>
              </Button>
            </details>
            <Button class="w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
              <p class="text-lg font-bold">便追加</p>
            </Button>
          </div>
        </details>
        <Button class="w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
          <p class="text-lg font-bold">路線追加</p>
        </Button>
      </div>
    </div>
  </div>
</div>

<style>
  .top_txt {
    padding: 0.5em; /*文字周りの余白*/
    color: #494949; /*文字色*/
    background: #f5fff6; /*背景色*/
    border-left: solid 10px #188621; /*左線（実線 太さ 色）*/
  }
  .accordion {
    color: #494949; /*文字色*/
    background: hwb(125 96% 0%); /*背景色*/
  }
</style>
