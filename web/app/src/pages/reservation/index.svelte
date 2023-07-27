<script lang="ts">
  import { goto } from '@roxi/routify';
  import CircularProgress from '@smui/circular-progress';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import dayjs from 'dayjs';
  import { USER_ATTRIBUTE } from '../../constants/account';
  import { ReservationRepository, statusToText } from '../../models/Reservation';
  import { profile } from '../../stores/Account';
  import { markAsLogoutState } from '../../stores/Login';
  import { addToast } from '../../stores/Toast';

  $: reservationRepository = new ReservationRepository();

  async function fetchReservationProducts() {
    try {
      return await reservationRepository.allReservations();
    } catch (err) {
      switch (err.error || err.message) {
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
            message: '予約の取得に失敗しました。もう一度時間をおいて再読み込みしてください。',
            type: 'error',
          });
          break;
      }
      return [];
    }
  }

  function formatPickupTime(timeString) {
    return timeString !== undefined && timeString !== null ? dayjs(timeString).format('YYYY/MM/DD HH:mm') : '';
  }
</script>

{#await fetchReservationProducts()}
  <div style="display: flex; justify-content: center">
    <CircularProgress style="width: 32px; height: 160px;" indeterminate />
  </div>
{:then items}
  <div class="m-6">
    <h2 class="text-2xl font-bold">予約一覧</h2>

    <DataTable class="mt-10" table$aria-label="User list" style="width: 100%">
      <Head>
        <Row>
          {#if $profile.attribute !== USER_ATTRIBUTE.producer}
            <Cell class="text-center">生産者</Cell>
          {/if}
          <Cell class="text-center">作物名</Cell>
          <Cell class="text-center">数量</Cell>
          <Cell class="text-center">合計金額</Cell>
          {#if $profile.attribute !== USER_ATTRIBUTE.consumer}
            <Cell class="text-center">予約者</Cell>
          {/if}
          <Cell class="text-center">受取り希望日</Cell>
          <Cell class="text-center">受取り場所</Cell>
          <Cell class="text-center">配送者</Cell>
          <Cell class="text-center">路線</Cell>
          <Cell class="text-center">便名</Cell>
          <Cell class="text-center">集荷場所</Cell>
          <Cell class="text-center">集荷予定日時</Cell>
          <Cell class="text-center">ステータス</Cell>
        </Row>
      </Head>
      {#each items as item (item.id)}
        <Body class="cell">
          <Row on:click={$goto(`./${item.id}`)}>
            {#if $profile.attribute !== USER_ATTRIBUTE.producer}
              <Cell class="text-center">{item.product.producer.name}</Cell>
            {/if}
            <Cell class="text-center">{item.product.name}</Cell>
            <Cell class="text-center">{item.quantity}</Cell>
            <Cell class="text-center">{item.totalPrice}円</Cell>
            {#if $profile.attribute !== USER_ATTRIBUTE.consumer}
              <Cell class="text-center">{item.consumer.name}</Cell>
            {/if}
            <Cell class="text-center">{dayjs(item.desiredAt).format('YYYY/MM/DD')}</Cell>
            <Cell class="text-center">{item.receiveLocation.name}</Cell>
            <Cell class="text-center">{item.shipper?.name ?? ''}</Cell>
            <Cell class="text-center">{item.shippingSchedule?.routeName ?? ''}</Cell>
            <Cell class="text-center">{item.shippingSchedule?.tripName ?? ''}</Cell>
            <Cell class="text-center">{item.shippingSchedule?.pickupStop ?? ''}</Cell>
            <Cell class="text-center">{formatPickupTime(item.shippingSchedule?.pickupTime)}</Cell>
            <Cell class="text-center">{statusToText[item.status]}</Cell>
          </Row>
        </Body>
      {/each}
    </DataTable>
  </div>
{/await}
