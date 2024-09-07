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
              ? "Student"
              : userInfo.user.role === 2
              ? "Teacher"
              : "Admin"
          }}
        </div>
        <div :class="$style.email">{{ userInfo.user.email }}</div>
      </div>
    </BackGround>
    <div :class="$style.content">
      <img :src="userInfo.user.avatar" alt="" :class="$style.avatar" />
      <el-tabs
        tab-position="left"
        :class="[$style.tabs, 'chooseTab']"
        @tab-change="changeTab"
      >
        <el-tab-pane
          :label="item.name"
          v-for="(item, index) in infoArr"
          :key="item"
        >
          <el-button
            :class="$style.editBtn"
            @click="open(item.value)"
            v-show="!showEditor"
            type="primary"
            >Edit</el-button
          >
          <el-button
            :class="$style.editBtn"
            @click="submit(item.key, index)"
            v-show="showEditor"
            type="primary"
            >Submit</el-button
          >

          <md-editor
            language="en-US"
            v-model="item.value"
            v-show="!showEditor"
            preview-only
          />
          <md-editor
            v-model="text"
            v-show="showEditor"
            language="en-US"
            @onUploadImg="Upload"
            style="margin-top: 4rem"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, computed, ref } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { useRouter } from "vue-router";
import { useInfoStore } from "@/store";
import { ElMessage } from "element-plus";
import BackGround from "./BackGround.vue";
import api from "@/axios";

import UploadImg from "@/Hooks/UpLoadImg.js";

const router = useRouter();
const userInfo = useInfoStore();
const myPageInfo = reactive({});
const infoArr = reactive([]);
const text = ref("");

const showEditor = ref(false);

onBeforeMount(async () => {
  await getUserPageInfo();
});

const getUserPageInfo = async () => {
  try {
    const data = await api.getMyPageInfo();

    Object.assign(myPageInfo, data.data);
    infoArr.length = 0;
    for (const [key, value] of Object.entries(myPageInfo)) {
      switch (key) {
        case "comment":
          infoArr.push({ name: "Introduction", key, value });
          continue;
        case "blog":
          infoArr.push({ name: "Blog", key, value });
          continue;
        case "book":
          if (!isTeacher.value) continue;
          infoArr.push({ name: "Paper", key, value });
          continue;
        case "search":
          if (!isTeacher.value) continue;
          infoArr.push({ name: "Research Direction", key, value });
          continue;
        case "teachcourse":
          if (!isTeacher.value) continue;
          infoArr.push({ name: "Teaching Course", key, value });
          continue;
      }
    }
  } catch (error) {
    console.error(error);
    ElMessage.error(error);
  }
};

const changeTab = (tabName) => {
  text.value = infoArr[Number(tabName)].value;
};
const Upload = async (files, callback) => {
  await UploadImg(files, callback);
};

const open = async (value) => {
  showEditor.value = true;
  text.value = value;
};
const submit = async (key, index) => {
  try {
    const data = await api.updateUserInfo(key, text.value);

    if (data.status === 0) {
      await getUserPageInfo();

      ElMessage.success(data.message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error(error);
  }
  showEditor.value = false;
};
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
    .edit {
      float: right;
      color: #fff;
      cursor: pointer;
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
      object-fit: cover;
      display: block;
      border-radius: 2rem;
      width: 13rem;
      height: 13rem;
      position: absolute;
      top: -6rem;
      left: 5rem;
      box-shadow: 0.7rem 0.6rem 2rem -1rem rgba(0, 0, 0, 0.32);
    }
    .tabs {
      position: relative;
      top: 2rem;
      width: 70vw;
      .editBtn {
        position: absolute;
        right: 0;
        top: 0;
        border-radius: 2rem;
        width: 5rem;
      }
    }
  }
}
</style>
<style>
.chooseTab > .el-tabs__content {
  box-sizing: border-box;
  padding: 2rem 0 2rem 3.5rem;
  height: 100%;
}
</style>
