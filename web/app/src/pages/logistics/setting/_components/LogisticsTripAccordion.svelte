<script lang="ts">
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import IconButton from '@smui/icon-button';

  export let tripName: string;
  // export let timeTableList:;

  // ダミーデータ
  let things = [
    { name: '谷地ノ沢入口 バス停', time: '11:13' },
    { name: '北貞商店前 バス停', time: '11:11' },
    { name: '増沢 バス停', time: '11:18' },
  ];
</script>

<div class="ml-6">
  <details class="mt-4 mr-2 outline outline-1 outline-offset-2 outline-[#000000]">
    <summary class="bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">
      {tripName}
      <IconButton class="material-icons align-right inline-block align-middle">edit</IconButton>
      <IconButton class="material-icons align-right inline-block align-middle">delete</IconButton>
    </summary>
    <p class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">車両</p>

    <div class="flex">
      <div class="mt-2">
        <p>衝撃</p>
        <p class="mt-2">最大取扱量</p>
      </div>
      <div class="ml-5 mt-2">
        <p>### データ取得 ###</p>
        <p class="mt-2">### データ取得 ###</p>
      </div>
    </div>
    <p class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">時刻表</p>
    <div class="flex justify-center">
      <DataTable class="mb-3 mt-3" table$aria-label="People list" style="max-width: 100%;">
        <Head>
          <Row>
            <Cell class="text-center font-bold">停車場所</Cell>
            <Cell class="text-center font-bold">時刻</Cell>
          </Row>
        </Head>
        <Body>
          {#each things as thing}
            <Row>
              <Cell>{thing.name}</Cell>
              <Cell class="text-center">{thing.time}</Cell>
            </Row>
          {/each}
        </Body>
      </DataTable>
    </div>
  </details>
</div>
