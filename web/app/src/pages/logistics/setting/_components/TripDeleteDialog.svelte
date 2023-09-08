<script lang="ts">
  import ConfirmDialog from '../../../../components/customized/ConfirmDialog.svelte';
  import {
    LogisticsRepository,
    type TTripSetting,
    type TRouteSetting,
    type TLogisticsSetting,
  } from '../../../../models/Logistics';
  import { addToast } from '../../../../stores/Toast';
  import { handleError } from '../../../../utils/error-handle-helper';

  export let open: boolean;
  export let logisticsSetting: TLogisticsSetting = null;
  export let route: TRouteSetting;
  export let trip: TTripSetting;

  let logisticsRepository: LogisticsRepository = new LogisticsRepository();

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'delete':
        await deleteTrip();
        break;
      default:
        // NOP
        break;
    }
  }

  async function deleteTrip() {
    try {
      logisticsSetting = await logisticsRepository.deleteTrip(logisticsSetting.logisticsId, route.id, trip.id);
      addToast({
        message: '便を削除しました。',
      });
    } catch (err) {
      handleError(err);
    }
  }
</script>

<ConfirmDialog
  bind:open
  closedAction={onDialogClosedHandle}
  title={`「${trip.name}」を削除しますか？`}
  negativeButtonName="キャンセル"
  negativeButtonAction="close"
  positiveButtonName="削除"
  positiveButtonAction="delete"
/>
