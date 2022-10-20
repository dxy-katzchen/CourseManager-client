<template>
  <el-popover trigger="hover" placement="bottom" popper-class="infoPopover">
    <template #reference>
      <img
        :src="userInfo.user.avatar || '../../imgs/peach.svg'"
        alt=""
        class="avatar"
      />
    </template>
    <template class="popoverList" #default>
      <router-link :to="{ name: 'Userpage' }" class="popoverItem"
        >我的主页</router-link
      >
      <router-link :to="{ name: 'MyInfo' }" class="popoverItem"
        >个人中心</router-link
      >
      <div class="popoverItem" @click="logout">退出登录</div>
    </template>
  </el-popover>
</template>

<script setup>
import {} from "vue";
import { useInfoStore } from "@/store";
import router from "@/router";
const userInfo = useInfoStore();

const logout = () => {
  router.push({ name: "Login" });
  userInfo.$reset();
};
</script>
