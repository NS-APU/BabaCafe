<script lang="ts">
  import { params, goto } from '@roxi/routify';
  import Button from '@smui/button';
  import CircularProgress from '@smui/circular-progress';
  import Paper from '@smui/paper';
  import dayjs from 'dayjs';
  import StatusLabel from '.././_components/StatusLabel.svelte';
  import { CROP_UNITS_LABEL } from '../../../constants/product';
  import { ReservationRepository, type TReservation, RESERVATION_STATUS } from '../../../models/Reservation';
  import { profile } from '../../../stores/Account';
  import { handleError } from '../../../utils/error-handle-helper';
  import CancelConfirmDialog from '../_components/CancelConfirmDialog.svelte';
  import KeptConfirmDialog from '../_components/KeptConfirmDialog.svelte';
  import PackedWizardDialog from '../_components/PackedWizardDialog.svelte';
  import ReceivedConfirmDialog from '../_components/ReceivedConfirmDialog.svelte';

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

  $: canPacked = (reservation) => {
    return RESERVATION_STATUS.packking === reservationStatus && reservation.product.producerId === $profile.id;
  };

  $: canKept = (reservation) => {
    return RESERVATION_STATUS.shipping === reservationStatus && reservation.receiveLocationId === $profile.id;
  };

  $: canReceived = (reservation) => {
    return RESERVATION_STATUS.keeping === reservationStatus && reservation.consumerId === $profile.id;
  };

  $: canEdit = (reservation) => {
    return RESERVATION_STATUS.packking === reservationStatus && reservation.consumerId === $profile.id;
  };

  let isOpenPackedConfirmDialog = false;
  let isOpenKeptConfirmDialog = false;
  let isOpenReceivedConfirmDialog = false;
  let isOpenCancelConfirmDialog = false;
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
            <img class="h-[40px] w-[40px] rounded-[50%]" src="/images/farmer.png" alt="" />
          {:else if reservationData.product.producer.classification === 'corporate'}
            <img class="h-[40px] w-[40px] rounded-[50%]" src="/images/house.png" alt="" />
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
            src={reservationData.product.image ?? '/images/default_product_image.png'}
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
      {#if canPacked(reservationData)}
        <Button
          class="w-[150px]  rounded-full px-4 py-2"
          color="secondary"
          variant="raised"
          on:click={() => (isOpenPackedConfirmDialog = true)}
        >
          <p class="text-lg font-bold">出荷</p>
        </Button>
        <PackedWizardDialog
          bind:open={isOpenPackedConfirmDialog}
          reservationId={$params.id}
          bind:reservationStatus
          pickupStop={reservationData.product.producer.logisticsSettingForProducer.stop}
          deliveryStop={reservationData.receiveLocation.logisticsSettingForIntermediary.stop}
        />
      {/if}
      {#if canKept(reservationData)}
        <Button
          class="w-[150px]  rounded-full px-4 py-2"
          color="secondary"
          variant="raised"
          on:click={() => (isOpenKeptConfirmDialog = true)}
        >
          <p class="text-lg font-bold">店舗預かり</p>
        </Button>
        <KeptConfirmDialog bind:open={isOpenKeptConfirmDialog} reservationId={$params.id} bind:reservationStatus />
      {/if}
      {#if canReceived(reservationData)}
        <Button
          class="w-[150px]  rounded-full px-4 py-2"
          color="secondary"
          variant="raised"
          on:click={() => (isOpenReceivedConfirmDialog = true)}
        >
          <p class="text-lg font-bold">受取り</p>
        </Button>
        <ReceivedConfirmDialog
          bind:open={isOpenReceivedConfirmDialog}
          reservationId={$params.id}
          bind:reservationStatus
        />
      {/if}
      {#if canEdit(reservationData)}
        <div>
          <Button
            class="w-[150px] rounded-full px-4 py-2"
            color="secondary"
            variant="raised"
            on:click={$goto('../../reservation/:id/edit', { productId: reservationData.productId })}
          >
            <p class="text-lg font-bold">編集</p>
          </Button>
          <Button
            class="w-[150px] rounded-full px-4 py-2"
            color="secondary"
            variant="raised"
            on:click={() => (isOpenCancelConfirmDialog = true)}
          >
            <p class="text-lg font-bold">予約取り消し</p>
          </Button>
          <CancelConfirmDialog
            bind:open={isOpenCancelConfirmDialog}
            reservationId={$params.id}
            bind:reservationStatus
          />
        </div>
      {/if}
    </div>
  </div>
{/await}
