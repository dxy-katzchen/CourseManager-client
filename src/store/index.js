// 全局状态管理
import { defineStore } from "pinia";
//是否是黑夜模式
export const useDarkStore = defineStore("darkStore", {
  state: () => {
    return {
      isDark: true,
    };
  },
});

export const useInfoStore = defineStore("userInfo", {
  state: () => ({
    // Auth:"",
    //是否登录,也就是是否有token,
    //pinia不存token,只存状态.token存在localstorage
    isAuthenticated: false,
    user: {},
  }),

  getters: {
    getAuthenticated: (state) => state.isAuthenticated,
    getUserInfo: (state) => state.user,
  },
  actions: {
    setAuth(isAuth) {
      this.isAuthenticated = isAuth;
    },
    setUser(user) {
      this.user = user;
    },
  },
});
