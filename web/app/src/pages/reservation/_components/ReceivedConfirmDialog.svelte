<script lang="ts">
  import { ReservationRepository, type TReservation } from '../../../models/Reservation';
  import { addToast } from '../../../stores/Toast';
  import { handleError } from '../../../utils/error-handle-helper';
  import ConfirmDialog from './ConfirmDialog.svelte';

  export let open: boolean;
  export let reservationId: string;
  export let reservationStatus: TReservation['status'];

  $: reservationRepository = new ReservationRepository();

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'received':
        await received();
        break;
      default:
        // NOP
        break;
    }
  }
  async function received() {
    try {
      const updateReservationData = await reservationRepository.received(reservationId);
      reservationStatus = updateReservationData.status;
      addToast({
        message: '予約作物を受取りました。',
      });
    } catch (err) {
      handleError(err);
    }
  }
</script>

<ConfirmDialog
  {open}
  closedAction={onDialogClosedHandle}
  title="作物を受取りましたか？"
  negativeButtonName="キャンセル"
  negativeButtonAction=""
  positiveButtonName="受取り"
  positiveButtonAction="received"
/>
