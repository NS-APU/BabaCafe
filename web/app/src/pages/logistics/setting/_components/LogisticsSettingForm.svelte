<script lang="ts">
  import { goto } from '@roxi/routify';
  import Button from '@smui/button';
  import CircularProgress from '@smui/circular-progress';
  import IconButton from '@smui/icon-button';
  import { LogisticsRepository, type TLogisticsSetting } from '../../../../models/Logistics';
  import { profile } from '../../../../stores/Account';
  import { markAsLogoutState } from '../../../../stores/Login';
  import { addToast } from '../../../../stores/Toast';
  import LogisticsRouteAccordion from './LogisticsRouteAccordion.svelte';
  
let logisticsRepository: LogisticsRepository = new LogisticsRepository();

  async function fetchLogisticsSetting(): Promise<TLogisticsSetting> {
    try {
      return await logisticsRepository.getLogisticsSetting($profile.id);
    } catch (err) {
      handleError(err, '物流設定の取得');
      return null;
    }
  }

  function handleError(err, operation) {
    switch (err.error || err.message) {
      case 'Bad Request':
        addToast({
          message: `${operation}に失敗しました。開発者へお問い合わせください。`,
          type: 'error',
        });
        break;
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
          message: `${operation}に失敗しました。もう一度時間をおいて再読み込みしてください。`,
          type: 'error',
        });
        break;
    }
  }

  // ダミーデータ
  const routes = [{ name: '下岩川ふれあいバス（養助号）上り' }, { name: '下岩川ふれあいバス（養助号）下り' }];
</script>

{#await fetchLogisticsSetting()}
  <div style="display: flex; justify-content: center">
    <CircularProgress style=" width: 32px;height: 160px;" indeterminate />
  </div>
{:then logisticsSetting}
  <!-- <div class="grid justify-center"> -->
  <div class="grid">
    <div class="container">
      <div class="text-lg">
        <div
          class="relative mt-3 flex justify-between border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]"
        >
          <p class="flex w-[260px] flex-row flex-wrap items-center text-left text-xl">集荷・配送方法</p>
          <IconButton class="material-icons inline-block align-middle">edit</IconButton>
        </div>
        <!-- TODO -->
        <p class="mt-4">### 集荷・配送方法の設定表示欄 ###</p>
        <!-- {#if logisticsSetting.} -->
        <p class="mt-4" />

        <p class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">
          巡回経路の設定
        </p>

        <!-- TODO: roop処理 -->
        {#each routes as route}
          <LogisticsRouteAccordion routeName={route.name} />
        {/each}

        <div style="display: flex; justify-content: center">
          <Button class="mt-4 w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
            <p class="text-lg">路線追加</p>
          </Button>
        </div>
      </div>
    </div>
  </div>
{/await}
