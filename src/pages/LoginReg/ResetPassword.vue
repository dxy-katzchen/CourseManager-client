<template>
  <div :class="$style.card">
    <span :class="$style.title">Reset Password</span>
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="6rem"
      size="large"
    >
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" type="password" show-password />
      </el-form-item>
      <el-form-item label="Confirm" prop="passwordRepeat" :error="repeatErr">
        <el-input v-model="form.passwordRepeat" type="password" show-password />
      </el-form-item>
      <el-form-item>
        <el-button
          :class="$style.submitBtn"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >Submit</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import api from "@/axios";
import { useRouter } from "vue-router";
import { forget_reset_pwd_rule } from "@/rules/LoginReg.js";
import { ElMessage } from "element-plus";
import { useResetPasswordStore } from "@/store";

const router = useRouter();
const ruleFormRef = ref(null);
const rules = reactive(forget_reset_pwd_rule);
const form = reactive({
  password: "",
  passwordRepeat: "",
});
const resetPasswordStore = useResetPasswordStore();
let repeatErr = ref("");

const submitForm = async (formEl) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    if (form.password !== form.passwordRepeat) {
      repeatErr.value = "Password not match";
      return;
    } else {
      repeatErr.value = "";
    }
    const data = await api.resetPasswordWithoutLogin(
      resetPasswordStore.email,
      form.password,
      form.passwordRepeat
    );
    if (data.status === 0) {
      ElMessage.success(data.message + " Redirecting to login page...");
      router.push({ name: "Login" });
    }
  } catch (err) {
    console.error(err);

    ElMessage.error(err);
  }
};
</script>

<style src="@/style/userCard.less" module lang="less"></style>
