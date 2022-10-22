<template>
  <div :class="$style.top">
    <i
      class="iconfont icon-zuojiantou_huaban"
      @click="router.back(-1)"
      :class="$style.leftIcon"
    ></i>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["mid"]);

const router = useRouter();
// const mid = ref(route.params.mid);
onMounted(() => {
  console.log(props.mid);
});
</script>

<style module lang="less">
.top {
  background: url("https://s2.loli.net/2022/10/22/ptmb9gEkLQfOl7B.png") no-repeat;
  position: fixed;
  top: 0;
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  box-sizing: border-box;
  line-height: 3.5rem;
  display: flex;

  color: #fff;

  .leftIcon {
    font-size: 2rem;
    cursor: pointer;
  }
}
</style>
