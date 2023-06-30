<script lang="ts">
  import { goto } from '@roxi/routify';
  import CircularProgress from '@smui/circular-progress';

  $goto('/login');
</script>

<div style="display: flex; justify-content: center">
  <CircularProgress style="width: 32px; height: 160px;" indeterminate />
</div>
