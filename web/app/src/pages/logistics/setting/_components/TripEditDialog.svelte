<script lang="ts">
  import Button from '@smui/button';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import { Title, Actions, Content } from '@smui/dialog';
  import Select, { Option } from '@smui/select';

  export let tripName: string;
  const shockLevels = ['とても強い', '強い', '弱い', 'とても弱い'];

  // ダミーデータ
  let value = '強い';
  let things = [
    { name: '谷地ノ沢入口 バス停', time: '11:13' },
    { name: '北貞商店前 バス停', time: '11:11' },
    { name: '増沢 バス停', time: '11:18' },
  ];
</script>

<!-- Trip編集仮置き -->
<Title id="large-scroll-title">運航便を変更します。</Title>
<Content id="large-scroll-content">
  <div class="justify-left ml-8 mr-8">
    <p>
      便名<br />
      <input type="text" name="routeName" value={tripName} />
    </p>
    <p class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">車両</p>
    <div class="ml-3">
      <p class="mt-3">衝撃</p>
      <div>
        <Select bind:value>
          {#each shockLevels as shockLevel}
            <Option value={shockLevel}>{shockLevel}</Option>
          {/each}
        </Select>
      </div>
      <p class="mt-3">最大取扱い量</p>
      <p>### データ表示 ###</p>
    </div>
    <p class="mt-3 border-l-8 border-solid border-l-primary bg-[#f4f4f4] px-3 py-2 text-lg text-[#494949]">時刻表</p>
    <Button class="ml-3 mt-3 w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised">CSVインポート</Button>
    <!-- ダミーデータ -->
    <div class="flex justify-center">
      <DataTable class="m-3" table$aria-label="People list" style="width: 95%;">
        <Head>
          <Row>
            <Cell class="text-center font-bold" style="width: 100%;">停車場所</Cell>
            <Cell class="text-center font-bold" style="">時刻</Cell>
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
  </div>
</Content>

<Actions style="display: flex; justify-content: center">
  <Button class="w-[150px] rounded-full px-4 py-2" color="secondary" variant="outlined">
    <p class="text-lg font-bold">キャンセル</p>
  </Button>
  <Button class="w-[150px] rounded-full px-4 py-2" color="secondary" variant="raised" action="">
    <p class="text-lg font-bold">編集</p>
  </Button>
</Actions>
