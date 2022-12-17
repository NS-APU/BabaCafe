<script lang="ts">
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import {
    ReservationRepository,
    statusToText,
    type TReservationProduct,
  } from "../../models/Reservation";
  import { addToast } from "../../stores/Toast";
  import CircularProgress from "@smui/circular-progress";
  import dayjs from "dayjs";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button from "@smui/button";
  import StatusLabel from "./_components/StatusLabel.svelte";
  import { onMount } from "svelte";
  import { AuthService } from "../../services/AuthService";

  let open = false;
  let dialogData: TReservationProduct;
  let currentAccount: Record<string, string>;

  $: reservationRepository = new ReservationRepository();

  async function fetchReservationProducts() {
    try {
      return reservationRepository.allReservationProducts();
    } catch {
      addToast({
        message:
          "予約の取得に失敗しました。もう一度時間をおいて再読み込みしてください。",
        type: "error",
      });
    }
  }

  function showDetail(reservationProduct: TReservationProduct) {
    dialogData = reservationProduct;
    open = true;
  }

  onMount(async () => {
    currentAccount = await new AuthService().getProfile();
  });
</script>

{#await fetchReservationProducts()}
  <div style="display: flex; justify-content: center">
    <CircularProgress style="height: 160px; width: 32px;" indeterminate />
  </div>
{:then items}
  <div class="m-6">
    <h2 class="text-2xl font-bold">予約一覧</h2>

    <DataTable class="mt-10" table$aria-label="User list" style="width: 100%">
      <Head>
        <Row>
          <Cell>予約者名</Cell>
          <Cell>受け取り希望日時</Cell>
          <Cell>受け取り場所</Cell>
          <Cell>予約商品</Cell>
          <Cell>個数</Cell>
          <Cell>ステータス</Cell>
        </Row>
      </Head>
      {#each items as item (item.id)}
        <Body class="cell">
          <Row on:click={() => showDetail(item)}>
            <Cell>{item.reservation.user?.name}</Cell>
            <Cell
              >{dayjs(item.reservation.shippingDate).format("YYYY-MM-DD")}</Cell
            >
            <Cell>{item.reservation.shop?.name}</Cell>
            <Cell>{item.product.name}</Cell>
            <Cell>{item.quantity}</Cell>
            <Cell>{statusToText[item.reservation.status]}</Cell>
          </Row>
        </Body>
      {/each}
    </DataTable>
  </div>
{/await}

{#if dialogData && open}
  <Dialog bind:open on:closed={(dialogData = undefined)}>
    <div class="mt-3 flex justify-between">
      <h2 class="m-4 text-2xl font-bold">予約詳細</h2>
      <div class="m-2 mr-4">
        <StatusLabel status={dialogData.reservation.status} />
      </div>
    </div>
    <Content>
      <div class="mb-2">
        <div class="text-lg font-bold">
          商品名：{dialogData.product.name}
        </div>
        <div class="text-lg font-bold">
          個数：{dialogData.quantity}
        </div>
      </div>
      <img
        class="w-[512px] h-auto"
        src={dialogData.product.image ??
          "https://girlydrop.com/wp-content/uploads/post/p5774.jpg"}
        alt=""
      />
      <div class="mt-4">
        <div class="text-lg font-bold">
          予約者名：{dialogData.reservation.user?.name}
          <br />
          受け取り希望日時：{dayjs(dialogData.reservation.shippingDate).format(
            "YYYY-MM-DD"
          )}
          <br />
          受け取り場所：{dialogData.reservation.shop.name}
          <br />
          住所：{dialogData.reservation.shop.address +
            dialogData.reservation.shop.address2}
        </div>
      </div>
    </Content>
    {#if currentAccount.status === "staff"}
      <Actions>
        <Button class="mb-2" color="primary" variant="raised">
          <p class="font-bold text-lg">受け取り完了</p>
        </Button>
      </Actions>
    {/if}
  </Dialog>
{/if}
