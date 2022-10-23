<template>
  <div :class="$style.banner" :style="bannerImgStyle" />
</template>

<script setup>
import { onMounted, computed, reactive } from "vue";
import defaultImgUrl from "@/assets/bannerLogin.jpg";
import api from "@/axios";
import { ElMessage } from "element-plus";
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


</script>

<style module lang="less">
.banner {
  width: 100vw;
  height: 70vh;
}
</style>
