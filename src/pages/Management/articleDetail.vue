<template>
  <div :class="$style.bg">
    <div :class="$style.topBar">
      <i
        class="iconfont icon-zuojiantou_huaban"
        @click="router.back(-1)"
        :class="$style.leftIcon"
      ></i>
    </div>
    <div :class="$style.banner" :style="bannerImgStyle"></div>
    <div :class="$style.content">
      <div :class="$style.titleInfo">
        <div :class="$style.title">{{ articleDetail.title }}</div>
        <div :class="$style.type" :style="typeColor">
          {{ typeName }}
        </div>
        <div :class="$style.author">Author : {{ articleDetail.author }}</div>
        <span :class="$style.date">
          <i class="iconfont icon-clock" :class="$style.clock" /> Published :
          {{ articleDetail.create_time }} &nbsp;&nbsp;Last Edited :
          {{ articleDetail.edit_time }}
        </span>
      </div>
      <MdEditor
        :class="$style.editor"
        v-model="articleDetail.content"
        preview-only
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import defaultImgUrl from "@/assets/bannerLogin.jpg";
import api from "@/axios";
import { ElMessage } from "element-plus";
const router = useRouter();
const props = defineProps(["mid"]);
const articleDetail = reactive({});
onMounted(async () => {
  let { data, status, message } = await api.getPageDetails(props.mid);
  if (status !== 0) {
    ElMessage.error(message);
    return;
  }
  Object.assign(articleDetail, data);
});

const bannerImgStyle = computed(
  () =>
    `background: no-repeat center/cover url(${
      articleDetail.banner_pic === "default"
        ? defaultImgUrl
        : articleDetail.banner_pic
    });`
);
const typeColor = computed(
  () =>
    `background-color:${
      articleDetail.type == 1
        ? "red"
        : articleDetail.type == 2
        ? "green"
        : "blueviolet"
    }`
);
const typeName = computed(() =>
  articleDetail.type == 1
    ? "社会实践"
    : articleDetail.type == 2
    ? "课外活动"
    : "研究成果"
);
</script>

<style module lang="less">
.bg {
  background-color: #fff;
  .banner {
    width: 100%;
    height: 40vh;
    z-index: 1;
  }
  .topBar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 3.5rem;
    padding: 0 2rem;
    box-sizing: border-box;

    line-height: 3.5rem;
    display: flex;
    color: #fff;
    mix-blend-mode: difference;
    z-index: 999;
    .leftIcon {
      font-size: 2rem;
      cursor: pointer;
    }
  }
  .content {
    z-index: 888;
    position: relative;
    background-color: #fff;
    top: -5vh;
    width: 70vw;
    margin: 0 auto;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
    padding: 3.5rem 5rem 5rem 5rem;
    border-radius: 2rem;
    .titleInfo {
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-size: 1.8rem;
        font-weight: bold;
      }
      .type {
        display: inline-block;
        color: #fff;
        padding: 5px 12px;
        font-size: 0.8rem;
        border-radius: 0.5rem;
        margin: 1rem 0 1rem 0;
      }
      .author {
        display: inline-block;
        margin-bottom: 1rem;
      }
      .date {
        font-size: 0.9rem;
        margin-bottom: 1rem;
        color: rgba(0, 0, 0, 0.5);
        .clock {
          margin-right: 0.2rem;
        }
      }
    }
    .editor {
      height: 100%;
    }
  }
}
</style>
