<script lang="ts">
  import { goto, params } from '@roxi/routify';
  import CircularProgress from '@smui/circular-progress';
  import { ReservationRepository, type TReservationForm, type TReservation } from '../../../models/Reservation';
  import { addToast } from '../../../stores/Toast';
  import { handleError } from '../../../utils/error-handle-helper';
  import ReservationForm from '../_components/ReservationForm.svelte';

  $: reservationRepository = new ReservationRepository();

  async function fetchReservation(): Promise<TReservation> {
    try {
      return await reservationRepository.findOne($params.id);
    } catch (err) {
      handleError(err, '予約の取得');
    }
  }

  async function onConfirm(values: Required<TReservationForm>) {
    const operation = '予約の編集';
    await reservationRepository
      .update($params.id, { ...values })
      .then(() => {
        addToast({
          message: `${operation}に成功しました。`,
        });
        $goto('./');
      })
      .catch((err) => {
        handleError(err, operation);
      });
  }
</script>

{#await fetchReservation()}
  <div class="flex justify-center">
    <CircularProgress class="h-40 w-8" indeterminate />
  </div>
{:then reservation}
  <div>
    <ReservationForm pageType="edit" {onConfirm} {reservation} />
  </div>
{/await}
