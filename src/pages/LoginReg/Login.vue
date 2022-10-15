<template>
  <div :class="$style.loginCard" class="animate__animated animate__fadeInDown">
    <span :class="$style.title">登录</span>
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
      <el-form-item label="密码：" prop="password">
        <el-input v-model="form.password" />
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
import { useAuthStore } from "../../store";

const ruleFormRef = ref(null);

const form = reactive({
  id: "",
  password: "",
});

const AuthStore = useAuthStore();

const rules = reactive({
  id: [
    { required: true, message: "学/工号不得为空", trigger: "blur" },
    { min: 12, max: 12, message: "学/工号需要为12位", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不得为空", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "密码需要为6-12位数字/字母",
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    const data = await api.login(form.id, form.password);
    if (data.status === 0) {
      AuthStore.Auth = data.token;
      ElMessage.success(data.message);
      form.id = "";
      form.password = "";
    }
  } catch (err) {
    ElMessage.error(err);
  }
};
</script>

<style module lang="less">
.loginCard {
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
  }
}
</style>
