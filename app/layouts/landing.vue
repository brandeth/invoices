<script setup lang="ts">
const scrollContainerRef = ref<HTMLElement | null>(null);
provide('landing-scroll-container', scrollContainerRef);
</script>

<template>
  <div ref="scrollContainerRef" class="h-full overflow-y-auto">
    <slot />
  </div>
</template>
