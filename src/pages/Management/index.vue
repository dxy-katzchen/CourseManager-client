<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane
        v-for="article in articleList"
        :class="$style.pane"
        :key="article"
        :label="article.label"
        :name="article.id"
        ><ArticleList :type="article.id" :isActive="activeName === article.id"
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import ArticleList from "./articleList.vue";

const activeName = ref(1);
const articleList = reactive([
  { label: "社会实践", id: 1 },
  { label: "课外活动", id: 2 },
  { label: "研究成果", id: 3 },
]);
</script>

<style module lang="less">
.pane {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
<style lang="less" scoped>
:deep(.el-tabs__item)  {
  background: rgba(255, 255, 255, 0.5)
}

</style>
