<script lang="ts">
  import Badge from '@smui-extra/badge';
  import { statusToText, type TReservation } from '../../../models/Reservation';

  export let status: TReservation['status'];
</script>

<Badge class="-mt-5 px-2 py-2" color="secondary">{statusToText[status]}</Badge>
