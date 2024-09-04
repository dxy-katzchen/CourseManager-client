<template>
  <div ref="loginBg" :class="$style.loginBackGround">
    <slot></slot>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";

import { useDarkStore } from "@/store";
const darkStore = useDarkStore();

const loginBg = ref(null);

const darkOption = {
  baseColor: 0xd6d96,
  backgroundColor: 0x63c,
};
const lightOption = {
  baseColor: 0x0,
  backgroundColor: 0x3344e1,
};
let effect = null;

onMounted(() => {
  effect = VANTA.HALO({
    el: loginBg.value,

    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    xOffset: -0.21,
    baseColor: 0xd6d96,
    backgroundColor: 0x63c,
  });
});

watch(
  () => darkStore.isDark,
  (newval) => {
    effect.setOptions(newval === true ? darkOption : lightOption);
  }
);

onUnmounted(() => {
  if (effect) {
    effect.destroy();
  }
});
</script>

<style module lang="less">
.loginBackGround {
  z-index: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
