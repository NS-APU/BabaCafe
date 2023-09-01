<script lang="ts">
  import Button from '@smui/button';
  import CircularProgress from '@smui/circular-progress';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import { onMount } from 'svelte';
  import { LogisticsRepository } from '../../../../models/Logistics';
  import { profile } from '../../../../stores/Account';
  import { addToast } from '../../../../stores/Toast';
  import { handleError } from '../../../../utils/error-handle-helper';
  import ConsolidationDefinitinonAddDialog from './ConsolidationDefinitinonAddDialog.svelte';
  import ConsolidationDefinitinonDeleteDialog from './ConsolidationDefinitinonDeleteDialog.svelte';
  import ConsolidationDefinitinonEditDialog from './ConsolidationDefinitinonEditDialog.svelte';
  import StopSelectWizardDialog from './StopSelectWizardDialog.svelte';

  $: logisticsRepository = new LogisticsRepository();

  let isOpen = false;
  let addOpen = false;
  let editOpen = false;
  let deleteOpen = false;
  let selectedStop = 'Unselected';
  let selectedAction = async (stop: string) => {
    const operation = '物流設定の更新';
    try {
      selectedStop = stop;
      await logisticsRepository.updateProducerSetting($profile.id, { stop });
      addToast({
        message: `${operation}が完了しました。`,
      });
    } catch (err) {
      handleError(err, operation);
    }
  };

  let isMounted = false;

  onMount(async () => {
    try {
      const setting = await logisticsRepository.getProducerSetting($profile.id);
      selectedStop = setting.stop;
    } catch (err) {
      handleError(err, '物流設定の取得');
    } finally {
      isMounted = true;
    }
  });
</script>

{#if !isMounted}
  <div style="display: flex; justify-content: center">
    <CircularProgress style=" width: 32px;height: 160px;" indeterminate />
  </div>
{:else}
  <div class="flex justify-center">
    <div class="w-full lg:w-2/3 xl:w-1/2">
      <h1 class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">
        最寄りのバス停
      </h1>
      <div class="relative mx-5 my-3">
        <p class="py-1 text-base">{selectedStop === 'Unselected' ? '未選択' : selectedStop}</p>
        <div class="absolute inset-y-0 right-1 flex">
          <Button
            variant="raised"
            class="w-[100px] rounded-full text-base "
            color="secondary"
            type="button"
            on:click={() => (isOpen = true)}
          >
            <p>変更</p>
          </Button>
          <StopSelectWizardDialog bind:open={isOpen} bind:selectedAction />
        </div>
      </div>
      <h1 class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">
        混載定義
      </h1>
      <div class="relative mx-5 my-3">
        <div class="absolute inset-y-0 right-1 flex">
          <Button
            variant="raised"
            class="w-[100px] rounded-full text-base "
            color="secondary"
            type="button"
            on:click={() => (addOpen = true)}
          >
            <p>追加</p>
          </Button>
          <ConsolidationDefinitinonAddDialog bind:open={addOpen} />
        </div>
      </div>
      <DataTable class="mt-10" table$aria-label="pruducer_mixed" style="width: 100%">
        <Head>
          <Row>
            <Cell class="text-center">名前</Cell>
            <Cell class="text-center">衝撃</Cell>
            <Cell class="text-center" />
            <Cell class="text-center" />
          </Row>
        </Head>
        <Body>
          <Row>
            <Cell class="text-center">きゅうり</Cell>
            <Cell class="text-center">強い</Cell>
            <Cell class="text-center">
              <Button
                variant="raised"
                class="w-[100px] rounded-full text-base "
                color="secondary"
                type="button"
                on:click={() => (editOpen = true)}
              >
                <p>編集</p>
              </Button>
            </Cell>
            <ConsolidationDefinitinonEditDialog bind:open={editOpen} />
            <Cell class="text-center">
              <Button
                variant="raised"
                class="w-[100px] rounded-full text-base "
                color="secondary"
                type="button"
                on:click={() => (deleteOpen = true)}
              >
                <p>削除</p>
              </Button>
            </Cell>
            <ConsolidationDefinitinonDeleteDialog bind:open={deleteOpen} />
          </Row>
        </Body>
      </DataTable>
    </div>
  </div>
{/if}
