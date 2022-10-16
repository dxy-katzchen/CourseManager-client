<template>
  <div :class="$style.card">
    <span :class="$style.title">重设密码</span>
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
      <el-form-item>
        <el-button
          :class="$style.submitBtn"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import api from "../../axios";
import router from "@/router";
import { forget_reset_pwd_rule } from "@/roles/LoginReg.js";
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
      router.push({ name: "Login" });
    }
  } catch (err) {
    console.error(err);

    ElMessage.error(err);
  }
};
</script>

<style src="@/style/userCard.less" module lang="less"></style>
