<template>
  <div :class="$style.content">
    <el-form :inline="true" :model="queryForm" :class="$style.query">
      <el-form-item>
        <el-input v-model.trim.number="queryForm.cid" placeholder="课程id" />
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="queryForm.cname" placeholder="课程名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="queryForm.tname" placeholder="教师名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">重置</el-button>
      </el-form-item>
      <!-- <el-form-item label="是否开放">
        <el-select v-model="queryForm.is_open" placeholder="是否开放">
          <el-option label="所有" :value="-1" />
          <el-option label="未开放" :value="0" />
          <el-option label="开放" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="课程类别">
        <el-select v-model="queryForm.type" placeholder="课程类别">
          <el-option label="所有" :value="-1" />
          <el-option label="必修" :value="1" />
          <el-option label="限选" :value="2" />
          <el-option label="选修" :value="3" />
        </el-select>
      </el-form-item> -->
    </el-form>
    <el-button @click="is_visible = true" v-if="role === 3" type="primary"
      >添加课程</el-button
    >
    <div :class="$style.tableCard">
      <el-table :data="dataRef">
        <el-table-column align="center" prop="cid" label="课程id" />
        <el-table-column
          align="center"
          prop="is_open"
          :filters="[
            { text: '未开放', value: 0 },
            { text: '已开放', value: 1 },
          ]"
          :filter-method="filterIfOpen"
          :filter-multiple="false"
          label="是否开放"
        />
        <el-table-column align="center" prop="cname" label="课程名" />
        <el-table-column align="center" prop="credit" label="学分" />
        <el-table-column align="center" prop="type" label="类别" />
        <el-table-column align="center" prop="tname" label="任课教师" />
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
  <AddCourseDialog v-model:visible="is_visible" />
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import api from "@/axios";
import { useInfoStore } from "@/store";
import { useRouter } from "vue-router";
import AddCourseDialog from "./addCourseDialog.vue";

const currentPage = ref(1);
const pageSize = ref(10);
const totalNumber = ref(0);
const router = useRouter();
const userInfo = useInfoStore();

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
const filterIfOpen = (value, row) => {
  return row.is_open === value;
  // await query();
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
    console.log(total);

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
  await query();
};
</script>

<style module lang="less">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 3rem;
  .tableCard {
    overflow: hidden;
    padding: 1rem 0;
    margin: 2rem 0;
    width: 100%;
    box-shadow: 0 0 10px blueviolet;
    border-radius: 2rem;
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
