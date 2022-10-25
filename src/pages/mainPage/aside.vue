<template>
  <div :class="$style.aside">
    <el-menu router default-active="2" :class="$style.menu">
      <el-sub-menu index="1">
        <template #title>
          <span>课程相关</span>
        </template>
        <el-menu-item index="/courseTable">课程列表</el-menu-item>
        <el-menu-item index="/studentCourseList" v-if="role === 1">选课管理</el-menu-item>
        <el-menu-item index="1-3">选课管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <span>学工信息</span>
        </template>
        <el-menu-item index="/management">首页</el-menu-item>
        <template v-if="role === 3">
          <el-menu-item index="/editArticle">创建文章</el-menu-item>
          <el-menu-item index="/bin">回收站</el-menu-item>
        </template>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useInfoStore } from "@/store";

const userInfo = useInfoStore();
const role = ref(userInfo.user.role);
</script>

<style module lang="less">
.aside {
  position: fixed;
  top: 3.5em;
  bottom: 0;
  left: 0;
  width: 13rem;
  .menu {
    height: 100%;
  }
}
</style>
