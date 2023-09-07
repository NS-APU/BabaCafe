<script lang="ts">
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import IconButton from '@smui/icon-button';
  import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
  import dayjs from 'dayjs';
  import { SHOCK_LEVEL_LABEL, SHOCK_LEVEL } from '../../../../constants/product';
  import type { TTripSetting } from '../../../../models/Logistics';

  export let trip: TTripSetting;
  $: panelOpen = false;

  function formatPickupTime(timeString) {
    return timeString ? dayjs(timeString).format('HH:mm') : '';
  }
</script>

<div>
  <Accordion class="mt-4">
    <Panel class="px-3 py-2 text-lg">
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
        {trip.name}
        <span slot="icon">
          <IconButton class="material-icons" disabled>edit</IconButton>
          <IconButton class="material-icons" disabled>delete</IconButton>
        </span>
      </Header>
      <Content>
        <h1 class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">
          車両
        </h1>

        <div class="flex">
          <div class="ml-2 mt-2">
            <p>衝撃</p>
            <p class="mt-2">最大取扱量</p>
          </div>
          <div class="ml-5 mt-2">
            <p>{SHOCK_LEVEL_LABEL[Object.keys(SHOCK_LEVEL).find((key) => SHOCK_LEVEL[key] === trip.shockLevel)]}</p>
            <p class="mt-2">{trip.capacity}予約</p>
          </div>
        </div>
        <h1 class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">
          時刻表
        </h1>
        <div class="flex justify-center">
          <DataTable stickyHeader class="my-3 max-h-[300px] w-4/5 min-w-[300px] max-w-full overflow-auto">
            <Head>
              <Row>
                <Cell class="text-center font-bold">停車場所</Cell>
                <Cell class="text-center font-bold">時刻</Cell>
              </Row>
            </Head>
            <Body>
              {#each trip.timetables as timetable}
                <Row>
                  <Cell class="text-center">{timetable.stop}</Cell>
                  <Cell class="text-center">{formatPickupTime(timetable.time)}</Cell>
                </Row>
              {/each}
            </Body>
          </DataTable>
        </div>
      </Content>
    </Panel>
  </Accordion>
</div>
