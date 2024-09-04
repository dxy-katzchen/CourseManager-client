<template>
  <el-input :class="$style.captchaInput" v-model="checkCode" @input="check" />
  <span v-html="svg" @click="refresh"></span>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import api from "@/axios";
const checkCode = ref("");
const svg = ref(null);
const str = ref("");
const is_equal = ref(false);
const emit = defineEmits(["getData"]);

onMounted(() => {
  refresh();
});
onUnmounted(() => {
  checkCode.value = "";
});
const check = () => {
  let lowerCase = checkCode.value.toLowerCase();
  is_equal.value = lowerCase === str.value;
};
//监听,只有状态改变才emit
watch(is_equal, (val) => {
  emit("getData", val);
});
//点击更新
const refresh = async () => {
  try {
    const data = await api.captcha();
    if (data.status === 0) {
      str.value = data.data.text.toLowerCase();
      svg.value = `<div>${data.data.svg_img}</div>`;
    }
  } catch (error) {
    ElMessage.error(err);
  }
};
</script>

<style module lang="less">
.captchaInput {
  width: 40%;
  display: inline-block;

  span {
    display: inline-block;
    width: 40%;
    cursor: pointer;
  }
}
</style>
