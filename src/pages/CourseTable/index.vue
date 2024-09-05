<template>
  <div :class="$style.content">
    <el-form :inline="true" :model="queryForm" :class="$style.query">
      <el-form-item>
        <el-input
          v-model.trim.number="queryForm.cid"
          placeholder="Course ID"
          @blur="query"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model.trim="queryForm.cname"
          placeholder="Course Name"
          @blur="query"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model.trim="queryForm.tname"
          placeholder="Teacher Name"
          @blur="query"
        />
      </el-form-item>

      <el-form-item label="Status">
        <el-select
          v-model="queryForm.is_open"
          placeholder="Status"
          @change="query"
        >
          <el-option label="All" :value="-1" />
          <el-option label="Closed" :value="0" />
          <el-option label="Open" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="Course Type">
        <el-select
          v-model="queryForm.type"
          placeholder="Course Type"
          @change="query"
        >
          <el-option label="All" :value="-1" />
          <el-option label="Required" :value="1" />
          <el-option label="Optional" :value="2" />
          <el-option label="Elective" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">Reset</el-button>
      </el-form-item>
    </el-form>
    <div :class="$style.tableCard">
      <el-table :data="dataRef">
        <el-table-column align="center" prop="cid" label="Course ID" />
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
        <el-table-column align="center" prop="type" label="Course Type">
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
        <el-table-column align="center" prop="tname" label="Teacher Name" />
        <el-table-column
          align="center"
          width="200"
          v-if="role === 1 || role === 3"
        >
          <template #header> Operation </template>
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              plain
              @click="handleStuChoose(scope.$index, scope.row)"
              v-if="role === 1"
              >Choose</el-button
            >
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
              v-if="role === 3"
              >Edit</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="role === 3"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        background
        :class="$style.pagination"
        layout="sizes, prev, pager, next"
        :total="totalNumber"
        @size-change="handlePagChange"
        @current-change="handlePagChange"
      />
    </div>
  </div>
  <el-button
    @click="addCourse"
    v-if="role === 3"
    type="primary"
    :class="$style.addCourseBtn"
  >
    + Add Course
  </el-button>
  <AddCourseDialog v-model:visible="is_visible" :courseInfo="courseRow" />
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import api from "@/axios";
import { useInfoStore } from "@/store";

import AddCourseDialog from "./addCourseDialog.vue";

const currentPage = ref(1);
const pageSize = ref(10);
const totalNumber = ref(0);

const userInfo = useInfoStore();
const courseRow = reactive({});

const is_visible = ref(false);
const queryForm = reactive({
  cid: null,
  cname: "",
  is_open: -1,
  tname: "",
  type: -1,
});

const role = ref(userInfo.user.role);

const dataRef = ref();
onMounted(async () => {
  await query();
});
watch(is_visible, async (newval) => {
  if (!newval) {
    await query();
  }
});

const handleStuChoose = async (_, row) => {
  const { cid } = row;
  try {
    let { status, message } = await api.stuChooseCourse(cid);
    if (status === 0) {
      ElMessage.success(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error(error);
  }
};
const reset = () => {
  const originObj = {
    cid: null,
    cname: "",
    is_open: -1,
    tname: "",
    type: -1,
  };
  Object.assign(queryForm, originObj);
};

const addCourse = () => {
  //清除原来的props值
  Object.keys(courseRow).map((key) => {
    delete courseRow[key];
  });

  is_visible.value = true;
};
const query = async () => {
  try {
    const { cid, cname, is_open, tname, type } = queryForm;
    const { data, total, status, message } = await api.getCourseList(
      //参数列表:pageSize,pageCurr,cid,cname,is_open,tname,type
      pageSize.value,
      currentPage.value,
      cid,
      cname,
      is_open,
      tname,
      type
    );
    totalNumber.value = total;

    if (status === 0) {
      dataRef.value = data;
      return;
    }
    ElMessage.error(message);
  } catch (error) {
    console.error(error);
    ElMessage.error(error);
  }
};
//删除课程
const handleDelete = async (_, row) => {
  const { cid } = row;
  try {
    const { status, message } = await api.deleteCourse(cid);
    if (status !== 0) {
      ElMessage.error(message);
      return;
    }
    ElMessage.success(message);
    await query();
  } catch (error) {
    ElMessage.error(error);
  }
};

const handleEdit = (_, row) => {
  // const { cid,is_open, cname, credit, tname, tid, type } = row;
  Object.assign(courseRow, row);

  is_visible.value = true;
};

const handlePagChange = async () => {
  await query();
};
watch(queryForm, async () => {
  await query();
});
</script>

<style module lang="less">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  .query {
    display: flex;
    background-color: #fff;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-radius: 1rem;
    background-color: #faecfd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    > * {
      margin: 0 20px 0 0;
    }
    > :nth-child(4) {
      flex: 0 1 12rem;
    }
    > :nth-child(5) {
      flex: 0 1 12rem;
    }
    > :last-child {
      margin-right: 0;
    }
  }
  .tableCard {
    background-color: #fff;
    overflow: hidden;
    padding: 1rem 0;
    margin: 2rem 0;
    width: 100%;
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
  }
}
.addCourseBtn {
  position: fixed;
  bottom: 1.5rem;
  left: 14.5rem;
  border-radius: 2rem;

  z-index: 999;
  height: 2.8rem;
  width: 8rem;
}
</style>

<style lang="less">
.el-table__body tr:hover > td {
  background-color: #faecfd !important;
  cursor: pointer;
  color: blueviolet;
}
</style>
