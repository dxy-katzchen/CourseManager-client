<template>
  <el-table :data="dataRef" stripe>
    <el-table-column align="center" prop="mid" label="id" width="100"/>
    <el-table-column align="center" prop="title" label="题目" />
    <el-table-column align="center" prop="author" label="作者" />
    <el-table-column align="center" prop="edit_time" label="编辑时间" />
    <el-table-column align="center" width="200" v-if="role===3">
      <template #header> 操作 </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
import api from "@/axios";
import { useInfoStore } from "@/store";

const userInfo=useInfoStore()
const role=ref(userInfo.user.role)
const props = defineProps(["type", "isActive"]);

const dataRef = ref();


const handleDelete = (index, row) => {
  console.log(index, row);
};
const handleEdit = (index, row) => {
  console.log(index, row);
};
const getTableData = async () => {
  try {
    const { data, status } = await api.getManageList(props.type, 10, 1);
    if (status === 0) {
      dataRef.value = data;
      console.log(data);
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

<style module lang="less"></style>
