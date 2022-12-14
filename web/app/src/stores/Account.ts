import { type Writable, writable } from "svelte/store";

const enum StorageKeys {
  accountId = "accountId",
}

export const accountIdStore: Writable<string | null> = writable(
  sessionStorage.getItem(StorageKeys.accountId)
);

accountIdStore.subscribe((accountId: string | null) => {
  if (accountId === null) {
    sessionStorage.removeItem(StorageKeys.accountId);
  } else {
    sessionStorage.setItem(StorageKeys.accountId, accountId);
  }
});
