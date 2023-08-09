<script lang="ts">
  import Button from '@smui/button';
  import CircularProgress from '@smui/circular-progress';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import List, { Item, Graphic, Text } from '@smui/list';
  import Radio from '@smui/radio';
  import dayjs from 'dayjs';
  import { Steps } from 'svelte-steps';
  import { USER_ATTRIBUTE } from '../../../constants/account';
  import { DELIVERY_TYPE } from '../../../constants/logistics';
  import { LogisticsRepository } from '../../../models/Logistics';
  import { ReservationRepository, type TReservation } from '../../../models/Reservation';
  import { AccountService } from '../../../services/AccountService';
  import { profile } from '../../../stores/Account';
  import { addToast } from '../../../stores/Toast';
  import { handleError } from '../../../utils/error-handle-helper';

  const MAX_SUGGEST_TRIP_COUNT = 3;

  export let open: boolean;
  export let reservationId: string;
  export let reservationStatus: TReservation['status'];
  export let pickupStop: string;
  export let deliveryStop: string;

  $: reservationRepository = new ReservationRepository();

  const PACKED_STEPS = {
    select_shipper: {
      text: '配送者選択',
      index: 0,
    },
    select_trip: {
      text: '配送便選択',
      index: 1,
    },
    confirm_packed: {
      text: '出荷確認',
      index: 2,
    },
  };
  let currentStep = PACKED_STEPS.select_shipper.index;
  let steps = [
    { text: PACKED_STEPS.select_shipper.text },
    { text: PACKED_STEPS.select_trip.text },
    { text: PACKED_STEPS.confirm_packed.text },
  ];

  let selectedShipperId = '';
  let selectedTripId = '';

  let logistics = [];

  async function fetchLogistics(): Promise<{ [k: string]: string }> {
    try {
      logistics = await new AccountService().getLogistics();
      logistics.push($profile);
      return Object.fromEntries(logistics.map(({ id, name }) => [id, name]));
    } catch (err) {
      handleError(err);
      return {};
    }
  }

  $: isTripSelectionRequired(selectedShipperId);

  function isTripSelectionRequired(selectedShipperId) {
    const selectedShipper = logistics.filter((user) => user.id === selectedShipperId)[0];
    return (
      selectedShipper &&
      selectedShipper.attribute === USER_ATTRIBUTE.logistics &&
      selectedShipper.logisticsSettingForLogistics.deliveryType === DELIVERY_TYPE.route
    );
  }

  async function fetchTripSuggestions(): Promise<{ [k: string]: string }> {
    try {
      const trips = await new LogisticsRepository().getTripSuggestions(
        pickupStop,
        deliveryStop,
        MAX_SUGGEST_TRIP_COUNT,
      );
      return trips;
    } catch (err) {
      handleError(err);
      return [];
    }
  }

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'packed':
        await packed();
        break;
      default:
        // NOP
        break;
    }
  }

  async function packed() {
    try {
      const updateReservationData = await reservationRepository.packed(reservationId, { shipperId: selectedShipperId });
      reservationStatus = updateReservationData.status;
      addToast({
        message: '予約作物の出荷が完了しました。',
      });
    } catch (err) {
      handleError(err);
    }
  }
</script>

<Dialog selection bind:open on:SMUIDialog:closed={onDialogClosedHandle}>
  <Title>
    <div class="text-xs">
      <Steps {steps} current={currentStep} size="2rem" clickable={false} />
    </div>
    <div class="mt-5 text-sm">
      {#if PACKED_STEPS.select_shipper.index === currentStep}
        <p>配送者を選択してください</p>
      {:else if PACKED_STEPS.select_trip.index === currentStep}
        {#if isTripSelectionRequired(selectedShipperId)}
          <p>配送する便を選択してください。</p>
        {:else}
          <p>配送便の選択はありません。次へ進んでください。</p>
        {/if}
      {:else if PACKED_STEPS.confirm_packed.index === currentStep}
        <p>出荷してもよろしいですか？</p>
      {/if}
    </div>
  </Title>
  <Content>
    <div class="max-h-[300px]">
      {#if open}
        {#if PACKED_STEPS.select_shipper.index === currentStep}
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
        {:else if PACKED_STEPS.select_trip.index === currentStep}
          <div />
          {#if isTripSelectionRequired(selectedShipperId)}
            {#await fetchTripSuggestions()}
              <div style="display: flex; justify-content: center">
                <CircularProgress style=" width: 32px;height: 160px;" indeterminate />
              </div>
            {:then suggestions}
              <DataTable>
                <Head>
                  <Row>
                    <Cell class="text-center">路線</Cell>
                    <Cell class="text-center">便名</Cell>
                    <Cell class="text-center">集荷場所</Cell>
                    <Cell class="text-center">集荷予定日時</Cell>
                  </Row>
                </Head>
                {#each suggestions as suggest}
                  <Body class="cell">
                    <Row>
                      <Cell class="text-center">{suggest.routeName}</Cell>
                      <Cell class="text-center">{suggest.tripName}</Cell>
                      <Cell class="text-center">{suggest.pickupStop}</Cell>
                      <Cell class="text-center">{dayjs(suggest.pickupTime).format('YYYY/MM/DD')}</Cell>
                    </Row>
                  </Body>
                {/each}
              </DataTable>
            {/await}
          {:else}
            <div />
          {/if}
        {:else if PACKED_STEPS.confirm_packed.index === currentStep}
          <div />
        {/if}
      {/if}
    </div>
  </Content>
  <Actions>
    {#if PACKED_STEPS.select_shipper.index === currentStep}
      <Button
        disabled={!selectedShipperId}
        class="w-[100px]  rounded-full px-4 py-2"
        color="secondary"
        variant="raised"
        on:click={() => (currentStep = PACKED_STEPS.select_trip.index)}
      >
        <p class="text-lg font-bold">次へ</p>
      </Button>
    {:else if PACKED_STEPS.select_trip.index === currentStep}
      <Button
        class="w-[100px]  rounded-full px-4 py-2"
        color="secondary"
        variant="outlined"
        on:click={() => (currentStep = PACKED_STEPS.select_shipper.index)}
      >
        <p class="text-lg font-bold">前へ</p>
      </Button>
      {#if isTripSelectionRequired(selectedShipperId)}
        <Button
          disabled={!selectedTripId}
          class="w-[100px]  rounded-full px-4 py-2"
          color="secondary"
          variant="raised"
          on:click={() => (currentStep = PACKED_STEPS.confirm_packed.index)}
        >
          <p class="text-lg font-bold">次へ</p>
        </Button>
      {:else}
        <Button
          class="w-[100px]  rounded-full px-4 py-2"
          color="secondary"
          variant="raised"
          on:click={() => (currentStep = PACKED_STEPS.confirm_packed.index)}
        >
          <p class="text-lg font-bold">次へ</p>
        </Button>
      {/if}
    {:else if PACKED_STEPS.confirm_packed.index === currentStep}
      <Button
        class="w-[100px]  rounded-full px-4 py-2"
        color="secondary"
        variant="outlined"
        on:click={() => (currentStep = PACKED_STEPS.select_trip.index)}
      >
        <p class="text-lg font-bold">前へ</p>
      </Button>
      <Button
        class="w-[150px]  rounded-full px-4 py-2"
        color="secondary"
        variant="raised"
        action="packed"
        disabled={!selectedShipperId}
      >
        <p class="text-lg font-bold">出荷</p>
      </Button>
    {/if}
  </Actions>
</Dialog>