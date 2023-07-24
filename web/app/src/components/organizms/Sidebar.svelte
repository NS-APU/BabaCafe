<script lang="ts">
  import { goto } from '@roxi/routify';
  import Drawer, { Content } from '@smui/drawer';
  import List, { Item, Text, Separator } from '@smui/list';
  import { USER_ATTRIBUTE } from '../../constants/account';
  import { profile } from '../../stores/Account';
  import { isLoggedIn, markAsLogoutState } from '../../stores/Login';
  import { addToast } from '../../stores/Toast';

  export let isOpen: boolean;
  export let close: () => void;

  const DEFAULT_ACTIVE = 'reservation';

  let active = DEFAULT_ACTIVE;

  function setActive(value: string) {
    active = value;
    $goto(`./${value}`);
    close();
  }

  function logout() {
    markAsLogoutState();
    addToast({
      message: 'ログアウトしました。',
      type: 'success',
    });
    $goto('/login');
  }

  isLoggedIn.subscribe((value) => {
    if (!value) {
      active = DEFAULT_ACTIVE;
      close();
    }
  });
</script>

<Drawer fixed={true} variant="modal" bind:open={isOpen}>
  <Content>
    <List>
      <Item href="javascript:void(0)" on:click={() => setActive('reservation')} activated={active === 'reservation'}>
        <Text class="text-base">予約一覧</Text>
      </Item>
      {#if [USER_ATTRIBUTE.producer, USER_ATTRIBUTE.consumer].includes($profile?.attribute)}
        <Item href="javascript:void(0)" on:click={() => setActive('product')} activated={active === 'product'}>
          <Text class="text-base">出品一覧</Text>
        </Item>
      {/if}
      {#if [USER_ATTRIBUTE.producer, USER_ATTRIBUTE.logistics, USER_ATTRIBUTE.intermediary].includes($profile?.attribute)}
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('logistics/setting')}
          activated={active === 'logistics/setting'}
        >
          <Text class="text-base">物流設定</Text>
        </Item>
      {/if}
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
      <Item href="javascript:void(0)" on:click={() => logout()} activated={active === 'logout'}>
        <Text class="text-base">ログアウト</Text>
      </Item>
    </List>
  </Content>
</Drawer>
