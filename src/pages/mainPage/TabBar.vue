<template>
  <div :class="$style.mainPageTabBar">
    <img src="../../../imgs/cherry.svg" alt="" style="width: 3rem" />
    <span :class="$style.title">CourseTable </span>
    <span :class="$style.ch">课程管理系统</span>
    <div :class="$style.middle"></div>
    <span :class="$style.username"> {{ userInfo.username }} , 你好!</span>
    <img
      :src="userInfo.avatar ? `${userInfo.avatar}` : '../../../imgs/peach.svg'"
      alt=""
      :class="$style.avatar"
    />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import api from "@/axios";
import { ElMessage } from "element-plus";
import { useInfoStore } from "@/store";

const userInfo = useInfoStore();

onMounted(async () => {
  try {
    let data = await api.getUserInfo();
    if (data.status === 0) {
      ElMessage.success(data.message);
      data = data.data;

      userInfo.avatar = data.avatar;
      userInfo.username = data.username;
      userInfo.uid = data.uid;
      userInfo.upid = data.upid;
      userInfo.role = data.role;
    }
  } catch (error) {
    console.error(error);
    ElMessage.error(error);
  }
});
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
  background-image: linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);
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

  .avatar {
    flex: 0 0 auto;
    order: 5;
    width: 2.7rem;

    vertical-align: middle;
  }
}
</style>
