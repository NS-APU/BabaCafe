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
  export let tripId;

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
        if (timetables.length) {
          timetables = [];
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

  function formatPickupTime(timeString) {
    return timeString ? dayjs(timeString).format('HH:mm') : '';
  }
</script>

<div>
  <div class="my-3 flex justify-center">
    {#if kinds == 'add'}
      <label
        for={`csv_upload_${routeId}`}
        class="cursor-pointer rounded bg-[#4499E1] px-10 py-1 font-bold text-[#ffffff] hover:bg-[#2B6CB0]"
        >CSVインポート
        <input
          type="file"
          name="file"
          id={`csv_upload_${routeId}`}
          accept="text/csv"
          class="hidden"
          on:change={csvFileOnChangeHandler}
        />
      </label>
    {:else}
      <label
        for={`csv_upload_${tripId}`}
        class="cursor-pointer rounded bg-[#4499E1] px-10 py-1 font-bold text-[#ffffff] hover:bg-[#2B6CB0]"
        >CSVインポート
        <input
          type="file"
          name="file"
          id={`csv_upload_${tripId}`}
          accept="text/csv"
          class="hidden"
          on:change={csvFileOnChangeHandler}
        />
      </label>
    {/if}
  </div>
  <div class="my-3 flex justify-center">
    <DataTable stickyHeader class="max-h-[300px] w-4/5 min-w-[300px] overflow-auto">
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
            <!-- TODO: tripの情報はタームゾーンで入ってくるので、暫定的にlengthで分岐させてる -->
            <!-- よい方法を探す必要あり -->
            {#if timetable.time.length > 6}
              <Cell class="text-center">{formatPickupTime(timetable.time)}</Cell>
            {:else}
              <Cell class="text-center">{timetable.time}</Cell>
            {/if}
          </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
</div>
