<template>
  <el-dialog
    draggable
    :before-close="() => (isVisible = false)"
    v-model="isVisible"
    :title="is_created ? 'Add Course' : 'Edit Course'"
    :class="$style.dialog"
  >
    <el-form :model="form" ref="ruleFormRef" :rules="rules" label-width="7rem">
      <el-form-item label="Course id" v-if="!is_created">
        <el-input v-model="form.cid" placeholder="Course id" disabled />
      </el-form-item>
      <el-form-item label="Name" prop="cname">
        <el-input v-model.trim="form.cname" placeholder="Course name" />
      </el-form-item>
      <el-form-item label="Credit" prop="credit">
        <el-input v-model.trim.number="form.credit" placeholder="Credit" />
      </el-form-item>
      <el-form-item label="Teacher" v-if="!is_created">
        <el-input v-model="form.tname" placeholder="Teacher name" disabled />
      </el-form-item>
      <el-form-item label="Teacher id" prop="tid">
        <el-input v-model.trim="form.tid" placeholder="Teacher id" />
      </el-form-item>
      <el-form-item label="Status" prop="is_open">
        <el-select v-model="form.is_open" placeholder="Status">
          <el-option label="Closed" :value="0" />
          <el-option label="Open" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="Type" prop="type">
        <el-select v-model="form.type" placeholder="Course Type">
          <el-option label="Required" :value="1" />
          <el-option label="Optional" :value="2" />
          <el-option label="Elective" :value="3" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          v-if="is_created"
          @click="addCourse(ruleFormRef)"
        >
          Add
        </el-button>
        <el-button type="primary" v-else @click="editCourse(ruleFormRef)">
          Edit
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref, onUpdated } from "vue";
import { add_course_rule } from "@/rules/course.js";
import { ElMessage } from "element-plus";
import api from "@/axios";
const props = defineProps({ visible: Boolean, courseInfo: Object });
const ruleFormRef = ref(null);
const emits = defineEmits(["update:visible"]);

const rules = reactive(add_course_rule);
const form = ref({});
const isVisible = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emits("update:visible", val);
  },
});
onUpdated(() => {
  if (is_created.value) {
    reset();
  } else {
    form.value = props.courseInfo;
  }
});
const is_created = computed(() => JSON.stringify(props.courseInfo) == "{}");

const reset = () => {
  form.value = {
    is_open: 0,
    cname: "",
    credit: null,
    type: 1,
    tid: "",
  };
};
const editCourse = async (formEl) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    const { cid, is_open, cname, credit, tname, tid, type } = form.value;
    const { status, message } = await api.updateCourse(
      cid,
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
      return;
    }
    ElMessage.error("Edit Course Failed");
  } catch (error) {
    console.error(error);
    ElMessage.error("Edit Course Failed");
  }
};
const addCourse = async (formEl) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    //发请求
    //参数列表:
    //is_open,cname,credit,tname,tid,type
    const { is_open, cname, credit, tname, tid, type } = form.value;
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
      return;
    }
  } catch (error) {
    console.error(error);
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
