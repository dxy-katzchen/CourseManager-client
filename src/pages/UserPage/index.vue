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
        <div :class="$style.email">
          {{
            userInfo.user.role === 1
              ? "学生"
              : userInfo.user.role === 2
              ? "教师"
              : "管理员"
          }}
        </div>
        <div :class="$style.email">{{ userInfo.user.email }}</div>
      </div>
    </BackGround>
    <div :class="$style.content">
      <img :src="userInfo.user.avatar" alt="" :class="$style.avatar" />
      <el-tabs
        stretch="true"
        tab-position="left"
        :class="[$style.tabs, 'chooseTab']"
      >
        <el-tab-pane label="介绍">{{
          myPageInfo.comment || "暂无"
        }}</el-tab-pane>
        <el-tab-pane label="博客">{{ myPageInfo.blog || "暂无" }}</el-tab-pane>
        <el-tab-pane v-if="isTeacher" label="研究方向">{{
          myPageInfo.search || "暂无"
        }}</el-tab-pane>
        <el-tab-pane v-if="isTeacher" label="教授课程">{{
          myPageInfo.teachcourse || "暂无"
        }}</el-tab-pane>
        <el-tab-pane v-if="isTeacher" label="学术著作">{{
          myPageInfo.book || "暂无"
        }}</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useInfoStore } from "@/store";
import { ElMessage } from "element-plus";
import BackGround from "./BackGround.vue";
import api from "@/axios";

const router = useRouter();
const userInfo = useInfoStore();
const myPageInfo = reactive({});
onBeforeMount(async () => {
  try {
    const data = await api.getMyPageInfo();
    userInfo.myPageInfo = Object.assign(myPageInfo, data.data);
  } catch (error) {
    ElMessage.error(error);
  }
});
const isTeacher = computed(() =>
  userInfo.user.role === 1 || 3 ? false : true
);
</script>

<style module lang="less">
.myInfo {
  box-sizing: border-box;
  padding-bottom: 5rem;
  overflow: hidden;
  background-color: #23153c;

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
  .content {
    width: 85vw;
    min-height: 80vh;
    margin: 0 auto;
    border-radius: 2rem;
    background-color: #fff;
    position: relative;
    box-sizing: border-box;
    padding: 5rem;

    .avatar {
      display: block;
      border-radius: 2rem;
      width: 13rem;
      height: 13rem;
      position: absolute;
      top: -6rem;
      left: 5rem;
      box-shadow: 0.7rem 0.6rem 6rem -1rem rgba(0, 0, 0, 0.32);
    }
    .tabs {
      position: relative;
      top: 2rem;
      height: 60vh;
      width: 65vw;
    }
  }
}
</style>
<style>
.chooseTab > .el-tabs__content {
  box-sizing: border-box;
  padding: 5rem;
  height: 100%;
}
</style>
