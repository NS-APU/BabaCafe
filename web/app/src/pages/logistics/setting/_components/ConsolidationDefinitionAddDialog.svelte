<script lang="ts">
  import Button from '@smui/button';
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Select, { Option } from '@smui/select';
  import Textfield from '@smui/textfield';
  import { SHOCK_LEVEL, SHOCK_LEVEL_LABEL } from '../../../../constants/product';
  import { LogisticsRepository } from '../../../../models/Logistics';
  import { addToast } from '../../../../stores/Toast';
  import { handleError } from '../../../../utils/error-handle-helper';

  let logisticsRepository: LogisticsRepository = new LogisticsRepository();

  export let open = false;
  export let consolidations;

  let name = '';
  let shockLevel: string;

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'add':
        await add();
        break;
      default:
        // NOP
        break;
    }
  }

  async function add() {
    try {
      const setting = await logisticsRepository.createConsolidationDefinition({
        name,
        shockLevel: Number(shockLevel),
      });
      consolidations = setting.consolidations;
      addToast({
        message: '混載定義を追加しました。',
      });
    } catch (err) {
      handleError(err, '混載定義の追加');
    }
  }
</script>

<Dialog
  bind:open
  on:SMUIDialog:closed={onDialogClosedHandle}
  surface$class="overflow-visible"
  container$class="overflow-visible"
>
  <Title>混載定義を追加します</Title>
  <Content class="overflow-visible">
    <div class="m-3">
      <Textfield bind:value={name} input$maxlength={50} required label="定義名" class="w-[300px]" />
    </div>
    <div class="m-3">
      <Select class="w-[300px] " bind:value={shockLevel} required label="衝撃">
        {#each Object.keys(SHOCK_LEVEL_LABEL) as kind}
          <Option value={String(SHOCK_LEVEL[kind])}>{SHOCK_LEVEL_LABEL[kind]}</Option>
        {/each}
      </Select>
    </div>
  </Content>
  <Actions>
    <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="outlined" action="close">
      <p class="text-lg font-bold">キャンセル</p>
    </Button>
    <Button
      class="w-[150px]  rounded-full px-4 py-2"
      color="secondary"
      variant="raised"
      action="add"
      disabled={!name || !shockLevel}
    >
      <p class="text-lg font-bold">追加</p>
    </Button>
  </Actions>
</Dialog>
