<template>
  <TabBar />
  <Aside />

  <div :class="$style.main">
  <router-view/>
  </div>
</template>

<script setup>
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
