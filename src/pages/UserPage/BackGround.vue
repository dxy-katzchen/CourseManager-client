<template>
  <div ref="userBg" :class="$style.userBg">
    <slot></slot>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const userBg = ref(null);

let effect = null;

onMounted(() => {
  effect = VANTA.GLOBE({
    el: userBg.value,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
  });
});

onUnmounted(() => {
  if (effect) {
    effect.destroy();
  }
});
</script>

<style module lang="less">
.userBg {
  
  width: 100vw;
  height: 85vh;
  
  

}
</style>
