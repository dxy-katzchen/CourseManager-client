<template >
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
    <el-table :data="dataRef" @current-change="handleCurrentChange">
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
  </div>
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
const handleCurrentChange = (val) => {
  const { mid } = val;

  router.push({ name: "ArticleDetail", query: { mid } });
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
  justify-content: center;
  background-color: #faecfd;
  width: 50%;
  border-radius: 2rem;
  margin: 0 auto;
  height:3.5rem;
}
.tableCard{
  overflow: hidden;
  padding: 1rem 0;
  margin:1rem 2rem;
  box-shadow: 0 0 5px blueviolet;
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
