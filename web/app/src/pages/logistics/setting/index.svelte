<script lang="ts">
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  import { USER_ATTRIBUTE } from '../../../constants/account';
  import { profile } from '../../../stores/Account';
  import IntermediarySettingForm from './_components/IntermediarySettingForm.svelte';
  import LogisticsSettingForm from './_components/LogisticsSettingForm.svelte';
  import ProducerSettingForm from './_components/ProducerSettingForm.svelte';
  onMount(() => {
    if (
      ![USER_ATTRIBUTE.producer, USER_ATTRIBUTE.logistics, USER_ATTRIBUTE.intermediary].includes($profile?.attribute)
    ) {
      $goto('/reservation');
    }
  });
</script>

<div>
  {#if USER_ATTRIBUTE.producer === $profile?.attribute}
    <ProducerSettingForm />
  {/if}
  {#if USER_ATTRIBUTE.logistics === $profile?.attribute}
    <LogisticsSettingForm />
  {/if}
  {#if USER_ATTRIBUTE.intermediary === $profile?.attribute}
    <IntermediarySettingForm />
  {/if}
</div>
