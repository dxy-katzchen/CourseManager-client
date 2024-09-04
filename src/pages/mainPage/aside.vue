<template>
  <div :class="$style.aside">
    <el-menu
      router
      default-active="2"
      :class="$style.menu"
      background-color="transparent"
    >
      <el-sub-menu index="1">
        <template #title>
          <span>课程相关</span>
        </template>
        <el-menu-item index="/courseTable">课程列表</el-menu-item>
        <el-menu-item index="/studentCourseList" v-if="role === 1"
          >我选的课</el-menu-item
        >
        <el-menu-item index="/teacherCourseList" v-if="role === 2"
          >我教的课</el-menu-item
        >
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
import { useInfoStore } from "@/store";

const userInfo = useInfoStore();
const { role } = userInfo.user;
</script>

<style module lang="less">
.aside {
  position: fixed;
  top: 3.5em;
  bottom: 1rem;
  left: 1rem;
  width: 13rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  overflow: hidden;
  padding-top:0.2rem;
  .menu {
    height: 100%;
   
  }
}
</style>
<style lang="less"  scoped>
:deep(.el-menu-item:hover) {
  background-color: rgba(255, 255, 255, 0.6) !important;
  transition: all .3s;
}
</style>
