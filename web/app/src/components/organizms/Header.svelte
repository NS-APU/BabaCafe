<script lang="ts">
  import IconButton from '@smui/icon-button';
  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import { isLoggedIn } from '../../stores/Login';

  export let toggle: () => void;
</script>

<TopAppBar variant="short">
  <Row>
    <Section>
      {#if $isLoggedIn}
        <IconButton class="material-icons" on:click={toggle}>menu</IconButton>
      {/if}
      <Title>BaBaCafeアプリ</Title>
    </Section>
  </Row>
</TopAppBar>

<style>
  /* Hide everything above this component. */
  :global(#smui-app),
  :global(body),
  :global(html) {
    position: static !important;
    display: block !important;
    width: auto !important;
    height: auto !important;
  }
</style>
