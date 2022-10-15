<template>
  <BackGround>
    <div :class="$style.left">
      <TopBar />
      <div :class="$style.titleContent">
        <span :class="$style.enFont">CourseManager</span>
        <span :class="$style.chFont">智慧教学管理系统</span>
      </div>
    </div>
    <div :class="$style.right">
      <router-view />
    </div>
  </BackGround>
</template>

<script setup>
import TopBar from "./TopBar.vue";
import BackGround from "./BackGround.vue";
</script>

<style module lang="less">
.left {
  display: inline-block;
  width: 55vw;
  height: 100vh;

  .titleContent {
    color: #fff;
    height: calc(100vh - 5rem);
    display: flex;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 4rem;
    .enFont {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      font-weight: bold;
    }
    .chFont {
      font-size: 1.5rem;
      letter-spacing: 0.1rem;
    }
  }
}
.right {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 45vw;
  height: 100vh;
}
</style>
