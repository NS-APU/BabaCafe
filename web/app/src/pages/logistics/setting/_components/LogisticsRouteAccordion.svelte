<script lang="ts">
  import Button from '@smui/button';
  import IconButton from '@smui/icon-button';
  import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
  import LogisticsTripAccordion from './LogisticsTripAccordion.svelte';
  import RouteDeleteDialog from './RouteDeleteDialog.svelte';
  import TripAddDialog from './TripAddDialog.svelte';
  import type { TRouteSetting, TLogisticsSetting } from '../../../../models/Logistics';

  export let logisticsSetting: TLogisticsSetting = null;
  export let route: TRouteSetting;
  $: panelOpen = false;
  let isTripAddDialogOpen = false;

  let isRouteDeleteDialogOpen = false;

  function onClickRouteDeleteButton(event: Event) {
    event.stopPropagation();
    isRouteDeleteDialogOpen = true;
  }
</script>

<div>
  <Accordion class="mt-4">
    <Panel class="px-3 py-2 text-lg text-[#494949]">
      <Header
        class="bg-[#f4f4f4]"
        on:click={() => {
          panelOpen = !panelOpen;
        }}
      >
        {#if panelOpen}
          <span class="material-icons inline-block align-middle">expand_more</span>
        {:else}
          <span class="material-icons inline-block align-middle">chevron_right</span>
        {/if}
        {route.name}
        <span slot="icon">
          <IconButton class="material-icons" disabled>edit</IconButton>
          <IconButton class="material-icons" on:click={onClickRouteDeleteButton}>delete</IconButton>
        </span>
      </Header>
      <Content>
        {#each route.trips as trip}
          <LogisticsTripAccordion {trip} routeId={route.id} {logisticsSetting} />
        {/each}

        <div class="flex justify-center">
          <Button
            class="mb-3 mt-4 w-[150px] rounded-full px-4 py-2"
            color="secondary"
            variant="raised"
            on:click={() => (isTripAddDialogOpen = true)}
          >
            <p class="text-lg">便追加</p>
          </Button>
        </div>
        <TripAddDialog bind:open={isTripAddDialogOpen} routeId={route.id} bind:logisticsSetting />
      </Content>
    </Panel>
  </Accordion>
  <RouteDeleteDialog bind:open={isRouteDeleteDialogOpen} bind:logisticsSetting {route} />
</div>
