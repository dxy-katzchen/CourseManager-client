<template>
  <el-input v-model="checkCode" style="width: 50%" @input="check" />
  <span v-html="svg" @click="refresh"></span>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import api from "@/axios";
const checkCode = ref("");
const svg = ref(null);
const str = ref("");
const is_equal = ref(false);
const emit = defineEmits(["getData"]);

onMounted(() => {
  refresh();
});
const check = () => {
  is_equal.value = checkCode.value === str.value;
};
//监听,只有状态改变才emit
watch(is_equal, (val) => {
  emit("getData", val);
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
