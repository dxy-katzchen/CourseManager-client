<template>
  <TabBar />
  <Aside />

  <div :class="$style.main">主页</div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import TabBar from "./TabBar.vue";
import Aside from "./aside.vue";
import api from "@/axios";
import { useInfoStore } from "@/store";
const userInfo = useInfoStore();

onBeforeMount(async () => {
  try {
    if (userInfo.token) {
      return;
    }
    const { data, status } = await api.getUserInfo();

    if (status === 0) {
      userInfo.user = data;
    }
  } catch (error) {
    ElMessage.error(error);
  }
});
</script>

<style module lang="less">
.main {
  font-size: 1rem;
  height: 100rem;
  // background-color: green;
  padding: 3.5rem 2rem 2rem 13rem;
}
</style>
