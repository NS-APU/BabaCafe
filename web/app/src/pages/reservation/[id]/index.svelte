<script lang="ts">
  import { goto, params } from '@roxi/routify';
  import Button from '@smui/button';
  import CircularProgress from '@smui/circular-progress';
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import List, { Item, Graphic, Text } from '@smui/list';
  import Paper from '@smui/paper';
  import Radio from '@smui/radio';
  import dayjs from 'dayjs';
  import StatusLabel from '.././_components/StatusLabel.svelte';
  import { CROP_UNITS_LABEL } from '../../../constants/product';
  import { ReservationRepository, type TReservation, RESERVATION_STATUS } from '../../../models/Reservation';
  import { AccountService } from '../../../services/AccountService';
  import { profile } from '../../../stores/Account';
  import { markAsLogoutState } from '../../../stores/Login';
  import { addToast } from '../../../stores/Toast';

  $: reservationRepository = new ReservationRepository();

  let reservationStatus: TReservation['status'];

  async function fetchReservationProducts() {
    try {
      const reservationData = await reservationRepository.findOne($params.id);
      reservationStatus = reservationData.status;
      return reservationData;
    } catch (err) {
      handleError(err);
      return null;
    }
  }

  $: isShowPackedButton = (reservation) => {
    return RESERVATION_STATUS.packking === reservationStatus && reservation.product.producerId === $profile.id;
  };

  $: isShowKeptButton = (reservation) => {
    return RESERVATION_STATUS.shipping === reservationStatus && reservation.receiveLocationId === $profile.id;
  };

  $: isShowReceivedButton = (reservation) => {
    return RESERVATION_STATUS.keeping === reservationStatus && reservation.consumerId === $profile.id;
  };

  // TODO:編集と取り消しの条件が同じなのでまとめたい（変数名が思いつかなかったので保留）
  $: isShowCanceledButton = (reservation) => {
    return RESERVATION_STATUS.packking === reservationStatus && reservation.consumerId === $profile.id;
  };

  let isOpenPackedConfirmDialog = false;
  let isOpenKeptConfirmDialog = false;
  let isOpenReceivedConfirmDialog = false;
  let isOpenCanceledConfirmDialog = false;

  let selectedShipperId = '';

  async function fetchLogistics() {
    try {
      const logistics = await new AccountService().getLogistics();
      logistics.push($profile);
      return Object.fromEntries(logistics.map(({ id, name }) => [id, name]));
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
      case 'kept':
        await kept();
        break;
      case 'received':
        await received();
        break;
      case 'canceled':
        await canceled();
        break;
      default:
        // NOP
        break;
    }
  }

  async function packed() {
    try {
      const updateReservationData = await reservationRepository.packed($params.id, { shipperId: selectedShipperId });
      reservationStatus = updateReservationData.status;
      addToast({
        message: '予約作物の出荷が完了しました。',
      });
    } catch (err) {
      handleError(err);
    }
  }

  async function kept() {
    try {
      const updateReservationData = await reservationRepository.kept($params.id);
      reservationStatus = updateReservationData.status;
      addToast({
        message: '予約作物を店舗で保管しています。',
      });
    } catch (err) {
      handleError(err);
    }
  }

  async function received() {
    try {
      const updateReservationData = await reservationRepository.received($params.id);
      reservationStatus = updateReservationData.status;
      addToast({
        message: '予約作物を受取りました。',
      });
    } catch (err) {
      handleError(err);
    }
  }

  async function canceled() {
    try {
      const updateReservationData = await reservationRepository.canceled($params.id);
      reservationStatus = updateReservationData.status;
      addToast({
        message: '予約をキャンセルしました。',
      });
    } catch (err) {
      handleError(err);
    }
  }

  function handleError(err) {
    switch (err.error || err.message) {
      case 'Bad Request':
        addToast({
          message: '予約の更新に失敗しました。開発者へお問い合わせください。',
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
          message: '予約の更新に失敗しました。もう一度時間をおいて再読み込みしてください。',
          type: 'error',
        });
        break;
    }
  }
</script>

