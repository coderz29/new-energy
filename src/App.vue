<script setup>
import { RouterView } from 'vue-router'
import useScalePage from '@/hooks/useScalePage'
const options = {
  targetX:1920,
  targetY:1080,
  targetRatio: 16 / 9
}
// 大屏适配
useScalePage(options)
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
