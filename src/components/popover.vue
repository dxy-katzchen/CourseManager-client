<template>
  <el-popover trigger="hover" placement="bottom" popper-class="infoPopover">
    <template #reference>
      <img :src="userInfo.user.avatar" alt="" class="avatar" />
    </template>
    <template class="popoverList" #default>
      <router-link :to="{ name: 'Userpage' }" class="popoverItem"
        >Profile</router-link
      >
      <router-link :to="{ name: 'MyInfo' }" class="popoverItem"
        >Personal Centre</router-link
      >
      <div class="popoverItem" @click="logout">Log Out</div>
    </template>
  </el-popover>
</template>

<script setup>
import { useInfoStore } from "@/store";
import { useRouter } from "vue-router";

const router = useRouter();
const userInfo = useInfoStore();

const logout = () => {
  router.push({ name: "Login" });
  userInfo.$reset();
};
</script>
