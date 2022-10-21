<template>
  <div :class="$style.myInfo">
    <BackGround>
      <div :class="$style.topBar">
        <i
          class="iconfont icon-zuojiantou_huaban"
          @click="router.back(-1)"
          :class="$style.leftIcon"
        ></i>
      </div>
      <div :class="$style.userInfo">
        <div :class="$style.username">{{ userInfo.user.username }}</div>
        <div :class="$style.email">{{ userInfo.user.role===1?'学生':userInfo.user.role===2?'教师':'管理员' }}</div>
        <div :class="$style.email">{{ userInfo.user.email }}</div>
        
      </div>
    </BackGround>
    <div class="content">
      <div class="headImg">
        
      </div>
    </div>
  </div>
</template>

<script setup>
import {} from "vue";
import { useRouter } from "vue-router";
import { useInfoStore } from "@/store";
import BackGround from "./BackGround.vue";

const router = useRouter();
const userInfo = useInfoStore();
</script>

<style module lang="less">
.myInfo {
  height: 200vh;
  overflow: hidden;

  background-color: aqua;
  .topBar {
    position: fixed;
    width: 100%;
    height: 4.5rem;
    line-height: 4.5rem;
    padding: 0 2rem;
    box-sizing: border-box;
    .leftIcon {
      font-size: 2rem;
      cursor: pointer;
      color: #fff;
    }
  }
  .userInfo {
    top: 33vh;
    left: 15vw;
    color: #fff;
    display: flex;
    flex-direction: column;
    .username {
      font-size: 2.8rem;
      // font-weight: bold;
    }
    .email {
      margin-top: 1.2rem;
      font-size: 1.1rem;
    }
  }
}
</style>
