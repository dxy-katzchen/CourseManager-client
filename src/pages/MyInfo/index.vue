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
            <td rowspan="5">
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
                <button
                  v-show="form.upid"
                  :class="$style.myPageBtn"
                  @click="goToMyPage"
                >
                  进入主页
                </button>
                <button
                  v-show="!form.upid"
                  :class="$style.myPageBtn"
                  @click="createMyPage"
                >
                  创建主页
                </button>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td :class="$style.tableInput">
              <el-form-item label="密码">
                <button :class="$style.myPageBtn" @click="is_visible = true">
                  修改密码
                </button>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
    <ChangePwdDialog v-model:visible="is_visible" />
  </BackGround>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useInfoStore } from "@/store";
import { change_myinfo_rule } from "@/rules/myInfo.js";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import ChangePwdDialog from "./changePwdDialog.vue";
import { useRouter } from "vue-router";
import BackGround from "./BackGround.vue";
import api from "@/axios";
import { uploadImg } from "@/axios/partThree";

const router = useRouter();
const userInfo = useInfoStore();
const rules = reactive(change_myinfo_rule);
const is_visible = ref(false);
const infoFormRef = ref(null);

const form = reactive({});
onMounted(() => {
  Object.assign(form, userInfo.user);
});

const upload = async ({ file }) => {
  const res = await uploadImg(file);
  switch (res.data.code) {
    case "success":
      form.avatar = res.data.data.url;
      await changeInfo(infoFormRef.value);
      break;
    case "image_repeated":
      form.avatar = res.data.images;
      await changeInfo(infoFormRef.value);
      break;
    default:
      ElMessage.error("上传失败");
      break;
  }
};
const changeInfo = async (formEl) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    let data = await api.changeUserInfo(form.username, form.email, form.avatar);
    if (data.status == 0) {
      Object.assign(userInfo.user, form);

      ElMessage.success(data.message);
    } else {
      ElMessage.warning(data.message);
    }
  } catch (error) {
    ElMessage.error(error);
  }
};

const createMyPage = async () => {
  try {
    const data = await api.createMyPage();

    if (data.status === 0) {
      const { upid } = data.data;
      form.upid = upid;
      userInfo.user.upid = upid;
      ElMessage.success(data.message);
    }
  } catch (error) {
    ElMessage.error(error);
  }
};
const goToMyPage = () => {
  router.push({ name: "Userpage" });
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
          border-color: #866dd8;
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
