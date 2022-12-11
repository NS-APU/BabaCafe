<script lang="ts">
  import Drawer, { Content } from "@smui/drawer";
  import List, { Item, Text } from "@smui/list";
  import { goto } from "@roxi/routify";

  export let open;
  let klass = "";
  export { klass as class };

  let active = "";

  function setActive(value: string) {
    active = value;
    $goto(`./${value}`);
  }
</script>

<Drawer class={klass} variant="dismissible" bind:open>
  <Content>
    <List>
      <Item
        href="javascript:void(0)"
        on:click={() => setActive("reservation")}
        activated={active === "reservation"}
      >
        <Text class="text-xl">予約一覧</Text>
      </Item>
      <Item
        href="javascript:void(0)"
        on:click={() => setActive("product")}
        activated={active === "product"}
      >
        <Text class="text-xl">出品一覧</Text>
      </Item>
      <Item
        href="javascript:void(0)"
        on:click={() => setActive("setting")}
        activated={active === "setting"}
      >
        <Text class="text-xl">個人情報設定</Text>
      </Item>
    </List>
  </Content>
</Drawer>
