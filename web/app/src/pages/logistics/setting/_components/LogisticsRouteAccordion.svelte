<script lang="ts">
  import Button from '@smui/button';
  import IconButton from '@smui/icon-button';
  import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
  import LogisticsTripAccordion from './LogisticsTripAccordion.svelte';
  import type { TRouteSetting } from '../../../../models/Logistics';

  export let route: TRouteSetting;
</script>

<div>
  <Accordion class="mt-4 outline outline-1 outline-offset-2 outline-[#000000]">
    <Panel class="px-3 py-2 text-lg text-[#494949]">
      <Header class="bg-[#f4f4f4]">
        {route.name}
        <span slot="icon">
          <IconButton class="material-icons" disabled>edit</IconButton>
          <IconButton class="material-icons" disabled>delete</IconButton>
        </span>
      </Header>
      <Content>
        {#each route.trips as trip}
          <LogisticsTripAccordion {trip} />
        {/each}

        <div style="display: flex; justify-content: center">
          <Button class="mb-3 mt-4 w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised" disabled>
            <p class="text-lg">便追加</p>
          </Button>
        </div>
      </Content>
    </Panel>
  </Accordion>
</div>
