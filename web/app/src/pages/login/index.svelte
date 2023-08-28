<script lang="ts">
  import { goto } from '@roxi/routify';
  import Button from '@smui/button';
  import CircularProgress from '@smui/circular-progress';
  import Textfield from '@smui/textfield';
  import { onMount } from 'svelte';
  import { AccountService } from '../../services/AccountService';
  import { setAccountProfile } from '../../stores/Account';
  import { isLoggedIn, markAsLoginState } from '../../stores/Login';
  import { addToast } from '../../stores/Toast';
  import { handleError } from '../../utils/error-handle-helper';

  let email = '';
  let password = '';

  async function login() {
    await new AccountService()
      .login(email, password)
      .then((res) => {
        const { access_token, ...profile } = res;
        localStorage.setItem('accessToken', access_token);
        setAccountProfile(profile);
        $goto('/reservation');
        markAsLoginState();
        addToast({
          message: 'ログインしました。',
          type: 'success',
        });
      })
      .catch((err) => {
        handleError(err);
      });
  }

  onMount(() => {
    if ($isLoggedIn) {
      $goto('/reservation');
    }
  });
</script>

{#if $isLoggedIn}
  <div style="display: flex; justify-content: center">
    <CircularProgress style="width: 32px; height: 160px;" indeterminate />
  </div>
{:else}
  <form on:submit|preventDefault={login} class="my-[50px] mt-[10%] grid justify-center">
    <Textfield
      class="m-3 w-[300px]"
      variant="standard"
      label="メールアドレス"
      bind:value={email}
      required
      type={'email'}
      input$maxlength={50}
      input$autocomplete="email"
    />

    <Textfield
      class="m-3 w-[300px]"
      variant="standard"
      label="パスワード"
      bind:value={password}
      required
      type={'password'}
      input$maxlength={50}
      input$autocomplete="current-password"
    />

    <Button class="login-btn mx-14 mt-10" color="secondary" variant="raised" type="submit">
      <p class="black font-bold">ログイン</p>
    </Button>

    <div class="flex justify-center">
      <a class="mt-10 text-text-lightGray" href="./signup/">アカウント作成</a>
    </div>
  </form>
{/if}
