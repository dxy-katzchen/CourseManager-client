<template>
  <el-dialog
    :before-close="() => (isVisible = false)"
    v-model="isVisible"
    title="添加课程"
    :class="$style.dialog"
  >
    <el-form :model="form" ref="ruleFormRef" :rules="rules" label-width="6rem">
      <el-form-item
        label="课程id"
        v-if="JSON.stringify(props.courseInfo) !== '{}'"
      >
        <el-input v-model.trim="form.cid" placeholder="课程id" disabled />
      </el-form-item>
      <el-form-item label="课程名称" prop="cname">
        <el-input v-model.trim="form.cname" placeholder="课程名称" />
      </el-form-item>
      <el-form-item label="学分" prop="credit">
        <el-input v-model.trim.number="form.credit" placeholder="学分" />
      </el-form-item>
      <el-form-item
        label="教师名称"
        v-if="JSON.stringify(props.courseInfo) !== '{}'"
      >
        <el-input v-model.trim="form.tname" placeholder="教师名称" disabled />
      </el-form-item>
      <el-form-item label="教师id" prop="tid">
        <el-input v-model.trim="form.tid" placeholder="教师id" />
      </el-form-item>
      <el-form-item label="是否开放" prop="is_open">
        <el-select v-model="form.is_open" placeholder="是否开放">
          <el-option label="未开放" :value="0" />
          <el-option label="开放" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="课程类别" prop="type">
        <el-select v-model="form.type" placeholder="课程类别">
          <el-option label="必修" :value="1" />
          <el-option label="限选" :value="2" />
          <el-option label="选修" :value="3" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="() => (isVisible = false)">取消</el-button>
        <el-button type="primary" @click="addCourse(ruleFormRef)">
          添加
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { add_course_rule } from "@/rules/course.js";
import { ElMessage } from "element-plus";
import api from "@/axios";
const props = defineProps({ visible: Boolean, courseInfo: Object });
const ruleFormRef = ref(null);
const emits = defineEmits(["update:visible"]);

const rules = reactive(add_course_rule);

const isVisible = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emits("update:visible", val);
  },
});
const form = computed({
  get() {
    if (JSON.stringify(props.courseInfo) == "{}") {
      return {
        is_open: 0,
        cname: "",
        credit: null,
        type: 1,
        tid: "",
      };
    }
    return props.courseInfo;
  },
});

const addCourse = async (formEl) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    //发请求
    //参数列表:
    //is_open,cname,credit,tname,tid,type
    const { is_open, cname, credit, tname, tid, type } = form;
    const { status, message } = await api.addCourse(
      is_open,
      cname,
      credit,
      tname,
      tid,
      type
    );

    if (status === 0) {
      ElMessage.success(message);
      isVisible.value = false;
      //重置表单
      const originObj = {
        is_open: 0,
        cname: "",
        credit: null,
        type: 1,
        tid: "",
      };
      Object.assign(form, originObj);
      return;
    }
  } catch (error) {
    ElMessage.error(error);
  }
};
</script>

<style module lang="less">
.dialog {
  padding: 0.5rem 2rem 1rem 1.5rem;
  border-radius: 1rem;
}
</style>
