<template>
    
  <el-pagination
    v-model:currentPage="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 50, 100]"
    background
    :class="$style.pagination"
    layout="sizes, prev, pager, next,jumper"
    :total="totalNumber"
    @size-change="handlePagChange"
    @current-change="handlePagChange"
  />
  <div :class="$style.tableCard">
    <el-table :data="dataRef">
      <el-table-column align="center" prop="cid" label="课程id" />
      <el-table-column align="center" prop="is_open" label="是否开放">
        <template #default="scope">
          <el-tag
            size="small"
            effect="dark"
            :type="scope.row.is_open === 0 ? 'danger' : 'success'"
            >{{ scope.row.is_open === 0 ? "未开放" : "已开放" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column align="center" prop="cname" label="课程名" />
      <el-table-column align="center" prop="credit" label="学分" />
      <el-table-column align="center" prop="type" label="类别">
        <template #default="scope">
          <div
            :class="$style.typeTag"
            :style="{
              background: `${
                scope.row.type === 1
                  ? '#951db9'
                  : scope.row.type === 2
                  ? '#1dbcb6'
                  : '#df3a01'
              }`,
            }"
          >
            {{
              scope.row.type === 1
                ? "必修"
                : scope.row.type === 2
                ? "限选"
                : "选修"
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="tname" label="任课教师" />
      <el-table-column align="center" width="200">
        <template #header> 操作 </template>
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="withdrawal(scope.$index, scope.row)"
            >退课</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import api from "@/axios";
const currentPage = ref(1);
const pageSize = ref(10);
const totalNumber = ref(0);
const dataRef = ref();

onMounted(async () => {
  await getMyChooseCourse();
});
const getMyChooseCourse = async () => {
  try {
    const { data, total, status } = await api.stuGetChooseCourseList(
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
const handlePagChange = async () => {
  await getMyChooseCourse();
};
const withdrawal = async (_, row) => {
  const { cid } = row;
  try {
    const { message, status } = await api.stuWithdraw(cid);
    if (status === 0) {
      ElMessage.success(message);
      await getMyChooseCourse();
    }
  } catch (error) {
    ElMessage.error(error);
  }
};
</script>

<style module lang="less">
.tableCard {
  overflow: hidden;
  padding: 1rem 0;
  margin: 2rem 0;

  margin: 2rem 3rem;
  box-shadow: 0 0 10px blueviolet;
  border-radius: 2rem;
  .typeTag {
    color: #fff;
    font-size: 0.7rem;
    height: 22px;
    line-height: 22px;
    border-radius: 20px;
    padding: 0 7px;
    width: 3.1rem;
    margin: 0 auto;
  }
}
.pagination {
  margin: 1rem auto 0 auto;
  display: flex;
  width: 50%;
  min-width: 500px;
  justify-content: center;
  background-color: #faecfd;
  border-radius: 2rem;
  height: 3.5rem;
}
</style>
