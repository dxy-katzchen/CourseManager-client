<template>
  <div :class="$style.regCard">
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
      <el-form-item label="密码：" prop="password">
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
import router from "@/router";
import api from "../../axios";

import { user_register_role } from "@/roles/LoginReg.js";

const ruleFormRef = ref(null);

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

const rules = reactive(user_register_role);

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

<style module lang="less">
.regCard {
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
    letter-spacing: 0.5rem;
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
}
</style>
