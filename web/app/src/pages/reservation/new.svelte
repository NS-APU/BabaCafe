<script lang="ts">
  import { goto } from "@roxi/routify";
  import { addToast } from "../../stores/Toast";
  import {
    ReservationRepository,
    type TReservationForm,
  } from "../../models/Reservation";
  import ReservationForm from "./_components/ReservationForm.svelte";

  $: reservationRepository = new ReservationRepository();

  async function onConfirm(values: Required<TReservationForm>) {
    await reservationRepository
      .create({ ...values })
      .then(() => {
        addToast({
          message: "予約が完了しました。",
        });
        $goto("./");
      })
      .catch(() => {
        addToast({
          message:
            "予約に失敗しました。もう一度時間をおいて再度試してください。",
          type: "error",
        });
      });
  }
</script>

<div class="m-6">
  <h2 class="text-2xl font-bold">予約手続き</h2>

  <div class="px-[10rem] mt-[2rem]">
    <ReservationForm {onConfirm} />
  </div>
</div>
