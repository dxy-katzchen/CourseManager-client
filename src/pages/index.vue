<template>
  <div :class="$style.mainPageTabBar"></div>
  <div :class="$style.aside"></div>

  <div :class="$style.main">主页</div>
</template>

<script setup>
import {} from "vue";
</script>

<style module lang="less">
.mainPageTabBar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 3.5rem;
  background-color: aqua;
}
.aside {
  position: fixed;
  top: 3.5em;
  bottom: 0;
  left: 0;
  width: 13rem;
  background-color: red;
}
.main {
  font-size: 1rem;
  height: 100rem;
  background-color: green;
  padding: 3.5rem 2rem 2rem 13rem;
}
</style>
