<template>
  <div :class="$style.card">
    <span :class="$style.title">Login</span>
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="6rem"
      size="large"
    >
      <el-form-item label="ID:" prop="id">
        <el-input v-model="form.id" />
      </el-form-item>
      <el-form-item label="Password:" prop="password">
        <el-input v-model="form.password" type="password" show-password />
      </el-form-item>
      <el-form-item label="Code:" :error="is_human_error">
        <Captcha @getData="getData" />
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
import { ElMessage } from "element-plus";
import api from "../../axios";
import { useInfoStore } from "../../store";
import { user_login_rule } from "@/rules/LoginReg.js";
import Captcha from "../../components/captcha.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const ruleFormRef = ref(null);

const is_human_error = ref("");

const form = reactive({
  id: "",
  password: "",
});

const userInfo = useInfoStore();

const rules = reactive(user_login_rule);
const getData = (val) => {
  is_human_error.value = val ? "" : "Check Code Error";
};
const submitForm = async (formEl) => {
  if (!formEl) return;
  try {
    if (is_human_error.value !== "") return;
    await formEl.validate();
    const res = await api.login(form.id, form.password);
    if (res.status === 0) {
      userInfo.token = res.token;

      const { data, status } = await api.getUserInfo();

      if (status === 0) {
        userInfo.user = data;
      }

      ElMessage.success(res.message);

      router.replace({ name: "Index" });
    }
  } catch (err) {
    ElMessage.error(err);
  }
};
</script>

<style src="@/style/userCard.less" module lang="less"></style>
