<script lang="ts">
  import Button from '@smui/button';
  import Dialog, { Title, Actions, Content } from '@smui/dialog';
  import Select, { Option } from '@smui/select';
  import Textfield from '@smui/textfield';
  import TimetableImport from './TimetableImport.svelte';

  const shockLevels = ['とても強い', '強い', '弱い', 'とても弱い'];
  export let open = false;
  export let tripName = '';
  let value = '';
  let capacity: number = null;
  let timetables = [];

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'createTrip':
        break;
      default:
        // NOP
        break;
    }
    clearInputData();
  }

  function clearInputData() {
    tripName = '';
    value = '';
    capacity = null;
    timetables = [];
  }
</script>

<Dialog
  bind:open
  on:SMUIDialog:closed={onDialogClosedHandle}
  surface$style="width: 850px; max-width: calc(100vw - 32px); max-height: 80vh;"
>
  <Title>運航便を追加します。</Title>
  <Content>
    <div class="justify-left ml-8 mr-8">
      <p>
        便名<br />
        <Textfield
          class="w-[300px]"
          bind:value={tripName}
          type={'text'}
          input$maxlength={50}
          input$placeholder="便名"
          required
        />
      </p>
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
        <p class="mt-3">最大取扱い量</p>
        <div>
          <Textfield
            class="w-[300px]"
            bind:value={capacity}
            type={'text'}
            input$maxlength={50}
            input$placeholder="最大取り扱い量"
            required
          />
          予約
        </div>
      </div>
      <h1 class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">
        <span>時刻表</span>
      </h1>
      <TimetableImport bind:timetables />
    </div>
  </Content>

  <Actions style="display: flex; justify-content: center">
    <Button class="w-[150px] rounded-full px-4 py-2" color="secondary" variant="outlined">
      <p class="text-lg font-bold">キャンセル</p>
    </Button>
    <Button class="w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised" action="" disabled={!tripName}>
      <p class="text-lg font-bold">編集</p>
    </Button>
  </Actions>
</Dialog>
