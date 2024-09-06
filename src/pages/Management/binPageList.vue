<template>
  <div :class="$style.content">
    <span :class="$style.title">Recycle Bin</span>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      background
      :class="$style.pagination"
      layout=" sizes, prev, pager, next, jumper"
      :total="totalNumber"
      @size-change="handlePagChange"
      @current-change="handlePagChange"
    />

    <div :class="$style.tableCard">
      <el-table :data="dataRef" @row-click="goDetails">
        <el-table-column align="center" prop="title" label="Title" />
        <el-table-column align="center" prop="author" label="Author" />
        <el-table-column align="center" prop="edit_time" label="Edit Time" />
        <el-table-column align="center" width="200">
          <template #header> Operation </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import api from "@/axios";

import { useRouter } from "vue-router";

const currentPage = ref(1);
const pageSize = ref(10);
const totalNumber = ref(0);
const router = useRouter();

const dataRef = ref();
onMounted(async () => {
  await getTableData();
});
const getTableData = async () => {
  try {
    const { data, status, total } = await api.getBinList(
      pageSize.value,
      currentPage.value
    );

    if (status === 0) {
      dataRef.value = data;
      totalNumber.value = total;
    }
  } catch (error) {
    console.error(error);
    ElMessage.error(error);
  }
};
//放到回收站里
const handleDelete = async (index, row) => {
  const { mid } = row;
  try {
    const { status, message } = await api.deleteCompletely(mid);
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
const goDetails = (row, column) => {
  const { mid } = row;
  if (column.label) {
    router.push({ name: "ArticleDetail", query: { mid } });
  }
};
const handleEdit = (_, row) => {
  const { mid } = row;

  router.push({ name: "EditArticle", query: { mid } });
};

const handlePagChange = async () => {
  await getTableData();
};
</script>

<style module lang="less">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(231, 217, 245);
  height: calc(100vh - 3.5rem);
  .title {
    margin: 2rem 0 1rem 0;
    font-size: 2rem;
    color: blueviolet;
    font-weight: bold;
    // letter-spacing: 4px;
  }
  .pagination {
    display: flex;
    width: 50%;
    min-width: 500px;
    justify-content: center;
    background-color: #faecfd;
    border-radius: 2rem;
    height: 3.5rem;
    margin-top: 1rem;
  }
  .tableCard {
    overflow: hidden;
    padding: 1rem 0;
    margin: 2rem 0;
    width: 80%;
    box-shadow: 0 0 10px blueviolet;
    border-radius: 2rem;
    background-color: #fff;
  }
  .bin {
    font-size: 1.2rem;
  }
}
</style>

<style lang="less">
.el-table__body tr:hover > td {
  background-color: #faecfd !important;
  cursor: pointer;
  color: blueviolet;
}
</style>