{#await fetchReservationProducts()}
  <div class="flex justify-center">
    <CircularProgress style="width: 32px; height: 160px;" indeterminate />
  </div>
{:then reservationData}
  <div class="grid justify-center">
    <div class="container">
      <div class="text-lg">
        <p class="inline-block align-middle">
          {#if reservationData.product.producer.image}
            <img class="h-[40px] w-[40px] rounded-[50%]" src={reservationData.product.producer.image} alt="" />
          {:else if reservationData.product.producer.classification === 'individual'}
            <img class="h-[40px] w-[40px] rounded-[50%]" src="./../../../public/images/farmer.png" alt="" />
          {:else if reservationData.product.producer.classification === 'corporate'}
            <img class="h-[40px] w-[40px] rounded-[50%]" src="./../../../public/images/house.png" alt="" />
          {/if}
        </p>
        <p class="inline-block align-middle">
          {reservationData.product.producer.name}
        </p>
      </div>
      <div class="relative mb-5 mt-5 flex w-[280px] justify-between font-bold">
        <p class="flex w-[260px] flex-row flex-wrap items-end text-left text-xl">
          {reservationData.product.name}
        </p>
        <p class="text-right align-middle">
          <StatusLabel bind:status={reservationStatus} />
        </p>
      </div>
    </div>

    <div>
      <div class="mb-2 flex items-center justify-center">
        <div class="relative h-[300px] w-[300px] object-contain">
          <img
            class="absolute bottom-0 left-0 right-0 top-0 m-auto h-auto max-h-full w-auto max-w-full"
            src={reservationData.product.image ?? './../../../public/images/default_product_image.png'}
            alt=""
          />
        </div>
      </div>

      <div class="m-auto table font-bold">
        <div class="flex">
          <div class="flex h-auto flex-col text-left">
            <p>数量</p>
            <p>合計金額</p>
          </div>
          <div>
            <p>：</p>
            <p>：</p>
          </div>
          <div class="ml-5">
            <p>
              {reservationData.quantity}{CROP_UNITS_LABEL[reservationData.product.unit]}
            </p>
            <p>
              {reservationData.product.unitPrice * reservationData.quantity}円
            </p>
          </div>
        </div>
      </div>
      <Paper class="m-auto mt-5 table" color="secondary" variant="outlined">
        <div class="flex">
          <div class="flex h-auto flex-col text-left">
            <p>予約者</p>
            <p>希望日</p>
            <p>場所</p>
          </div>
          <div>
            <p>：</p>
            <p>：</p>
            <p>：</p>
          </div>
          <div class="ml-5">
            <p>
              {reservationData.consumer.name}
            </p>
            <p>
              {dayjs(reservationData.desiredAt).format('YYYY/MM/DD')}
            </p>
            <p class="flex w-[200px] flex-row flex-wrap">
              {reservationData.receiveLocation.name}
              <br />
              {reservationData.receiveLocation.address}
            </p>
          </div>
        </div>
      </Paper>
    </div>
    <div class="mt-3 grid justify-center p-3">
      {#if isShowPackedButton(reservationData)}
        <Button
          class="w-[150px]  rounded-full px-4 py-2"
          color="secondary"
          variant="raised"
          on:click={() => (isOpenPackedConfirmDialog = true)}
        >
          <p class="text-lg font-bold">出荷</p>
        </Button>
        <Dialog selection bind:open={isOpenPackedConfirmDialog} on:SMUIDialog:closed={onDialogClosedHandle}>
          <Title>配送者を選択して出荷しますか？</Title>
          <Content>
            {#await fetchLogistics()}
              <div style="display: flex; justify-content: center">
                <CircularProgress style=" width: 32px;height: 160px;" indeterminate />
              </div>
            {:then logistics}
              <div class="max-h-[300px]">
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
              </div>
            {/await}
          </Content>
          <Actions>
            <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="outlined">
              <p class="text-lg font-bold">キャンセル</p>
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
          </Actions>
        </Dialog>
      {/if}
      {#if isShowKeptButton(reservationData)}
        <Button
          class="w-[150px]  rounded-full px-4 py-2"
          color="secondary"
          variant="raised"
          on:click={() => (isOpenKeptConfirmDialog = true)}
        >
          <p class="text-lg font-bold">店舗預かり</p>
        </Button>
        <Dialog selection bind:open={isOpenKeptConfirmDialog} on:SMUIDialog:closed={onDialogClosedHandle}>
          <Title>店舗で作物を預かりましたか？</Title>
          <Actions>
            <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="outlined">
              <p class="text-lg font-bold">キャンセル</p>
            </Button>
            <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="raised" action="kept">
              <p class="text-lg font-bold">店舗預かり</p>
            </Button>
          </Actions>
        </Dialog>
      {/if}
      {#if isShowReceivedButton(reservationData)}
        <Button
          class="w-[150px]  rounded-full px-4 py-2"
          color="secondary"
          variant="raised"
          on:click={() => (isOpenReceivedConfirmDialog = true)}
        >
          <p class="text-lg font-bold">受取り</p>
        </Button>
        <Dialog selection bind:open={isOpenReceivedConfirmDialog} on:SMUIDialog:closed={onDialogClosedHandle}>
          <Title>作物を受取りましたか？</Title>
          <Actions>
            <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="outlined">
              <p class="text-lg font-bold">キャンセル</p>
            </Button>
            <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="raised" action="received">
              <p class="text-lg font-bold">受取り</p>
            </Button>
          </Actions>
        </Dialog>
      {/if}
      {#if isShowCanceledButton(reservationData)}
        <div>
          <Button class="  mr-2 w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
            <!-- TODO:編集ページに遷移 -->
            <p class="text-lg font-bold">編集</p>
          </Button>

          <Button
            class="w-[150px] rounded-full px-4 py-2"
            color="secondary"
            variant="raised"
            on:click={() => (isOpenCanceledConfirmDialog = true)}
          >
            <p class="text-lg font-bold">予約取り消し</p>
          </Button>
          <Dialog selection bind:open={isOpenCanceledConfirmDialog} on:SMUIDialog:closed={onDialogClosedHandle}>
            <Title>予約を取り消しますか？</Title>
            <Actions>
              <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="outlined">
                <p class="text-lg font-bold">キャンセル</p>
              </Button>
              <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="raised" action="canceled">
                <p class="text-lg font-bold">取り消し</p>
              </Button>
            </Actions>
          </Dialog>
        </div>
      {/if}
    </div>
  </div>
{/await}
