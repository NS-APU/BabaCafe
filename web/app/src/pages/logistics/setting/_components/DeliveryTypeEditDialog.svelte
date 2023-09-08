<script lang="ts">
  import Button from '@smui/button';
  import Dialog, { Title, Actions, Content } from '@smui/dialog';
  import List, { Item, Graphic, Text } from '@smui/list';
  import Radio from '@smui/radio';
  import { DELIVERY_TYPE, LogisticsRepository, type TLogisticsSetting } from '../../../../models/Logistics';
  import { addToast } from '../../../../stores/Toast';
  import { handleError } from '../../../../utils/error-handle-helper';

  export let open = false;
  export let logisticsSetting: TLogisticsSetting = null;
  export let deliveryType: typeof DELIVERY_TYPE[keyof typeof DELIVERY_TYPE] = null;
  let logisticsRepository: LogisticsRepository = new LogisticsRepository();

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'updateDeliveryType':
        await updateDeliveryType(logisticsSetting.deliveryType);
        break;
      default:
        // NOP
        break;
    }
  }

  async function updateDeliveryType(deliveryTypeValue: typeof DELIVERY_TYPE[keyof typeof DELIVERY_TYPE]) {
    try {
      logisticsSetting = await logisticsRepository.updateDeliveryType(logisticsSetting.logisticsId, {
        deliveryType: deliveryTypeValue,
      });
      deliveryType = logisticsSetting.deliveryType;
      addToast({
        message: '集荷・配送方法を更新しました。',
      });
    } catch (err) {
      handleError(err, '集荷・配送方法の変更');
    }
  }

  export const MESSAGE_OF_DELIVERY_TYPE = {
    route: '巡回経路で集荷や配送を行う',
    direct: '集荷先や配送先に直接伺う',
  };
</script>

<Dialog selection bind:open on:SMUIDialog:closed={onDialogClosedHandle}>
  <Title>集荷・配送方法を変更します</Title>
  <Content>
    <List radioList>
      <Item>
        <Graphic>
          <Radio bind:group={logisticsSetting.deliveryType} value={DELIVERY_TYPE.route} />
        </Graphic>
        <Text>{MESSAGE_OF_DELIVERY_TYPE.route}</Text>
      </Item>
      <Item>
        <Graphic>
          <Radio bind:group={logisticsSetting.deliveryType} value={DELIVERY_TYPE.direct} />
        </Graphic>
        <Text>{MESSAGE_OF_DELIVERY_TYPE.direct}</Text>
      </Item>
    </List>
  </Content>
  <Actions>
    <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="outlined">
      <p class="text-lg font-bold">キャンセル</p>
    </Button>
    <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="raised" action="updateDeliveryType">
      <p class="text-lg font-bold">変更</p>
    </Button>
  </Actions>
</Dialog>
