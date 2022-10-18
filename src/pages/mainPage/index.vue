<template>
  <TabBar />
  <Aside />

  <div :class="$style.main">主页</div>
</template>

<script setup>
import {} from "vue";
import TabBar from "./TabBar.vue";
import Aside from "./aside.vue";
</script>

<style module lang="less">
.main {
  font-size: 1rem;
  height: 100rem;
  // background-color: green;
  padding: 3.5rem 2rem 2rem 13rem;
}
</style>
