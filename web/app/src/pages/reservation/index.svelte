<script lang="ts">
  import { goto } from "@roxi/routify";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import LinearProgress from "@smui/linear-progress";

  type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    website: string;
  };
  let items: User[] = [];
  let loaded = false;

  loadThings(false);

  function loadThings(wait: boolean) {
    if (typeof fetch !== "undefined") {
      loaded = false;

      fetch(
        "https://gist.githubusercontent.com/hperrin/e24a4ebd9afdf2a8c283338ae5160a62/raw/dcbf8e6382db49b0dcab70b22f56b1cc444f26d4/users.json"
      )
        .then((response) => response.json())
        .then((json) =>
          setTimeout(
            () => {
              items = json;
              loaded = true;
            },
            // Simulate a long load time.
            wait ? 2000 : 0
          )
        );
    }
  }

  $goto("/reservation");
</script>

<div class="m-6">
  <h2 class="text-2xl font-bold">予約一覧</h2>

  <DataTable class="mt-10" table$aria-label="User list" style="width: 100%;">
    <Head>
      <Row>
        <Cell numeric>id</Cell>
        <Cell style="width: 100%;">予約者</Cell>
        <Cell>作物名</Cell>
        <Cell>出荷日</Cell>
      </Row>
    </Head>
    <Body>
      {#each items as item (item.id)}
        <Row>
          <Cell numeric>{item.id}</Cell>
          <Cell>{item.name}</Cell>
          <Cell>{item.username}</Cell>
          <Cell>{item.email}</Cell>
        </Row>
      {/each}
    </Body>

    <LinearProgress
      indeterminate
      bind:closed={loaded}
      aria-label="Data is being loaded..."
      slot="progress"
    />
  </DataTable>
</div>
