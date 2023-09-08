<script lang="ts">
  import Button from '@smui/button';
  import Dialog, { Title, Actions, Content } from '@smui/dialog';
  import Textfield from '@smui/textfield';
  import { LogisticsRepository, type TLogisticsSetting } from '../../../../models/Logistics';
  import { addToast } from '../../../../stores/Toast';
  import { handleError } from '../../../../utils/error-handle-helper';

  let logisticsRepository: LogisticsRepository = new LogisticsRepository();
  export let open = false;
  export let logisticsSetting: TLogisticsSetting = null;
  export let routeName = '';

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'createRoute':
        await createRoute(routeName, logisticsSetting.id);
        break;
      default:
        // NOP
        break;
    }
  }

  async function createRoute(routeName: string, id: string) {
    try {
      logisticsSetting = await logisticsRepository.createRoute(logisticsSetting.logisticsId, {
        name: routeName,
        logisticsSettingId: id,
      });
      addToast({
        message: '路線を追加しました。',
      });
    } catch (err) {
      handleError(err, '路線の追加');
    }
  }
</script>

<Dialog selection bind:open on:SMUIDialog:closed={onDialogClosedHandle}>
  <Title>路線を追加します。</Title>
  <Content class="mb-5">
    <Textfield
      class="mx-6 w-[300px]"
      bind:value={routeName}
      type={'text'}
      input$maxlength={50}
      input$placeholder="路線名"
      required
    />
  </Content>
  <Actions>
    <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="outlined">
      <p class="text-lg font-bold">キャンセル</p>
    </Button>
    <Button
      class="w-[150px]  rounded-full px-4 py-2"
      color="secondary"
      variant="raised"
      action="createRoute"
      disabled={!routeName}
    >
      <p class="text-lg font-bold">追加</p>
    </Button>
  </Actions>
</Dialog>
