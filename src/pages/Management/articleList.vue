<template>
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

  <el-table :class="$style.table" :data="dataRef" @row-click="goDetails">
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

const currentPage = ref(1);
const pageSize = ref(10);
const totalNumber = ref(0);
const router = useRouter();
const userInfo = useInfoStore();
const role = ref(userInfo.user.role);
const props = defineProps(["type", "isActive"]);

const dataRef = ref();
const getTableData = async () => {
  try {
    const { data, status, total } = await api.getManageList(
      props.type,
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
const goDetails = (row, column) => {
  const { mid } = row;
  if (column.label) {
    router.push({ name: "ArticleDetail", query: { mid } });
  }
};
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

const handlePagChange = async () => {
  await getTableData();
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
.pagination {
  display: flex;
  width: 50%;
  min-width: 500px;
  justify-content: center;
  background-color: #faecfd;
  border-radius: 2rem;
  height: 3.5rem;
  margin-top: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.table {
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  margin: 3rem 0 2rem 0;
  width: 85%;
  border-radius: 2rem;
}
.bin {
  font-size: 1.2rem;
}
</style>

<style lang="less">
.el-table__body tr:hover > td {
  background-color: #faecfd !important;
  cursor: pointer;
  color: blueviolet;
}
</style>
