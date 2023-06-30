<script lang="ts">
  import { goto } from '@roxi/routify';
  import { ReservationRepository, type TReservationForm } from '../../models/Reservation';
  import { markAsLogoutState } from '../../stores/Login';
  import { addToast } from '../../stores/Toast';
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
              message: '予約に失敗しました。もう一度時間をおいて再度試してください。',
              type: 'error',
            });
            break;
        }
      });
  }
</script>

<div>
  <ReservationForm {onConfirm} />
</div>
