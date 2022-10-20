<template>
  <el-dialog v-model="visible" title="修改密码">
    <el-form>

    </el-form>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="close">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch,reactive} from "vue";

const props = defineProps({
  visible: Boolean,
});
const v = ref(props.visible);

watch(
  () => props.visible,
  (value) => {
    v.value = value;
  }
);
const emit = defineEmits(["update:visible"]);
// 关闭弹窗
const close = () => {
  v.value = false;
  emit("update:visible", v.value);
};
</script>

<style module lang="less"></style>
