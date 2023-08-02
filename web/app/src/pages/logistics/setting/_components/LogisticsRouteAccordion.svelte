<script lang="ts">
  import Button from '@smui/button';
  import IconButton from '@smui/icon-button';
  import LogisticsVehicleAccordion from './LogisticsVehicleAccordion.svelte';

  export let routeName: string;
</script>

<div class="">
  <details class="mb-2 mt-2 outline outline-1 outline-offset-2 outline-[#000000]">
    <!-- TODO -->
    <summary class="bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">
      ### {routeName} ###
      <IconButton class="material-icons inline-block align-middle">edit</IconButton>
      <IconButton class="material-icons inline-block align-middle">delete</IconButton>
    </summary>

    <!-- TODO: roop処理 -->
    <LogisticsVehicleAccordion vehicleName={'便アコーディオン (1便)'} />
    <LogisticsVehicleAccordion vehicleName={'便アコーディオン (2便)'} />

    <Button class="mt-2 w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">
      <p class="text-lg font-bold">便追加</p>
    </Button>
  </details>
</div>
