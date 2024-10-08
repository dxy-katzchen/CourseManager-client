// 全局状态管理
import { defineStore, storeToRefs } from "pinia";
//是否是黑夜模式
export const useDarkStore = defineStore("darkStore", {
  state: () => {
    return {
      isDark: true,
    };
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["isDark"],
      },
    ],
  },
});

export const useInfoStore = defineStore("userInfo", {
  state: () => ({
    token: null,
    user: null,
  }),

  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["user", "token"],
      },
    ],
  },
});
export const useResetPasswordStore = defineStore("email", {
  state: () => ({
    email: "",
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["email"],
      },
    ],
  },
});
