<template>
  <div :class="$style.loginCard" class="animate__animated animate__fadeInDown">
    <span :class="$style.title">登录</span>
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="5rem"
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
const ruleFormRef = ref(null);

const form = reactive({
  id: "",
  password: "",
});

const rules = reactive({
  id: [
    { required: true, message: "学/工号不得为空", trigger: "blur" },
    { min: 12, max: 12, message: "学/工号需要为12位", trigger: "change" },
  ],
  password: [
    { required: true, message: "密码不得为空", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "密码需要为6-12位数字/字母",
      trigger: "change",
    },
  ],
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("提交");
    } else {
      console.log("错误!", fields);
    }
  });
};
</script>

<style module lang="less">
.loginCard {
  background-color: rgba(255, 255, 255, 0.65);
  width: 90%;
  border-radius: 0.5rem;
  box-shadow: 0 1px 10px rgb(0 0 0 / 20%);
  // color: #fff;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 2.5rem 3rem;
  .title {
    font-size: 1.5rem;
    margin-bottom: 3rem;
    letter-spacing: 0.5rem;
  }
  .submitBtn {
    display: inline-block;
  }
}
</style>
