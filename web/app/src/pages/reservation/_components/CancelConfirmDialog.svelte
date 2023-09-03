<script lang="ts">
  import ConfirmDialog from '../../../components/customized/ConfirmDialog.svelte';
  import { ReservationRepository, type TReservation } from '../../../models/Reservation';
  import { addToast } from '../../../stores/Toast';
  import { handleError } from '../../../utils/error-handle-helper';

  export let open: boolean;
  export let reservationId: string;
  export let reservationStatus: TReservation['status'];

  $: reservationRepository = new ReservationRepository();

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'canceled':
        await canceled();
        break;
      default:
        // NOP
        break;
    }
  }

  async function canceled() {
    try {
      const updateReservationData = await reservationRepository.canceled(reservationId);
      reservationStatus = updateReservationData.status;
      addToast({
        message: '予約を取り消しました。',
      });
    } catch (err) {
      handleError(err);
    }
  }
</script>

<ConfirmDialog
  bind:open
  closedAction={onDialogClosedHandle}
  title="予約を取り消しますか？"
  negativeButtonName="キャンセル"
  negativeButtonAction="close"
  positiveButtonName="取り消し"
  positiveButtonAction="canceled"
/>
