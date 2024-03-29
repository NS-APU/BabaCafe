<script lang="ts">
  import Button from '@smui/button';
  import Dialog, { Title, Actions, Content } from '@smui/dialog';
  import Select, { Option } from '@smui/select';
  import Textfield from '@smui/textfield';
  import dayjs from 'dayjs';
  import { SHOCK_LEVEL, SHOCK_LEVEL_LABEL } from '../../../../constants/product';
  import {
    LogisticsRepository,
    type TLogisticsSetting,
    type TRouteSetting,
    type TTripSetting,
  } from '../../../../models/Logistics';
  import { addToast } from '../../../../stores/Toast';
  import { handleError } from '../../../../utils/error-handle-helper';
  import TimetableImport from './TimetableImport.svelte';

  const shockLevels = ['とても強い', '強い', '弱い', 'とても弱い'];
  let logisticsRepository: LogisticsRepository = new LogisticsRepository();
  export let logisticsSetting: TLogisticsSetting = null;
  export let open = false;
  export let trip: TTripSetting;
  export let route: TRouteSetting;
  let tripName = trip.name;
  let value = SHOCK_LEVEL_LABEL[Object.keys(SHOCK_LEVEL).find((key) => SHOCK_LEVEL[key] === trip.shockLevel)];
  let capacity = trip.capacity;
  let timetables = trip.timetables;

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'updateTrip':
        await updateTrip();
        break;
      default:
        // NOP
        break;
    }

    cancelInputData();
  }

  async function updateTrip() {
    try {
      logisticsSetting = await logisticsRepository.updateTrip(logisticsSetting.logisticsId, route.id, trip.id, {
        name: tripName,
        shockLevel: SHOCK_LEVEL[Object.keys(SHOCK_LEVEL_LABEL).find((key) => SHOCK_LEVEL_LABEL[key] === value)],
        capacity: capacity,
        timetables: timetables.map((timetable) => {
          return { stop: timetable.stop, time: formatPickupTime(timetable.time) };
        }),
      });
      addToast({
        message: '便を編集しました。',
      });
    } catch (err) {
      handleError(err, '便の編集');
    }
  }

  function cancelInputData() {
    tripName = trip.name;
    value = SHOCK_LEVEL_LABEL[Object.keys(SHOCK_LEVEL).find((key) => SHOCK_LEVEL[key] === trip.shockLevel)];
    capacity = trip.capacity;
    timetables = trip.timetables;
  }

  function inputNumberLimited() {
    if (capacity > 100) {
      capacity = 100;
    } else if (capacity < 1) {
      capacity = 1;
    }
  }

  function formatPickupTime(timeString) {
    if (dayjs(timeString, 'hh:mm', true).isValid()) {
      return dayjs(timeString, 'hh:mm', true).toDate();
    } else if (dayjs(timeString).isValid()) {
      return timeString;
    } else {
      return '';
    }
  }
</script>

<Dialog bind:open on:SMUIDialog:closed={onDialogClosedHandle} container$class="max-h-[80vh]">
  <Title>運航便を編集します。</Title>
  <Content>
    <div class="justify-left ml-8 mr-8">
      <Textfield
        class="w-[300px]"
        label="便名"
        bind:value={tripName}
        type={'text'}
        input$maxlength={50}
        input$placeholder="便名"
        required
      />
      <h1 class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">
        <span>車両</span>
      </h1>
      <div class="ml-3">
        <div>
          <Select bind:value label="衝撃">
            {#each shockLevels as shockLevel}
              <Option value={shockLevel}>{shockLevel}</Option>
            {/each}
          </Select>
        </div>
        <div>
          <Textfield
            class="mt-3 w-[300px]"
            label="最大取扱い量"
            bind:value={capacity}
            type={'number'}
            input$max={100}
            input$min={1}
            input$placeholder="最大取り扱い量"
            suffix="予約"
            on:input={inputNumberLimited}
            required
          />
        </div>
      </div>
      <h1 class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">
        <span>時刻表</span>
      </h1>
      <TimetableImport bind:timetables routeId={route.id} tripId={trip.id} kinds="edit" />
    </div>
  </Content>

  <Actions style="display: flex; justify-content: center">
    <Button class="w-[150px] rounded-full px-4 py-2" color="secondary" variant="outlined">
      <p class="text-lg font-bold">キャンセル</p>
    </Button>
    <Button
      class="w-[150px] rounded-full px-4 py-2"
      color="secondary"
      variant="raised"
      action="updateTrip"
      disabled={!tripName || !value || !capacity}
    >
      <p class="text-lg font-bold">編集</p>
    </Button>
  </Actions>
</Dialog>
