<template>
  <div :class="$style.card">
    <span :class="$style.title">注册</span>
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="6rem"
      size="large"
    >
      <el-form-item label="学/工号：" prop="id">
        <el-input v-model="form.id" />
      </el-form-item>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="密码：" prop="password"  type="password" show-password>
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="身份" prop="role">
        <el-radio-group v-model="form.role.selected">
          <el-radio v-for="role in form.role.roleList" :label="role.value">
            {{ role.name }}
          </el-radio>
        </el-radio-group>
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
import { ElMessage } from "element-plus";

import api from "../../axios";

import { useRouter } from "vue-router";
import { user_register_rule } from "@/rules/LoginReg.js";

const ruleFormRef = ref(null);
const router = useRouter();
const form = reactive({
  id: "",
  username: "",
  password: "",
  email: "",
  role: {
    roleList: [
      { value: 1, name: "学生" },
      { value: 2, name: "老师" },
      { value: 3, name: "管理员" },
    ],
    //默认学生
    selected: 1,
  },
});

const rules = reactive(user_register_rule);

const submitForm = async (formEl) => {
  if (!formEl) return;
  try {
    await formEl.validate();

    const data = await api.register(
      form.username,
      form.password,
      form.id,
      form.email,
      form.role.selected
    );

    if (data.status === 0) {
      ElMessage.success(data.message + " 正在为您跳转到登陆界面...");

      //TODO:跳转到登录界面
      router.push({ name: "Login" });
    }
  } catch (err) {
    ElMessage.error(err);
  }
};
</script>

<style src="@/style/userCard.less" module lang="less"></style>