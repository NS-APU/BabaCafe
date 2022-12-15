<script lang="ts">
  import { statusToText, type TReservation } from "../../../models/Reservation";
  import Fab from "@smui/fab";
  import { Label } from "@smui/common";

  export let status: TReservation["status"];
</script>

<Fab extended class="h-10">
  <Label class="text-lg">{statusToText[status]}</Label>
</Fab>
