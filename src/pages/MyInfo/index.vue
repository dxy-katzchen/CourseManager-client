<template>
  <div>
    <div :class="$style.topBar">
      <i class="iconfont icon-zuojiantou_huaban" :class="$style.leftIcon"></i>
    </div>
    <div :class="$style.myInfo">
      <span :class="$style.title"> 我的信息 </span>

      <el-form
        ref="ruleFormRef"
        :module="form"
        :rules="rules"
        label-width="5rem"
        :class="$style.form"
      >
        <table :class="$style.table">
          <tr>
            <td rowspan="4" :class="$style.uploader">
              <el-upload
                action=""
                :http-request="upload"
                :show-file-list="false"
              >
                <img
                  v-if="form.avatar"
                  :src="form.avatar"
                  alt=""
                  :class="$style.avatar"
                />
                <el-icon v-else :class="$style.uploaderIcon"><Plus /></el-icon>
              </el-upload>
            </td>

            <td :class="$style.tableInput">
              <el-form-item label="学/工号:">
                <el-input v-model="form.uid" disabled />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td :class="$style.tableInput">
              <el-form-item label="邮箱:" prop="email">
                <el-input v-model="form.email" />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td :class="$style.tableInput">
              <el-form-item label="用户名:" prop="username">
                <el-input v-model="form.username" />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td :class="$style.tableInput">
              <el-form-item label="主页id:" prop="upid">
                <el-input v-model="form.upid" />
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useInfoStore } from "@/store";
import { change_myinfo_rule } from "@/roles/myInfo.js";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import axios from "axios";

const userInfo = useInfoStore();
const rules = reactive(change_myinfo_rule);

const ruleFormRef = ref(null);

const form = reactive({
  username: userInfo.getUserInfo.username, //可以改
  uid: userInfo.getUserInfo.uid,
  email: userInfo.getUserInfo.email, //可以改
  avatar: userInfo.getUserInfo.avatar, //可以改
  role: userInfo.getUserInfo.role,
  upid: userInfo.getUserInfo.upid, //可以改
});

const upload = (file) => {
  const formData = new FormData();
  formData.append("smfile", file.file);
  axios
    .post("/api/v2/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "SBla1ckE7r3c8z0KtSFyrtIiZIRdiSwc",
      },
    })
    .then((res) => {
      if (res.data.code === "success") {
        form.avatar = res.data.data.url;
        ElMessage.success("修改头像成功");
      } else if (res.data.code === "image_repeated") {
        form.avatar = res.data.images;
        ElMessage.success("修改头像成功");
      } else {
        ElMessage.error("上传失败");
      }
    });
};
</script>

<style module lang="less">
.topBar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 3.5rem;
  padding: 0 2rem;
  box-sizing: border-box;
  // background-color: aqua;
  line-height: 3.5rem;
  display: flex;
  background-image: linear-gradient(135deg, #ce9ffc 10%, #7367f0 100%);
  color: #fff;
  .leftIcon {
    font-size: 2rem;
  }
}
.myInfo {
  padding: 6rem 4rem 2rem 4rem;
  text-align: center;
  .title {
    font-size: 2rem;
  }
  .form {
    margin-top: 4rem;

    .table {
      width: 100%;
      .tableInput {
        padding: 0.2rem 4rem 0.2rem 2rem;
        box-sizing: border-box;
        width: 80%;
      }
      .avatar {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .uploader {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    &:hover {
      border-color: var(--el-color-primary);
    }
  }

  .uploaderIcon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>
