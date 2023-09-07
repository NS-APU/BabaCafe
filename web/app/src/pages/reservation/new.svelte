<script lang="ts">
  import { goto } from '@roxi/routify';
  import { ReservationRepository, type TReservationForm } from '../../models/Reservation';
  import { addToast } from '../../stores/Toast';
  import { handleError } from '../../utils/error-handle-helper';
  import ReservationForm from './_components/ReservationForm.svelte';

  $: reservationRepository = new ReservationRepository();

  async function onConfirm(values: Required<TReservationForm>) {
    await reservationRepository
      .create({ ...values })
      .then(() => {
        addToast({
          message: '予約が完了しました。',
        });
        $goto('./');
      })
      .catch((err) => {
        handleError(err);
      });
  }
</script>

<div>
  <ReservationForm pageType="new" {onConfirm} />
</div>
