<template>
  <div>{{ type }}</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
import api from "@/axios";

const props = defineProps(["type", "isActive"]);

const dataRef = ref();

watch(
  () => props.isActive,
  async (flag) => {
    if (flag && dataRef.value === undefined) {
      try {
        const { data, status } = await api.getManageList(props.type, 10, 1);
        if (status === 0) {
          dataRef.value = data;
        }
      } catch (error) {
        ElMessage.error(error);
      }
    }
  },
  {
    immediate: true,
  }
);
</script>

<style module lang="less"></style>
