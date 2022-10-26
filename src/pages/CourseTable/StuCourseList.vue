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
            >{{ scope.row.is_open === 0 ? "已结束" : "开放中" }}</el-tag
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
      <el-table-column
        align="center"
        prop="stu_score"
        label="我的分数"
        :formatter="scoreFormat"
      />
      <el-table-column
        align="center"
        prop="ev_score"
        label="我的评价"
        :formatter="scoreEvFormat"
      />
      <el-table-column align="center" width="200">
        <template #header> 操作 </template>

        <template #default="scope">
          <el-popover
            placement="top"
            v-if="scope.row.is_open === 0"
            title="请评价:"
          >
            <template #reference>
              <el-button
                size="small"
                type="success"
                :disabled="scope.row.ev_score!==null"
                >评价</el-button
              >
            </template>
            <el-rate v-model="score" allow-half :colors="colors" />

            <el-button
              type="primary"
              size="small"
              @click="submitScore(scope.row)"
              :class="$style.popoverBtn"
              >提交</el-button
            >
          </el-popover>

          <el-button
            size="small"
            type="danger"
            v-if="scope.row.is_open === 1"
            @click="withdrawal(scope.$index, scope.row)"
            >退课</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { ElMessage } from "element-plus";
import api from "@/axios";

const currentPage = ref(1);
const pageSize = ref(10);
const totalNumber = ref(0);
const dataRef = ref();
const score = ref();
const colors = ref(["#99A9BF", "#F7BA2A", "#FF9900"]);

const ev_score = computed(() => score.value * 20);
onMounted(async () => {
  await getMyChooseCourse();
});

const submitScore = async (row) => {
  const { cid } = row;
  try {
    console.log(ev_score.value);

    const { status, message } = await api.stuEvalute(cid, ev_score.value);
    if (status === 0) ElMessage.success(message);
  } catch (error) {
    console.error(error);
    ElMessage.error(error);
  }
};

const scoreFormat = (row) => (row.stu_score ? row.stu_score : "--");
const scoreEvFormat = (row) => (row.ev_score ? row.ev_score : "--");

const getMyChooseCourse = async () => {
  try {
    const { data, total, status } = await api.stuGetChooseCourseList(
      pageSize.value,
      currentPage.value
    );
    if (status === 0) {
      dataRef.value = data;
      console.log(data);

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
 
  background-color: #fff;
  margin: 2rem ;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.3);
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
