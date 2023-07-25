<script lang="ts">
  import { goto } from '@roxi/routify';
  import Button from '@smui/button';
  import CircularProgress from '@smui/circular-progress';
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import List, { Item, Graphic, Text } from '@smui/list';
  import Radio from '@smui/radio';
  import { Steps } from 'svelte-steps';
  import { USER_ATTRIBUTE } from '../../../../constants/account';
  import { LogisticsRepository } from '../../../../models/Logistics';
  import { AccountService } from '../../../../services/AccountService';
  import { profile } from '../../../../stores/Account';
  import { markAsLogoutState } from '../../../../stores/Login';
  import { addToast } from '../../../../stores/Toast';

  $: logisticsRepository = new LogisticsRepository();

  export let open = false;
  export let selectedAction = (stop: string) => {
    stop;
  };

  const SELECT_STOP_STEPS = {
    select_shipper: {
      text: '配送者選択',
      index: 0,
    },
    select_route: {
      text: '路線選択',
      index: 1,
    },
    select_stop: {
      text: 'バス停選択',
      index: 2,
    },
  };

  let currentStep = SELECT_STOP_STEPS.select_shipper.index;

  let steps = [
    { text: SELECT_STOP_STEPS.select_shipper.text },
    { text: SELECT_STOP_STEPS.select_route.text },
    { text: SELECT_STOP_STEPS.select_stop.text },
  ];

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

  async function fetchLogistics() {
    try {
      const logistics = await new AccountService().getLogistics();
      if ($profile.attribute === USER_ATTRIBUTE.producer) {
        logistics.push($profile);
      }
      return Object.fromEntries(logistics.map(({ id, name }) => [id, name]));
    } catch (err) {
      handleError(err, '物流業者の取得');
      return [];
    }
  }

  async function fetchLogisticsSettingRoutes() {
    try {
      const setting = await logisticsRepository.getLogisticsSetting(selectedShipperId);
      return Object.fromEntries(setting.routes.map(({ id, name }) => [id, name]));
    } catch (err) {
      handleError(err, '物流設定の取得');
      return [];
    }
  }

  async function fetchLogisticsSettingStops() {
    try {
      const setting = await logisticsRepository.getLogisticsSetting(selectedShipperId);
      return setting.routes
        .find((route) => route.id === selectedRouteId)
        .trips[0]?.timetables.map((timetable) => timetable.stop);
    } catch (err) {
      handleError(err, '物流業者設定の取得');
      return [];
    }
  }

  let selectedShipperId = '';
  let selectedRouteId = '';
  let selectedStop = '';

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'selected':
        await selected();
        break;
      default:
        // NOP
        break;
    }
  }

  async function selected() {
    selectedAction(selectedStop);
    currentStep = SELECT_STOP_STEPS.select_shipper.index;
    selectedShipperId = '';
    selectedRouteId = '';
    selectedStop = '';
  }
</script>

<Dialog bind:open bind:selectedAction on:SMUIDialog:closed={onDialogClosedHandle}>
  <Title>
    <div class="text-xs">
      <Steps {steps} current={currentStep} size="2rem" clickable={false} />
    </div>
    <div class="mt-5 text-sm">
      {#if SELECT_STOP_STEPS.select_shipper.index === currentStep}
        <p>バス停を絞り込むため物流業者を選択してください。</p>
      {:else if SELECT_STOP_STEPS.select_route.index === currentStep}
        <p>バス停を絞り込むため路線を選択してください。</p>
      {:else if SELECT_STOP_STEPS.select_stop.index === currentStep}
        <p>バス停を選択してください。</p>
      {/if}
    </div>
  </Title>
  <Content>
    <div class="max-h-[300px]">
      {#if open}
        {#if SELECT_STOP_STEPS.select_shipper.index === currentStep}
          {#await fetchLogistics()}
            <div style="display: flex; justify-content: center">
              <CircularProgress style=" width: 32px;height: 160px;" indeterminate />
            </div>
          {:then logistics}
            <List radioList>
              {#each Object.keys(logistics) as shipper}
                <Item>
                  <Graphic>
                    <Radio bind:group={selectedShipperId} value={shipper} />
                  </Graphic>
                  <Text>{logistics[shipper]}</Text>
                </Item>
              {/each}
            </List>
          {/await}
        {:else if SELECT_STOP_STEPS.select_route.index === currentStep}
          {#await fetchLogisticsSettingRoutes()}
            <div style="display: flex; justify-content: center">
              <CircularProgress style=" width: 32px;height: 160px;" indeterminate />
            </div>
          {:then routes}
            <List radioList>
              {#each Object.keys(routes) as route}
                <Item>
                  <Graphic>
                    <Radio bind:group={selectedRouteId} value={route} />
                  </Graphic>
                  <Text>{routes[route]}</Text>
                </Item>
              {/each}
            </List>
          {/await}
        {:else if SELECT_STOP_STEPS.select_stop.index === currentStep}
          {#await fetchLogisticsSettingStops()}
            <div style="display: flex; justify-content: center">
              <CircularProgress style=" width: 32px;height: 160px;" indeterminate />
            </div>
          {:then stops}
            <List radioList>
              {#each stops as stop}
                <Item>
                  <Graphic>
                    <Radio bind:group={selectedStop} value={stop} />
                  </Graphic>
                  <Text>{stop}</Text>
                </Item>
              {/each}
            </List>
          {/await}
        {/if}
      {/if}
    </div>
  </Content>
  <Actions>
    {#if SELECT_STOP_STEPS.select_shipper.index === currentStep}
      <Button
        disabled={!selectedShipperId}
        class="w-[100px]  rounded-full px-4 py-2"
        color="secondary"
        variant="raised"
        on:click={() => (currentStep = SELECT_STOP_STEPS.select_route.index)}
      >
        <p class="text-lg font-bold">次へ</p>
      </Button>
    {:else if SELECT_STOP_STEPS.select_route.index === currentStep}
      <Button
        class="w-[100px]  rounded-full px-4 py-2"
        color="secondary"
        variant="outlined"
        on:click={() => (currentStep = SELECT_STOP_STEPS.select_shipper.index)}
      >
        <p class="text-lg font-bold">前へ</p>
      </Button>
      <Button
        disabled={!selectedRouteId}
        class="w-[100px]  rounded-full px-4 py-2"
        color="secondary"
        variant="raised"
        on:click={() => (currentStep = SELECT_STOP_STEPS.select_stop.index)}
      >
        <p class="text-lg font-bold">次へ</p>
      </Button>
    {:else if SELECT_STOP_STEPS.select_stop.index === currentStep}
      <Button
        class="w-[100px]  rounded-full px-4 py-2"
        color="secondary"
        variant="outlined"
        on:click={() => (currentStep = SELECT_STOP_STEPS.select_route.index)}
      >
        <p class="text-lg font-bold">前へ</p>
      </Button>
      <Button
        disabled={!selectedStop}
        class="w-[100px]  rounded-full px-4 py-2"
        color="secondary"
        variant="raised"
        action="selected"
      >
        <p class="text-lg font-bold">選択</p>
      </Button>
    {/if}
  </Actions>
</Dialog>
