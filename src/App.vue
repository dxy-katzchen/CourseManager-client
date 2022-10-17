<script setup>
import {  watchEffect} from "vue";
import jwt_decode from "jwt-decode";
import { useInfoStore } from "@/store";

const userInfo = useInfoStore();
watchEffect(()=>{ //watchEffect页面一刷新，方法立即被调用
  if(localStorage.token){
    const decode = jwt_decode(localStorage.token);
    userInfo.setAuth(!!decode);
    userInfo.setUser(decode);
  }
})

</script>

<template>
  <router-view />
</template>

<style>
:root {
  font-size: 16px;
 
  /* transition: font-size 0.3s; */
}
</style>
