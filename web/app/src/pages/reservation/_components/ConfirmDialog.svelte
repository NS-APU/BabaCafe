<script lang="ts">
  import Button from '@smui/button';
  import Dialog, { Title, Actions } from '@smui/dialog';

  export let open: boolean;
  export let closedAction: (e: CustomEvent<{ action: string }>) => Promise<void>;
  export let title: string;
  export let negativeButtonName: string;
  export let negativeButtonAction: string;
  export let positiveButtonName: string;
  export let positiveButtonAction: string;
</script>

<Dialog selection bind:open on:SMUIDialog:closed={closedAction}>
  <Title>{title}</Title>
  <Actions>
    <Button
      class="w-[150px]  rounded-full px-4 py-2"
      color="secondary"
      variant="outlined"
      action={negativeButtonAction}
    >
      <p class="text-lg font-bold">{negativeButtonName}</p>
    </Button>
    <Button class="w-[150px]  rounded-full px-4 py-2" color="secondary" variant="raised" action={positiveButtonAction}>
      <p class="text-lg font-bold">{positiveButtonName}</p>
    </Button>
  </Actions>
</Dialog>
