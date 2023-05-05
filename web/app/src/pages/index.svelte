<script lang="ts">
  import { goto } from "@roxi/routify";
  import CircularProgress from "@smui/circular-progress";

  $goto("/login");
</script>

<div style="display: flex; justify-content: center">
  <CircularProgress style="height: 160px; width: 32px;" indeterminate />
</div>
