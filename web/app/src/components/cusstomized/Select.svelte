<script lang="ts">
  import Select, { Option } from "@smui/select";
  import { createField } from "felte";

  export let name: string;
  export let selectSelected: string;
  export let selectOptions: string[];
  export let label: string;
  export let texts: Partial<Record<string, string>> = {};

  const { field, onInput, onBlur } = createField(name);

  function getText(value: string): string {
    return texts?.[value] ?? value;
  }

  $: onInput(selectSelected);
</script>

<div use:field on:blur={onBlur} role="listbox" tabindex="0">
  <Select bind:value={selectSelected} {label} variant="standard">
    <Option value="" />
    {#each selectOptions as value}
      <Option {value}>{getText(value)}</Option>
    {/each}
  </Select>
</div>
