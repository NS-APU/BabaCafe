<script lang="ts">
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import { createField } from "felte";

  export let name: string;
  export let helperText: string = "";
  export let label: string = "";
  export let textValue: number;

  const { field, onInput, onBlur } = createField(name);

  $: onInput(textValue);
</script>

<div use:field on:blur={onBlur} role="textbox">
  <Textfield bind:value={textValue} {label} variant="standard" type="number">
    {#if helperText}
      <HelperText slot="helper">
        {helperText}
      </HelperText>
    {/if}
  </Textfield>
</div>
