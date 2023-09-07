<script lang="ts">
  import Button from '@smui/button';
  import Dialog, { Title, Actions, Content } from '@smui/dialog';
  import Textfield from '@smui/textfield';
  import { LogisticsRepository, type TLogisticsSetting, type TRouteSetting } from '../../../../models/Logistics';
  import { addToast } from '../../../../stores/Toast';
  import { handleError } from '../../../../utils/error-handle-helper';

  let logisticsRepository: LogisticsRepository = new LogisticsRepository();
  export let open = false;
  export let logisticsSetting: TLogisticsSetting = null;
  export let route: TRouteSetting;
  let inputRouteName = route.name;

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'updateRoute':
        await updateRoute();
        break;
      default:
        inputRouteName = route.name;
        break;
    }
  }

  async function updateRoute() {
    try {
      logisticsSetting = await logisticsRepository.updateRoute(logisticsSetting.logisticsId, route.id, {
        name: inputRouteName,
      });
      addToast({
        message: '路線を編集しました。',
      });
    } catch (err) {
      handleError(err, '路線の編集');
    }
  }
</script>

<Dialog selection bind:open on:SMUIDialog:closed={onDialogClosedHandle}>
  <Title>路線を編集します。</Title>
  <Content class="mb-5">
    <Textfield class="mx-6 w-[300px]" bind:value={inputRouteName} type={'text'} input$maxlength={50} required />
  </Content>
  <Actions>
    <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="outlined">
      <p class="text-lg font-bold">キャンセル</p>
    </Button>
    <Button
      class="w-[150px]  rounded-full px-4 py-2"
      color="secondary"
      variant="raised"
      action="updateRoute"
      disabled={!inputRouteName}
    >
      <p class="text-lg font-bold">編集</p>
    </Button>
  </Actions>
</Dialog>
