<template>
  <el-dialog v-model="visible" title="修改密码">
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="6rem"
      size="large"
    >
      <el-form-item label="密码：" prop="password">
        <el-input v-model="form.password" type="password" show-password />
      </el-form-item>
      <el-form-item label="确认密码：" prop="passwordRepeat">
        <el-input
          v-model="form.passwordRepeat"
          type="password"
          show-password
          :error="repeatErr"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, reactive } from "vue";
import api from "@/axios";
import { forget_reset_pwd_rule } from "@/rules/LoginReg.js";
import { ElMessage } from "element-plus";

const ruleFormRef = ref(null);
const rules = reactive(forget_reset_pwd_rule);
const form = reactive({
  password: "",
  passwordRepeat: "",
});
let repeatErr = ref("");

const submitForm = async (formEl) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    if (form.password !== form.passwordRepeat) {
      repeatErr.value = "密码不一致";
      return;
    } else {
      repeatErr = "";
    }
    const data = await api.resetPassword(form.password, form.passwordRepeat);
    if (data.status === 0) {
      ElMessage.success(data.message + "正在跳转到登陆页面...");
      close();
    }
  } catch (err) {
    console.error(err);

    ElMessage.error(err);
  }
};
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
