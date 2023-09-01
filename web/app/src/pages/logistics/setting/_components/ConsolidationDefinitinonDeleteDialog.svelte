<script lang="ts">
  import Button, { Label } from '@smui/button';
  import Dialog, { Title, Actions } from '@smui/dialog';
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
  <Title>混載定義を削除しますか</Title>
  <Actions>
    <Button on:click={() => (clicked = 'No')}>
      <Label>キャンセル</Label>
    </Button>
    <Button on:click={() => (clicked = 'Yes')}>
      <Label>削除</Label>
    </Button>
  </Actions>
</Dialog>
