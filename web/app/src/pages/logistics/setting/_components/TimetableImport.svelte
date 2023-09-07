<script lang="ts">
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import dayjs from 'dayjs';
  import customParseFormat from 'dayjs/plugin/customParseFormat';
  import { parse } from 'papaparse';
  import { addToast } from '../../../../stores/Toast';

  dayjs.extend(customParseFormat);

  export let timetables = [];
  export let routeId;
  export let kinds;

  function csvFileParse(file: File) {
    parse(file, {
      complete: (results) => {
        if (
          !results?.data ||
          results?.data.length === 0 ||
          results?.data.some((el) => {
            const [stop, time] = el;
            return el.length !== 2 || !(typeof stop === 'string') || !dayjs(time, 'hh:mm', true).isValid();
          })
        ) {
          addToast({
            message: `CSVファイルのフォーマットが正しくありません。`,
            type: 'error',
          });
          return;
        }
        timetables = results?.data.map((el) => {
          const [stop, time] = el;
          return { stop, time };
        });
      },
    });
  }

  function csvFileOnChangeHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    const [file] = target.files as FileList;
    if (file) {
      csvFileParse(file);
    } else {
      addToast({
        message: `CSVファイルの読み込みに失敗しました。`,
        type: 'error',
      });
    }
    // 同一ファイルを選択してもイベントが発火するようにする
    target.value = '';
  }
</script>

<div>
  <div class="my-3 flex justify-center">
    <label
      for={`csv_upload_${routeId}_${kinds}`}
      class="cursor-pointer rounded bg-[#4499E1] px-10 py-1 font-bold text-[#ffffff] hover:bg-[#2B6CB0]"
      >CSVインポート
      <input
        type="file"
        name="file"
        id={`csv_upload_${routeId}_${kinds}`}
        accept="text/csv"
        class="hidden"
        on:change={csvFileOnChangeHandler}
      />
    </label>
  </div>
  <div class="my-3 flex justify-center">
    <DataTable stickyHeader class="w-4/5 min-w-[300px]">
      <Head>
        <Row>
          <Cell class="text-center font-bold">停車場所</Cell>
          <Cell class="text-center font-bold">時刻</Cell>
        </Row>
      </Head>
      <Body>
        {#each timetables as timetable}
          <Row>
            <Cell class="text-center">{timetable.stop}</Cell>
            <Cell class="text-center">{timetable.time}</Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
</div>
