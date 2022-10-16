<template>
  <el-input v-model="checkCode" style="width: 50%" />
  <span v-html="svg" @click="refresh"></span>
</template>

<script setup>
import { ref, onMounted} from "vue";
import api from "@/axios";
const checkCode = ref("");
const svg = ref(null);
const str = ref("");



onMounted(() => {
  refresh();
});
const refresh = async () => {
  try {
    const data = await api.captcha();
    if (data.status === 0) {
      str.value = data.data.text;
      svg.value = `<div>${data.data.svg_img}</div>`;
    }
  } catch (error) {
    ElMessage.error(err);
  }
};

</script>

<style module lang="less"></style>
