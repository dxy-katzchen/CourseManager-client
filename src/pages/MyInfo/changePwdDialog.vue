<template>
  <el-dialog
    :before-close="() => (isVisible = false)"
    v-model="isVisible"
    title="修改密码"
  >
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
        <el-button @click="() => (isVisible = false)">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, reactive, computed } from "vue";
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
      ElMessage.success(data.message);
      isVisible.value = false;
    }
  } catch (err) {
    console.error(err);

    ElMessage.error(err);
  }
};
const props = defineProps({
  visible: Boolean,
});

const emit = defineEmits(["update:visible"]);

const isVisible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit("update:visible", value);
  },
});
</script>

<style module lang="less"></style>
