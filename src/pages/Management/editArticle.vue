<template>
  <div :class="$style.top">
    <i
      class="iconfont icon-zuojiantou_huaban"
      @click="router.back(-1)"
      :class="$style.leftIcon"
    ></i>
    <input type="text" :class="$style.title" v-model="PageDetail.title" />
    <button v-if="props.mid" :class="$style.submitBtn" @click="submit">
      Edit Article
    </button>
    <button v-else :class="$style.submitBtn" @click="submit">
      Publish Article
    </button>
  </div>
  <div :class="$style.editorContent">
    <MdEditor
      :class="$style.editor"
      @onUploadImg="Upload"
      v-model="PageDetail.content"
    />
  </div>
  <el-dialog v-model="dialogVisible" title="Publish Article">
    <el-form :model="PageDetail" :rules="rules">
      <el-form-item label="Cover" label-width="10rem">
        <el-input v-model="PageDetail.banner_pic" />
      </el-form-item>
      <el-form-item
        label="Cover Preview"
        v-show="PageDetail.banner_pic.length > 0"
        label-width="10rem"
      >
        <img :src="PageDetail.banner_pic" alt="" :class="$style.pic" />
      </el-form-item>
      <el-form-item label="Author" label-width="10rem" prop="author">
        <el-input v-model="PageDetail.author" />
      </el-form-item>
      <el-form-item label="Category" label-width="10rem">
        <el-radio-group v-model="PageDetail.type">
          <el-radio :label="1" :v-model="1" size="large"
            >Social Practice</el-radio
          >
          <el-radio :label="2" :v-model="2" size="large"
            >Extracurricular Activities</el-radio
          >
          <el-radio :label="3" :v-model="3" size="large">Research</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="publish"> Publish </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { edit_article_rule } from "@/rules/management.js";
import UploadImg from "@/Hooks/UpLoadImg.js";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import api from "@/axios";

const props = defineProps(["mid"]);
const dialogVisible = ref(false);
const router = useRouter();
const rules = reactive(edit_article_rule);
const PageDetail = reactive({
  title: "",
  content: "",
  type: 1,
  author: "",
  banner_pic: "",
});

onMounted(async () => {
  if (props.mid) {
    try {
      const { mid } = props;
      const { data, status } = await api.getPageDetails(mid);
      if (status === 0) {
        Object.assign(PageDetail, data);
      }
    } catch (error) {
      ElMessage.error(error);
    }
  }
});
const submit = async () => {
  dialogVisible.value = true;
  if (PageDetail.banner_pic !== "") return;
  const reg = new RegExp(
    '(https?:[^:<>"]*\/)([^:<>"]*)(\.((png!thumbnail)|(png)|(jpg)|(webp)))',
    "g"
  );
  const imgArr = reg.exec(PageDetail.content);

  if (imgArr !== null) {
    PageDetail.banner_pic = imgArr[0];
  }
};
const Upload = async (files, callback) => {
  await UploadImg(files, callback);
};
const getMid = async () => {
  if (!props.mid) {
    try {
      const { status, mid, message } = await api.createPage();
      if (status !== 0) {
        ElMessage.error(message);
        return;
      }
      return mid;
    } catch (error) {
      ElMessage.error(error);
    }
    //创建文章
  } else {
    return props.mid;
  }
};
const publish = async () => {
  try {
    let { title, content, type, author, banner_pic } = PageDetail;
    if (banner_pic === "") {
      //添加默认封面
      banner_pic = "default";
    }
    const mid = await getMid();

    const data = await api.updatePage(
      mid,
      title,
      content,
      type,
      author,
      banner_pic
    );

    const { message, status } = data;
    if (status === 0) {
      ElMessage.success(message);
      dialogVisible.value = false;
    } else {
      ElMessage.warning(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error(error);
  }
};
</script>

<style module lang="less">
.top {
  background: #d3a2f1;
  position: fixed;
  top: 0;
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  box-sizing: border-box;
  line-height: 3.5rem;
  display: flex;
  align-items: center;
  color: #fff;
  z-index: 999;
  .leftIcon {
    font-size: 2rem;
    cursor: pointer;
    flex: 0 0;
  }
  .title {
    flex: 1 1;
    height: 2.5rem;
    border-radius: 2rem;
    border: 0;
    margin: 0 1rem;
    transition: all 0.2s;
    padding: 0 1.5rem;
    font-size: 1.1rem;
    &:focus-visible {
      outline: 2px solid #9025d2 !important;
      transition: all 0.2s;
      box-shadow: 0 0 5px #9025d2;
    }
  }
  .submitBtn {
    letter-spacing: 1px;
    display: inline-block;
    width: 8rem;
    height: 2.8rem;
    font-size: 1.1rem;
    border: 0;
    background-color: #9025d2;
    color: #fff;
    border-radius: 2rem;
    transition: all 0.2s;
    &:hover {
      border: 2px solid #9025d2;
      color: #9025d2;
      background: #fff;
      transition: all 0.2s;
    }
  }
}
.editorContent {
  position: relative;
  padding-top: 3.5rem;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  .editor {
    height: 100%;
  }
}
.pic {
  width: 80px;
  height: 80px;
  display: inline-block;
  object-fit: cover;
  border-radius: 1rem;
}
</style>
