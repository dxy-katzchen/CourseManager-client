<template>
  <div :class="$style.mainPageTabBar">
    <span :class="$style.title">CourseTable</span>
    <span :class="$style.ch">课程管理系统</span>
  </div>
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
  line-height: 3.5rem;
  .title {
    display: inline-block;
    vertical-align: middle;
    color: #6e35ae;
    margin: 0 0.5rem 0 1.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    left: 1rem;
  }
  .ch {
    display: inline-block;
    vertical-align: middle;
    color: #6e35ae;
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>
