<script lang="ts">
  import Drawer, { Content } from "@smui/drawer";
  import List, { Item, Text, Separator } from "@smui/list";
  import { goto } from "@roxi/routify";
  import { isLogined, markAsLogoutState } from "../../stores/Login";
  import { addToast } from "../../stores/Toast";

  export let isOpen: boolean;
  export let close: () => void;

  const DEFAULT_ACTIVE = "reservation";

  let active = DEFAULT_ACTIVE;

  function setActive(value: string) {
    active = value;
    $goto(`./${value}`);
    close();
  }

  function logout() {
    markAsLogoutState();
    addToast({
      message: "ログアウトしました。",
      type: "success",
    });
    $goto("/login");
  }

  isLogined.subscribe((value) => {
    if (!value) {
      active = DEFAULT_ACTIVE;
      close();
    }
  });
</script>

<Drawer fixed={true} variant="modal" bind:open={isOpen}>
  <Content>
    <List>
      <Item
        href="javascript:void(0)"
        on:click={() => setActive("reservation")}
        activated={active === "reservation"}
      >
        <Text class="text-base">予約一覧</Text>
      </Item>
      <Item
        href="javascript:void(0)"
        on:click={() => setActive("product")}
        activated={active === "product"}
      >
        <Text class="text-base">出品一覧</Text>
      </Item>
      <!--
      <Item
        href="javascript:void(0)"
        on:click={() => setActive("setting")}
        activated={active === "setting"}
      >
        <Text class="text-base">個人情報設定</Text>
      </Item>
      -->
      <Separator />
      <Item
        href="javascript:void(0)"
        on:click={() => logout()}
        activated={active === "logout"}
      >
        <Text class="text-base">ログアウト</Text>
      </Item>
    </List>
  </Content>
</Drawer>
