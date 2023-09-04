<script lang="ts">
  import ConfirmDialog from '../../../../components/customized/ConfirmDialog.svelte';
  import { LogisticsRepository, type TRouteSetting, type TLogisticsSetting } from '../../../../models/Logistics';
  import { addToast } from '../../../../stores/Toast';
  import { handleError } from '../../../../utils/error-handle-helper';

  export let open: boolean;
  export let logisticsSetting: TLogisticsSetting = null;
  export let route: TRouteSetting;

  let logisticsRepository: LogisticsRepository = new LogisticsRepository();

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'delete':
        await deleteRoute();
        break;
      default:
        // NOP
        break;
    }
  }

  async function deleteRoute() {
    try {
      logisticsSetting = await logisticsRepository.deleteRoute(logisticsSetting.logisticsId, route.id);
      addToast({
        message: '路線を削除しました。',
      });
    } catch (err) {
      handleError(err);
    }
  }
</script>

<ConfirmDialog
  bind:open
  closedAction={onDialogClosedHandle}
  title={`「${route.name}」の路線を削除しますか？`}
  negativeButtonName="キャンセル"
  negativeButtonAction="close"
  positiveButtonName="削除"
  positiveButtonAction="delete"
/>
