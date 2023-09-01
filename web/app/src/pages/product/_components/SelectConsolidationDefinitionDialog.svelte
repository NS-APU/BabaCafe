<script lang="ts">
  import Button from '@smui/button';
  import CircularProgress from '@smui/circular-progress';
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import List, { Item, Graphic, Text } from '@smui/list';
  import Radio from '@smui/radio';
  import { LogisticsRepository } from '../../../models/Logistics';
  import { profile } from '../../../stores/Account';
  import { handleError } from '../../../utils/error-handle-helper';

  $: logisticsRepository = new LogisticsRepository();

  export let open: boolean;
  export let shockLevel;
  let selectConsolidation;
  let systemConsolidations = [];
  let userConsolidations = [];

  async function fetchConsolidations() {
    await Promise.all([fetchSystemConsolidations(), fetchUserConsolidations()]);
  }

  async function fetchSystemConsolidations() {
    try {
      systemConsolidations = await logisticsRepository.getSystemConsolidationDefinitions();
    } catch (err) {
      handleError(err, 'システム混載定義の取得');
      systemConsolidations = [];
    }
  }

  async function fetchUserConsolidations() {
    try {
      const setting = await logisticsRepository.getProducerSetting($profile.id);
      userConsolidations = setting.consolidations;
    } catch (err) {
      handleError(err, 'ユーザー混載定義の取得');
      userConsolidations = [];
    }
  }

  async function onDialogClosedHandle(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'select':
        shockLevel = Number(selectConsolidation.shockLevel);
        break;
      default:
        // NOP
        break;
    }
  }
</script>

<Dialog selection bind:open on:SMUIDialog:closed={onDialogClosedHandle}>
  <Title>混載定義を選択してください。</Title>
  <Content>
    {#await fetchConsolidations()}
      <div class="flex justify-center">
        <CircularProgress class="h-[160px] w-[32px]" indeterminate />
      </div>
    {:then}
      <List radioList>
        {#if systemConsolidations?.length === 0 && userConsolidations?.length === 0}
          <Text class="ml-5 text-[#919191]">混載定義が定義されていません。</Text>
        {/if}
        {#if systemConsolidations?.length > 0}
          <Text class="ml-5 text-[#919191]">システム混載定義</Text>
          {#each systemConsolidations as consolidation}
            <Item>
              <Graphic>
                <Radio bind:group={selectConsolidation} value={consolidation} />
              </Graphic>
              <Text>{consolidation.name}</Text>
            </Item>
          {/each}
        {/if}
        {#if userConsolidations?.length > 0}
          <Text class="ml-5 text-[#919191]">ユーザー混載定義</Text>
          {#each userConsolidations as consolidation}
            <Item>
              <Graphic>
                <Radio bind:group={selectConsolidation} value={consolidation} />
              </Graphic>
              <Text>{consolidation.name}</Text>
            </Item>
          {/each}
        {/if}
      </List>
    {/await}
  </Content>
  <Actions>
    <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="outlined" action="close">
      <p class="text-lg font-bold">キャンセル</p>
    </Button>
    <Button
      class="w-[150px]  rounded-full px-4 py-2"
      color="secondary"
      variant="raised"
      action="select"
      disabled={!selectConsolidation}
    >
      <p class="text-lg font-bold">選択</p>
    </Button>
  </Actions>
</Dialog>
