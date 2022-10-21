<template>
  <div :class="$style.mainPageTabBar">
    <img src="../../../imgs/cherry.svg" alt="" style="width: 3rem" />
    <span :class="$style.title">CourseTable </span>
    <span :class="$style.ch">课程管理系统</span>
    <div :class="$style.middle"></div>
    <span :class="$style.username">
      {{ userInfo.user.username }} , 你好!</span
    >
    <Popover />
  </div>
</template>

<script setup>

import Popover from "@/components/popover.vue";
import { useInfoStore } from "@/store";

const userInfo = useInfoStore();


</script>

<style module lang="less">
.mainPageTabBar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 3.5rem;
  padding: 0 2rem;
  box-sizing: border-box;
  // background-color: aqua;
  line-height: 3.5rem;
  display: flex;
  background-image: linear-gradient(135deg, #ce9ffc 10%, #7367f0 100%);
  color: #fff;
  .title {
    flex: 0 0 auto;
    order: 1;
    vertical-align: middle;

    margin: 0 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    left: 1rem;
  }
  .ch {
    flex: 0 0 auto;
    order: 2;
    vertical-align: middle;

    font-size: 1.2rem;
    font-weight: bold;
  }
  .middle {
    flex: 1 0 auto;

    order: 3;
  }
  .username {
    flex: 0 0 auto;
    order: 4;
    padding-right: 2rem;
    vertical-align: middle;
  }
}
</style>
<style lang="less">
.infoPopover {
  font-size: 2rem;
  padding: 0;
  --el-popover-padding: 0;
  display: inline-block;
}
.avatar {
  flex: 0 0 auto;
  order: 5;
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 100%;
  cursor: pointer;
  margin-top: 0.3rem;
  right: 2rem;
}
.popoverList {
  display: flex;
  flex-direction: column;
}
.popoverItem {
  text-align: center !important;
  padding: 0.5rem 0 1rem 0;
  cursor: pointer;
  color: #796bf1;

  text-decoration: none;
  transition: all 0.3s;

  &:first-child {
    display: block;
    padding: 1rem 0 0.5rem 0;
  }
  &:nth-of-type(2) {
    padding: 0.5rem 0;
    display: block;
  }

  &:hover {
    background-color: #796bf1;
    color: #fff;
    transition: all 0.3s;
  }
}
</style>
