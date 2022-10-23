<template>
  <el-table :data="dataRef" stripe>
    <!-- <el-table-column align="center" prop="mid" label="id" width="100" /> -->
    <el-table-column align="center" prop="title" label="题目" />
    <el-table-column align="center" prop="author" label="作者" />
    <el-table-column align="center" prop="edit_time" label="编辑时间" />
    <el-table-column align="center" width="200" v-if="role === 3">
      <template #header> 操作 </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          ><i class="iconfont icon-ashbin" :class="$style.bin"></i
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
import api from "@/axios";
import { useInfoStore } from "@/store";
import { useRouter } from "vue-router";

const router = useRouter();
const userInfo = useInfoStore();
const role = ref(userInfo.user.role);
const props = defineProps(["type", "isActive"]);

const dataRef = ref();
//放到回收站里
const handleDelete = async (index, row) => {
  const { mid } = row;
  try {
    const { status, message } = await api.toBin(mid);
    if (status !== 0) {
      ElMessage.error(message);
      return;
    }
    ElMessage.success(message);
    dataRef.value.splice(index, 1);
  } catch (error) {
    ElMessage.error(error);
  }
};
const handleEdit = (_, row) => {
  const { mid } = row;

  router.push({ name: "EditArticle", query: { mid } });
};
const getTableData = async () => {
  try {
    const { data, status } = await api.getManageList(props.type, 10, 1);
    if (status === 0) {
      dataRef.value = data;
    }
  } catch (error) {
    ElMessage.error(error);
  }
};
watch(
  () => props.isActive,
  async (flag) => {
    if (flag && dataRef.value === undefined) {
      await getTableData();
    }
  },
  {
    immediate: true,
  }
);
</script>

<style module lang="less">
.bin {
  font-size: 1.2rem;
}
</style>
