<template>
  <div :class="$style.top">
    <i
      class="iconfont icon-zuojiantou_huaban"
      @click="router.back(-1)"
      :class="$style.leftIcon"
    ></i>
    <input type="text" :class="$style.title" v-model="PageDetail.title" />
    <button v-if="props.mid" :class="$style.submitBtn">修改文章</button>
    <button v-else :class="$style.submitBtn">发布文章</button>
  </div>
  <div :class="$style.editorContent">
    <MdEditor :class="$style.editor" @onUploadImg="Upload" v-model="PageDetail.content" />
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import  UploadImg  from "@/Hooks/UpLoadImg.js";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import api from "@/axios";

const props = defineProps(["mid"]);

const router = useRouter();

const PageDetail = reactive({});

onMounted(async () => {
  if (props.mid) {
    try {
      const { mid } = props;
      const { data, status } = await api.getPageDetails(mid);
      if (status === 0) {
        console.log(data);
        
        Object.assign(PageDetail, data);
      }
    } catch (error) {
      ElMessage.error(error);
    }
  }
});
const Upload = async (files, callback) => {
 await UploadImg(files,callback)
};
</script>

<style module lang="less">
.top {
  background: #d3a2f1;
  position: fixed;
  top: 0;
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  box-sizing: border-box;
  line-height: 3.5rem;
  display: flex;
  align-items: center;
  color: #fff;
  z-index: 999;
  .leftIcon {
    font-size: 2rem;
    cursor: pointer;
    flex: 0 0;
  }
  .title {
    flex: 1 1;
    height: 2.5rem;
    border-radius: 2rem;
    border: 0;
    margin: 0 1rem;
    transition: all 0.2s;
    padding: 0 1.5rem;
    font-size: 1.1rem;
    &:focus-visible {
      outline: 2px solid #9025d2 !important;
      transition: all 0.2s;
      box-shadow: 0 0 5px #9025d2;
    }
  }
  .submitBtn {
    letter-spacing: 1px;
    display: inline-block;
    width: 8rem;
    height: 2.8rem;
    font-size: 1.1rem;
    border: 0;
    background-color: #9025d2;
    color: #fff;
    border-radius: 2rem;
    transition: all 0.2s;
    &:hover {
      border: 2px solid #9025d2;
      color: #9025d2;
      background: #fff;
      transition: all 0.2s;
    }
  }
}
.editorContent {
  position: relative;
  padding-top: 3.5rem;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  .editor {
    height: 100%;
  }
}
</style>
