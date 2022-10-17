<template>
<div :class="$style.aside"></div>
</template>

<script setup>
import {} from 'vue'
</script>

<style module lang='less'>
.aside {
  position: fixed;
  top: 3.5em;
  bottom: 0;
  left: 0;
  width: 13rem;
  background-color: red;
}
</style>