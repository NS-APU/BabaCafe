import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);

export const markAsLoginState = () => {
  isLoggedIn.set(true);
};

export const markAsLogoutState = () => {
  isLoggedIn.set(false);
  localStorage.removeItem('accessToken');
};
