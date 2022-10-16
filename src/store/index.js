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


export const useInfoStore=defineStore('userInfo',{
  state:()=>{
    return {
      Auth:"",
      email:""
    }
  }
})

