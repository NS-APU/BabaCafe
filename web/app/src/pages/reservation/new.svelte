<script lang="ts">
  import { goto } from "@roxi/routify";
  import { addToast } from "../../stores/Toast";
  import {
    ReservationRepository,
    type TReservationForm,
  } from "../../models/Reservation";
  import ReservationForm from "./_components/ReservationForm.svelte";
  import { markAsLogoutState } from "../../stores/Login";

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
      .catch((err) => {
        switch (err.error || err.message) {
          case "Unauthorized":
            markAsLogoutState();
            addToast({
              message: "認証が切れました。再度ログインしてください。",
              type: "error",
            });
            $goto("/login");
            break;
          default:
            addToast({
              message:
                "予約に失敗しました。もう一度時間をおいて再度試してください。",
              type: "error",
            });
            break;
        }
      });
  }
</script>

<div class="m-6">
  <h2 class="text-2xl font-bold">予約手続き</h2>

  <div class="px-[10rem] mt-[2rem]">
    <ReservationForm {onConfirm} />
  </div>
</div>
