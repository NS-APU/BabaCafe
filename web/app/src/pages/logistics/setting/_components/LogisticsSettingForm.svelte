<script lang="ts">
  import { goto } from '@roxi/routify';
  import Button from '@smui/button';
  import CircularProgress from '@smui/circular-progress';
  import Dialog, { Title, Actions } from '@smui/dialog';
  import IconButton from '@smui/icon-button';
  import { DELIVERY_TYPE, LogisticsRepository, type TLogisticsSetting } from '../../../../models/Logistics';
  import { profile } from '../../../../stores/Account';
  import { markAsLogoutState } from '../../../../stores/Login';
  import { addToast } from '../../../../stores/Toast';
  import LogisticsRouteAccordion from './LogisticsRouteAccordion.svelte';

  let logisticsRepository: LogisticsRepository = new LogisticsRepository();
  let isUpdateDeliveryTypeDialogOpen = false;
  let isCreateRouteDialogOpen = false;
  let logisticsSetting: TLogisticsSetting = null;
  let deliveryType: typeof DELIVERY_TYPE[keyof typeof DELIVERY_TYPE] = null;
  let routeName = '';

  async function fetchLogisticsSetting() {
    try {
      logisticsSetting = await logisticsRepository.getLogisticsSetting($profile.id);
      deliveryType = logisticsSetting.deliveryType;
    } catch (err) {
      handleError(err, '物流設定の取得');
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

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'updateDeliveryType':
        await updateDeliveryType(logisticsSetting.deliveryType);
        break;
      case 'createRoute':
        await createRoute(routeName, logisticsSetting.id);
        break;
      default:
        // NOP
        break;
    }
  }

  async function updateDeliveryType(deliveryTypeValue: typeof DELIVERY_TYPE[keyof typeof DELIVERY_TYPE]) {
    try {
      logisticsSetting = await logisticsRepository.updateDeliveryType(logisticsSetting.logisticsId, {
        deliveryType: deliveryTypeValue,
      });
      deliveryType = logisticsSetting.deliveryType;
      addToast({
        message: '集荷・配送方法を更新しました。',
      });
    } catch (err) {
      handleError(err, '集荷・配送方法の変更');
    }
  }

  async function createRoute(routeName: string, id: string) {
    try {
      logisticsSetting = await logisticsRepository.createRoute(logisticsSetting.logisticsId, {
        name: routeName,
        logisticsSettingId: id,
      });
      addToast({
        message: '路線を追加しました。',
      });
    } catch (err) {
      handleError(err, '路線の追加');
    }
  }

  export const MESSAGE_OF_DELIVERY_TYPE = {
    route: '巡回経路で集荷や配送を行う',
    direct: '集荷先や配送先に直接伺う',
  };
</script>

{#await fetchLogisticsSetting()}
  <div style="display: flex; justify-content: center">
    <CircularProgress style=" width: 32px;height: 160px;" indeterminate />
  </div>
{:then}
  <div class="grid">
    <div class="container">
      <div class="text-lg">
        <div
          class="relative mt-3 flex justify-between border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]"
        >
          <p class="flex w-[260px] flex-row flex-wrap items-center text-left text-xl">集荷・配送方法</p>
          <IconButton
            class="material-icons inline-block align-middle"
            on:click={() => (isUpdateDeliveryTypeDialogOpen = true)}
          >
            edit
          </IconButton>
          <Dialog selection bind:open={isUpdateDeliveryTypeDialogOpen} on:SMUIDialog:closed={onDialogClosedHandle}>
            <Title>集荷・配送方法を変更します</Title>
            <div class="justify-left ml-8 flex">
              <input
                type="radio"
                value={DELIVERY_TYPE.route}
                bind:group={logisticsSetting.deliveryType}
                checked={logisticsSetting.deliveryType === DELIVERY_TYPE.route}
              />
              <p class="indent-3">
                {MESSAGE_OF_DELIVERY_TYPE.route}
              </p>
            </div>
            <div class="justify-left ml-8 flex">
              <input
                type="radio"
                value={DELIVERY_TYPE.direct}
                bind:group={logisticsSetting.deliveryType}
                checked={logisticsSetting.deliveryType === DELIVERY_TYPE.direct}
              />
              <p class="indent-3">
                {MESSAGE_OF_DELIVERY_TYPE.direct}
              </p>
            </div>
            <Actions>
              <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="outlined">
                <p class="text-lg font-bold">キャンセル</p>
              </Button>
              <Button
                class="w-[150px]  rounded-full px-4 py-2"
                color="secondary"
                variant="raised"
                action="updateDeliveryType"
              >
                <p class="text-lg font-bold">変更</p>
              </Button>
            </Actions>
          </Dialog>
        </div>
        {#if deliveryType === DELIVERY_TYPE.route}
          <p class="mt-4">{MESSAGE_OF_DELIVERY_TYPE.route}</p>
        {:else if deliveryType === DELIVERY_TYPE.direct}
          <p class="mt-4">{MESSAGE_OF_DELIVERY_TYPE.direct}</p>
        {/if}

        <p class="mt-4" />

        {#if deliveryType === DELIVERY_TYPE.route}
          <p class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">
            巡回経路の設定
          </p>

          {#each logisticsSetting.routes as route}
            <LogisticsRouteAccordion {route} />
          {/each}

          <div style="display: flex; justify-content: center">
            <Button
              class="mt-4 w-[150px] rounded-full px-4 py-2"
              color="secondary"
              variant="raised"
              on:click={() => (isCreateRouteDialogOpen = true)}
            >
              <p class="text-lg">路線追加</p>
            </Button>
          </div>
          <Dialog selection bind:open={isCreateRouteDialogOpen} on:SMUIDialog:closed={onDialogClosedHandle}>
            <Title>路線を追加します。</Title>
            <input type="text" class="justfy-center mx-3 flex" bind:value={routeName} />
            <Actions>
              <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="outlined">
                <p class="text-lg font-bold">キャンセル</p>
              </Button>
              <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="raised" action="createRoute">
                <p class="text-lg font-bold">追加</p>
              </Button>
            </Actions>
          </Dialog>
        {/if}
      </div>
    </div>
  </div>
{/await}
