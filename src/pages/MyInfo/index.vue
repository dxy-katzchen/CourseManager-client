<template>
  <BackGround>
    <div :class="$style.topBar">
      <i
        class="iconfont icon-zuojiantou_huaban"
        @click="router.back(-1)"
        :class="$style.leftIcon"
      ></i>
    </div>
    <div :class="$style.myInfo">
      <span :class="$style.title"> 我的信息 </span>

      <el-form
        ref="infoFormRef"
        :model="form"
        :rules="rules"
        label-width="5rem"
        :class="$style.form"
      >
        <table :class="$style.table">
          <tr>
            <td rowspan="4">
              <div :class="$style.td">
                <el-upload
                  action=""
                  :class="$style.uploader"
                  :http-request="upload"
                  :show-file-list="false"
                >
                  <img
                    v-if="form.avatar"
                    :src="form.avatar"
                    alt=""
                    :class="$style.avatar"
                  />
                  <el-icon v-else :class="$style.uploaderIcon"
                    ><Plus
                  /></el-icon>
                </el-upload>
                <div :class="$style.role" :style="roleColor">
                  {{
                    form.role === 1
                      ? "学生"
                      : form.role === 2
                      ? "教师"
                      : "管理员"
                  }}
                </div>
              </div>
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
                <el-input
                  v-model="form.email"
                  @blur="changeInfo(infoFormRef)"
                />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td :class="$style.tableInput">
              <el-form-item label="用户名:" prop="username">
                <el-input
                  v-model="form.username"
                  @blur="changeInfo(infoFormRef)"
                />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td :class="$style.tableInput">
              <el-form-item label="主页">
                <button :class="$style.myPageBtn">
                  {{ form.upid ? "进入主页" : "创建主页" }}
                </button>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
  </BackGround>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useInfoStore } from "@/store";
import { change_myinfo_rule } from "@/rules/myInfo.js";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import router from "@/router";
import BackGround from "./BackGround.vue";
import axios from "axios";
import api from "@/axios";

const userInfo = useInfoStore();
const rules = reactive(change_myinfo_rule);

const infoFormRef = ref(null);

const form = reactive({
  username: userInfo.getUserInfo.username, //可以改
  uid: userInfo.getUserInfo.uid,
  email: userInfo.getUserInfo.email, //可以改
  avatar: userInfo.getUserInfo.avatar, //可以改
  role: userInfo.getUserInfo.role,
  upid: userInfo.getUserInfo.upid, //可以改
});

const upload = async (file) => {
  const formData = new FormData();
  formData.append("smfile", file.file);

  axios
    .post("/api/v2/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "SBla1ckE7r3c8z0KtSFyrtIiZIRdiSwc",
      },
    })
    .then(async (res) => {
      switch (res.data.code) {
        case "success":
          form.avatar = res.data.data.url;

        case "image_repeated":
          form.avatar = res.data.images;
          await changeInfo(infoFormRef.value);
          break;
        default:
          ElMessage.error("上传失败");
          break;
      }
    });
};
const changeInfo = async (formEl) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    let data = await api.changeUserInfo(form.username, form.email, form.avatar);
    if (data.status == 0) {
      const user = Object.assign(userInfo.getUserInfo, form);
      //状态管理同步
      userInfo.setUser(user);

      ElMessage.success(data.message);
    } else {
      ElMessage.warning(data.message);
    }
  } catch (error) {
    ElMessage.error(error);
  }
};

const roleColor = computed(() => ({
  background:
    form.role === 1 ? "#c44ae3" : form.role === 2 ? "#8c00be" : "#7e0681",
}));
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

  color: #fff;
  .leftIcon {
    font-size: 2rem;
    cursor: pointer;
  }
}
.myInfo {
  width: 60%;
  padding: 8rem 0 2rem 0;
  text-align: center;
  .title {
    font-size: 2rem;
  }
  .form {
    margin-top: 4rem;

    .table {
      width: 100%;
      .td {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .uploader {
        width: 178px;
        height: 178px;
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
      .role {
        width: 4rem;
        height: 1.7rem;

        line-height: 1.7rem;
        text-align: center;
        color: #fff;
        margin-top: 1rem;
        border-radius: 0.5rem;
        font-size: 0.8rem;
      }
      .uploaderIcon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
      }
      .tableInput {
        padding: 0.2rem 4rem 0.2rem 2rem;
        box-sizing: border-box;
        width: 80%;
        .myPageBtn {
          background-color: #7e0681;
          width: 6rem;
          margin-left: 0.5rem;
          cursor: pointer;
          height: 2.2rem;
          border-radius: 0.8rem;
          color: #fff;
          border: 0;
        }
      }
      .avatar {
        display: block;
        width: 178px;
        height: 178px;
        object-fit: cover;
      }
    }
  }
}
</style>
