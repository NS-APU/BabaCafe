<script lang="ts">
  import Button from '@smui/button';
  import CircularProgress from '@smui/circular-progress';
  import Dialog, { Title, Actions, Content } from '@smui/dialog';
  import IconButton from '@smui/icon-button';
  import List, { Item, Graphic, Text } from '@smui/list';
  import Radio from '@smui/radio';
  import Textfield from '@smui/textfield';
  import { DELIVERY_TYPE, LogisticsRepository, type TLogisticsSetting } from '../../../../models/Logistics';
  import { profile } from '../../../../stores/Account';
  import { addToast } from '../../../../stores/Toast';
  import { handleError } from '../../../../utils/error-handle-helper';
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
  <div class="flex justify-center">
    <CircularProgress class="h-[160px] w-[32px]" indeterminate />
  </div>
{:then}
  <div>
    <h1
      class="mt-3 flex items-center justify-between border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-1 text-lg text-[#494949]"
    >
      <span>集荷・配送方法</span>
      <IconButton
        class="material-icons inline-block align-middle"
        size="button"
        on:click={() => (isUpdateDeliveryTypeDialogOpen = true)}
      >
        edit
      </IconButton>
    </h1>
    <Dialog selection bind:open={isUpdateDeliveryTypeDialogOpen} on:SMUIDialog:closed={onDialogClosedHandle}>
      <Title>集荷・配送方法を変更します</Title>
      <Content>
        <List radioList>
          <Item>
            <Graphic>
              <Radio bind:group={logisticsSetting.deliveryType} value={DELIVERY_TYPE.route} />
            </Graphic>
            <Text>{MESSAGE_OF_DELIVERY_TYPE.route}</Text>
          </Item>
          <Item>
            <Graphic>
              <Radio bind:group={logisticsSetting.deliveryType} value={DELIVERY_TYPE.direct} />
            </Graphic>
            <Text>{MESSAGE_OF_DELIVERY_TYPE.direct}</Text>
          </Item>
        </List>
      </Content>
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
    <p class="mt-4">
      {deliveryType === DELIVERY_TYPE.route ? MESSAGE_OF_DELIVERY_TYPE.route : MESSAGE_OF_DELIVERY_TYPE.direct}
    </p>
  </div>

  {#if deliveryType === DELIVERY_TYPE.route}
    <div>
      <h1 class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">
        巡回経路の設定
      </h1>

      {#each logisticsSetting.routes as route}
        <LogisticsRouteAccordion {route} />
      {/each}

      <div class="flex justify-center">
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
        <Content class="mb-5">
          <Textfield
            class="justfy-center mx-3 flex"
            bind:value={routeName}
            input$maxlength={100}
            input$placeholder="路線名"
          />
        </Content>
        <Actions>
          <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="outlined">
            <p class="text-lg font-bold">キャンセル</p>
          </Button>
          <Button
            class="w-[150px]  rounded-full px-4 py-2"
            color="secondary"
            variant="raised"
            action="createRoute"
            disabled={!routeName}
          >
            <p class="text-lg font-bold">追加</p>
          </Button>
        </Actions>
      </Dialog>
    </div>
  {/if}
{/await}
