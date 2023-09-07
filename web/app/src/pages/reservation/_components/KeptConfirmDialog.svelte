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
      case 'kept':
        await kept();
        break;
      default:
        // NOP
        break;
    }
  }

  async function kept() {
    try {
      const updateReservationData = await reservationRepository.kept(reservationId);
      reservationStatus = updateReservationData.status;
      addToast({
        message: '予約作物を店舗で保管しています。',
      });
    } catch (err) {
      handleError(err);
    }
  }
</script>

<ConfirmDialog
  bind:open
  closedAction={onDialogClosedHandle}
  title="店舗で作物を預かりましたか？"
  negativeButtonName="キャンセル"
  negativeButtonAction="close"
  positiveButtonName="店舗預かり"
  positiveButtonAction="kept"
/>
