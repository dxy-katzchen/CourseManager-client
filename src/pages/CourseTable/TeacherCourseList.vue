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
    <el-table :data="dataRef" row-key="cid" @expand-change="getStuList">
      <el-table-column type="expand">
        <template #default="props">
          <el-table :data="props.row.stuList" border>
            <el-table-column align="center" label="ID" prop="uid" />
            <el-table-column
              align="center"
              label="Evaluation Score"
              prop="ev_score"
              :formatter="scoreFormat"
            />
            <el-table-column align="center" label="Name" prop="stu_name" />
            <el-table-column
              align="center"
              label="Score"
              prop="stu_score"
              :formatter="scoreFormat"
            />
            <el-table-column align="center" width="200">
              <template #header> Action </template>
              <template #default="scope">
                <el-popover placement="top" title="Please score:">
                  <template #reference>
                    <el-button size="small" type="success">Score</el-button>
                  </template>
                  <el-input
                    type="number"
                    :min="1"
                    :max="100"
                    v-model="stu_score"
                    size="small"
                    placeholder="Please enter the student score"
                  />

                  <el-button
                    type="primary"
                    size="small"
                    @click="submitScore(scope.row)"
                    :class="$style.popoverBtn"
                    >Submit</el-button
                  >
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="cid" label="Course id" />
      <el-table-column align="center" prop="is_open" label="Status">
        <template #default="scope">
          <el-tag
            size="small"
            effect="dark"
            :type="scope.row.is_open === 0 ? 'danger' : 'success'"
            >{{ scope.row.is_open === 0 ? "Closed" : "Open" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column align="center" prop="cname" label="Course Name" />
      <el-table-column align="center" prop="credit" label="Credit" />
      <el-table-column align="center" prop="type" label="Category">
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
                ? "Required"
                : scope.row.type === 2
                ? "Elective"
                : "Optional"
            }}
          </div>
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

const stu_score = ref(null);

onMounted(async () => {
  await getMyTeachCourse();
  dataRef.value = dataRef.value.map((item) => {
    item.stuList = [];
    return item;
  });
});
const submitScore = async (row) => {
  const { uid, cid } = row;

  stu_score.value = Number(stu_score.value);
  if (
    stu_score.value < 1 ||
    stu_score.value > 100 ||
    stu_score.value % 1 !== 0
  ) {
    return ElMessage.error("Invalid score data");
  }

  try {
    const { status, message } = await api.markMyStudent(
      cid,
      uid,
      stu_score.value
    );
    if (status === 0) {
      ElMessage.success(message);
      stu_score.value = null;
    }
  } catch (error) {
    console.error(error);
    ElMessage.error(error);
  }
};

const scoreFormat = (_, __, cellVal) => (cellVal ? cellVal : "--");
const getStuList = async (row) => {
  try {
    const { data, message, status } = await api.getMyStudent(row.cid);
    if (status === 0) {
      row.stuList = data;
    }
  } catch (error) {
    console.error(error);
    ElMessage.error(error);
  }
};

const getMyTeachCourse = async () => {
  try {
    const { data, status, total } = await api.teacherGetCourseList(
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
  await getMyTeachCourse();
};
const withdrawal = async (_, row) => {
  const { cid } = row;
  try {
    const { message, status } = await api.stuWithdraw(cid);
    if (status === 0) {
      ElMessage.success(message);
      await getMyTeachCourse();
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

  background-color: #fff;
  margin: 2rem;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.3);
  border-radius: 2rem;
  .typeTag {
    color: #fff;
    font-size: 0.7rem;
    height: 22px;
    line-height: 22px;
    border-radius: 20px;
    padding: 0 7px;
    width: 5rem;
    margin: 0 auto;
  }
}
.popoverBtn {
  float: right;
  margin: 10px 2px 0 2px;
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
</style>
