<script lang="ts">
  import Button, { Label } from '@smui/button';
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Select, { Option } from '@smui/select';
  import Textfield from '@smui/textfield';
  import { SHOCK_LEVEL_LABEL } from '../../../../constants/product';

  export let open = false;
  export let selectedActions = (stop: string) => {
    stop;
  };

  let clicked = '';
  let name = '';
  let kinds = SHOCK_LEVEL_LABEL.strong;

  async function selecteds() {
    selectedActions(clicked);
  }

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'selected':
        await selecteds();
        break;
      default:
        // NOP
        break;
    }
  }
</script>

<Dialog bind:open on:SMUIDialog:closed={onDialogClosedHandle} surface$style="height: 500px;">
  <Title>混載定義を編集します</Title>
  <Content>
    <div class="m-3">
      <div class="label required input-title text-text-lightGray">定義名</div>
      <Textfield variant="outlined" bind:value={name} input$maxlength={50} required />
    </div>
    <div class="m-3">
      <div class="label required input-title text-text-lightGray">衝撃</div>
      <Select class="m-3 w-[300px]" variant="standard" bind:value={kinds} required>
        {#each Object.keys(SHOCK_LEVEL_LABEL) as kind}
          <Option value={SHOCK_LEVEL_LABEL[kind]}>{SHOCK_LEVEL_LABEL[kind]}</Option>
        {/each}
      </Select>
    </div>
  </Content>
  <Actions>
    <Button on:click={() => (clicked = 'No')}>
      <Label>キャンセル</Label>
    </Button>
    <Button on:click={() => (clicked = 'Yes')}>
      <Label>編集</Label>
    </Button>
  </Actions>
</Dialog>
