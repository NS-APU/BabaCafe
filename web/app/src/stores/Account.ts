import { writable } from 'svelte/store';

export const profile = writable(null);

export const setAccountProfile = (accountProfile) => {
  profile.set(accountProfile);
};
