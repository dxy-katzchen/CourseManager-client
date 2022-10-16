<template>
  <div :class="$style.pwdCard">
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
        <el-input v-model="form.checkCode" :class="$style.checkCodeInput" />
        <el-button :class="$style.checkCodeBtn" @click="sendEmail(ruleFormRef)"
          >获取验证码</el-button
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

const sendEmail = async (formEl) => {
  showCodeRule.value = false;
  if (!formEl) return;
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
const varifyCheckCode = async (formEl) => {
  showCodeRule.value = true;
  if (!formEl) return;
  try {
    await formEl.validate();
    const data = await api.varify(form.email, form.checkCode);
    if (data.status === 0) {
      ElMessage.success(data.message);
    }
  } catch (err) {
    ElMessage.error(err);
  }
};
</script>

<style module lang="less">
.pwdCard {
  background-color: rgba(255, 255, 255, 0.7);
  width: 90%;
  border-radius: 0.5rem;
  box-shadow: 0 1px 10px rgb(0 0 0 / 20%);
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 2.5rem 5rem 1.6rem 3rem;
  .title {
    font-size: 1.5rem;
    margin-bottom: 3rem;
    letter-spacing: 0.2rem;
  }

  .submitBtn {
    width: 95%;
    font-size: 1.01rem;
    letter-spacing: 0.5rem;
    border-radius: 1.2rem;

    background: -webkit-linear-gradient(
      to right,
      #8e54e9,
      #4776e6
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #8e54e9,
      #4776e6
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    border: 0;
    color: #fff;
    margin-top: 0.6rem;
    height: 3.5rem;
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
      transition: all 0.3s ease;
    }
  }

  .checkCodeInput {
    width: 50%;
    margin-right: 10%;
  }
  .checkCodeBtn {
    display: inline-block;
    width: 40%;
  }
}
</style>
