import { writable } from "svelte/store";

export const isLogined = writable(false);

export const markAsLoginState = () => {
  isLogined.set(true);
};

export const markAsLogoutState = () => {
  isLogined.set(false);
  localStorage.removeItem("accessToken");
};

