<script lang="ts">
  import Button from '@smui/button';
  import CircularProgress from '@smui/circular-progress';
  import IconButton from '@smui/icon-button';
  import { DELIVERY_TYPE, LogisticsRepository, type TLogisticsSetting } from '../../../../models/Logistics';
  import { profile } from '../../../../stores/Account';
  import { handleError } from '../../../../utils/error-handle-helper';
  import DeliveryTypeEditDialog from './DeliveryTypeEditDialog.svelte';
  import LogisticsRouteAccordion from './LogisticsRouteAccordion.svelte';
  import RouteAddDialog from './RouteAddDialog.svelte';

  let logisticsRepository: LogisticsRepository = new LogisticsRepository();
  let isDeliveryTypeEditDialogOpen = false;
  let isRouteAddDialogOpen = false;
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
    <div>
      <h1
        class="mt-3 flex items-center justify-between border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-1 text-lg text-[#494949]"
      >
        <span>集荷・配送方法</span>
        <IconButton
          class="material-icons inline-block align-middle"
          size="button"
          on:click={() => (isDeliveryTypeEditDialogOpen = true)}
        >
          edit
        </IconButton>
      </h1>
      <DeliveryTypeEditDialog bind:open={isDeliveryTypeEditDialogOpen} bind:logisticsSetting bind:deliveryType />
      <p class="mt-4">
        {deliveryType === DELIVERY_TYPE.route ? MESSAGE_OF_DELIVERY_TYPE.route : MESSAGE_OF_DELIVERY_TYPE.direct}
      </p>
    </div>

    {#if deliveryType === DELIVERY_TYPE.route}
      <div>
        <h1 class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">
          <span>巡回経路の設定</span>
        </h1>

        {#each logisticsSetting.routes as route}
          <LogisticsRouteAccordion bind:logisticsSetting {route} />
        {/each}

        <div class="flex justify-center">
          <Button
            class="mt-4 w-[150px] rounded-full px-4 py-2"
            color="secondary"
            variant="raised"
            on:click={() => (isRouteAddDialogOpen = true)}
          >
            <p class="text-lg">路線追加</p>
          </Button>
        </div>
        <RouteAddDialog bind:open={isRouteAddDialogOpen} bind:logisticsSetting bind:routeName />
      </div>
    {/if}
  </div>
{/await}
