<script lang="ts">
  import Button from '@smui/button';
  import CircularProgress from '@smui/circular-progress';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import IconButton from '@smui/icon-button';
  import { onMount } from 'svelte';
  import { SHOCK_LEVEL, SHOCK_LEVEL_LABEL } from '../../../../constants/product';
  import { LogisticsRepository, type TUserConsolidationDefine } from '../../../../models/Logistics';
  import { profile } from '../../../../stores/Account';
  import { addToast } from '../../../../stores/Toast';
  import { handleError } from '../../../../utils/error-handle-helper';
  import ConsolidationDefinitionAddDialog from './ConsolidationDefinitionAddDialog.svelte';
  import ConsolidationDefinitionDeleteDialog from './ConsolidationDefinitionDeleteDialog.svelte';
  import ConsolidationDefinitionEditDialog from './ConsolidationDefinitionEditDialog.svelte';
  import StopSelectWizardDialog from './StopSelectWizardDialog.svelte';

  $: logisticsRepository = new LogisticsRepository();

  let isOpen = false;
  let addOpen = false;
  let editOpen = false;
  let deleteOpen = false;
  let selectedStop = 'Unselected';
  let consolidations: TUserConsolidationDefine[] = [];
  let targetConsolidation = null;
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
      consolidations = setting.consolidations;
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
      <div class="mt-3">
        <div class="flex flex-row-reverse">
          <IconButton class="material-icons" on:click={() => (addOpen = true)}>add</IconButton>
          <ConsolidationDefinitionAddDialog bind:open={addOpen} bind:consolidations />
        </div>
      </div>
      <DataTable class="w-full">
        <Head>
          <Row>
            <Cell>名前</Cell>
            <Cell>衝撃</Cell>
            <Cell class="w-[5px]" />
            <Cell class="w-[5px]" />
          </Row>
        </Head>
        <Body>
          {#each consolidations as consolidation}
            <Row>
              <Cell>{consolidation.name}</Cell>
              <Cell
                >{SHOCK_LEVEL_LABEL[
                  Object.keys(SHOCK_LEVEL).find((key) => SHOCK_LEVEL[key] === consolidation.shockLevel)
                ]}</Cell
              >
              <Cell>
                <IconButton
                  class="material-icons"
                  on:click={() => {
                    targetConsolidation = consolidation;
                    editOpen = true;
                  }}>edit</IconButton
                >
              </Cell>
              <Cell>
                <IconButton
                  class="material-icons"
                  on:click={() => {
                    targetConsolidation = consolidation;
                    deleteOpen = true;
                  }}>delete</IconButton
                >
              </Cell>
            </Row>
          {/each}
        </Body>
      </DataTable>
      {#if targetConsolidation}
        <ConsolidationDefinitionEditDialog
          bind:open={editOpen}
          bind:consolidations
          id={targetConsolidation.id}
          name={targetConsolidation.name}
          shockLevel={String(targetConsolidation?.shockLevel)}
        />
        <ConsolidationDefinitionDeleteDialog
          bind:open={deleteOpen}
          bind:consolidations
          id={targetConsolidation.id}
          name={targetConsolidation.name}
        />
      {/if}
    </div>
  </div>
{/if}
