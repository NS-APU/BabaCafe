<script lang="ts">
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";

  export let onClick;
</script>

<TopAppBar variant="short">
  <Row>
    <Section>
      <IconButton class="material-icons" on:click={onClick()}>menu</IconButton>
      <Title>BaBaCafeアプリ</Title>
    </Section>
  </Row>
</TopAppBar>

<style>
  /* Hide everything above this component. */
  :global(#smui-app),
  :global(body),
  :global(html) {
    display: block !important;
    height: auto !important;
    width: auto !important;
    position: static !important;
  }
</style>
