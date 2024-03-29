<script lang="ts">
  import Button from '@smui/button';
  import Dialog, { Title, Actions, Content } from '@smui/dialog';
  import Select, { Option } from '@smui/select';
  import Textfield from '@smui/textfield';
  import dayjs from 'dayjs';
  import { SHOCK_LEVEL, SHOCK_LEVEL_LABEL } from '../../../../constants/product';
  import { LogisticsRepository, type TLogisticsSetting } from '../../../../models/Logistics';
  import { addToast } from '../../../../stores/Toast';
  import { handleError } from '../../../../utils/error-handle-helper';
  import TimetableImport from './TimetableImport.svelte';

  const shockLevels = ['とても強い', '強い', '弱い', 'とても弱い'];
  let logisticsRepository: LogisticsRepository = new LogisticsRepository();
  export let logisticsSetting: TLogisticsSetting = null;
  export let open = false;
  export let routeId;
  let tripName = '';
  let value = null;
  let capacity: number = null;
  let timetables = [];
  let newDateTimetables = [];

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'createTrip':
        newDateTimetables = timetables.map((timetable) => {
          return { stop: timetable.stop, time: dayjs(timetable.time, 'hh:mm', true).toISOString() };
        });

        await createTrip(routeId);
        break;
      default:
        // NOP
        break;
    }
    clearInputData();
  }

  async function createTrip(routeId: string) {
    try {
      logisticsSetting = await logisticsRepository.createTrip(logisticsSetting.logisticsId, routeId, {
        name: tripName,
        shockLevel: SHOCK_LEVEL[Object.keys(SHOCK_LEVEL_LABEL).find((key) => SHOCK_LEVEL_LABEL[key] === value)],
        capacity: capacity,
        timetables: newDateTimetables,
      });
      addToast({
        message: '便を追加しました。',
      });
    } catch (err) {
      handleError(err, '便の追加');
    }
  }

  function clearInputData() {
    tripName = '';
    value = null;
    capacity = null;
    timetables = [];
  }

  function inputNumberLimited() {
    if (capacity > 100) {
      capacity = 100;
    } else if (capacity < 1) {
      capacity = 1;
    }
  }
</script>

<Dialog bind:open on:SMUIDialog:closed={onDialogClosedHandle} container$class="max-h-[80vh]">
  <Title>運航便を追加します。</Title>
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
      <TimetableImport bind:timetables {routeId} tripId={''} kinds="add" />
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
      action="createTrip"
      disabled={!tripName || !value || !capacity}
    >
      <p class="text-lg font-bold">追加</p>
    </Button>
  </Actions>
</Dialog>
