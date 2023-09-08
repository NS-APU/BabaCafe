<script lang="ts">
  import ConfirmDialog from '../../../../components/customized/ConfirmDialog.svelte';
  import { LogisticsRepository } from '../../../../models/Logistics';
  import { addToast } from '../../../../stores/Toast';
  import { handleError } from '../../../../utils/error-handle-helper';

  let logisticsRepository: LogisticsRepository = new LogisticsRepository();

  export let open = false;
  export let consolidations;
  export let id;
  export let name;

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'deleted':
        deleted();
        break;
      default:
        // NOP
        break;
    }
  }

  async function deleted() {
    try {
      const setting = await logisticsRepository.deleteConsolidationDefinition(id);
      consolidations = setting.consolidations;
      addToast({
        message: '混載定義を削除しました。',
      });
    } catch (err) {
      handleError(err, '混載定義の削除');
    }
  }
</script>

<ConfirmDialog
  bind:open
  closedAction={onDialogClosedHandle}
  title={`「${name}」の混載定義を削除しますか`}
  negativeButtonName="キャンセル"
  negativeButtonAction="close"
  positiveButtonName="削除"
  positiveButtonAction="deleted"
/>
