<template>
  <div :class="$style.card">
    <span :class="$style.title">忘记密码</span>
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="6rem"
      size="large"
    >
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="验证码：" prop="checkCode">
        <el-input
          v-model="form.checkCode"
          style="width: 50%; margin-right: 10%"
        />
        <el-button
          :disabled="timer !== 0"
          @click="sendEmail(ruleFormRef)"
          style="width: 40%"
          >{{ timer === 0 ? "获取验证码" : `${timer}秒后发送` }}</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          :class="$style.submitBtn"
          type="primary"
          @click="varifyCheckCode(ruleFormRef)"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import { useIntervalFn } from "@vueuse/core";
import api from "../../axios";

import {
  forget_check_email_rule,
  forget_check_code_rule,
} from "@/roles/LoginReg.js";

const rule1 = reactive(forget_check_email_rule);
const rule2 = reactive(forget_check_code_rule);

const rules = computed(() => {
  return showCodeRule.value ? rule2 : rule1;
});

const ruleFormRef = ref(null);
const showCodeRule = ref(false);
const form = reactive({
  email: "",
  checkCode: "",
});

const timer = ref(0);

const { pause, resume } = useIntervalFn(
  () => {
    timer.value--;
    if (timer.value <= 0) pause();
  },
  1000,
  { immediate: false }
);

const sendEmail = async (formEl) => {
  showCodeRule.value = false;

  if (!formEl || timer.value !== 0) return;
  timer.value = 60;
  //重启定时器
  resume();
  try {
    await formEl.validate();

    const data = await api.sendEmail(form.email);

    if (data.status === 0) {
      ElNotification.success({
        title: data.message,
        message: "邮箱已发送,请注意查收",
      });
      showCodeRule.value = true;
    }
  } catch (err) {
    ElMessage.error(err);
  }
};
//验证验证码是否正确
const varifyCheckCode = async (formEl) => {
  showCodeRule.value = true;
  if (!formEl) return;
  try {
    await formEl.validate();
    const data = await api.varify(form.email, form.checkCode);
    if (data.status === 0) {
      ElMessage.success(data.message);
      router.push({ name: "Reset" });
    }
  } catch (err) {
    ElMessage.error(err);
  }
};
</script>

<style src="@/style/userCard.less" module lang="less"></style>
