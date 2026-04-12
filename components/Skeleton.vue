<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "invoice-item";
    count?: number;
  }>(),
  {
    variant: "invoice-item",
    count: 1,
  },
);
</script>

<template>
  <template v-if="variant === 'invoice-item'">
    <div
      v-for="n in count"
      :key="n"
      class="grid grid-cols-2 animate-pulse rounded-lg bg-white p-6 shadow-[0_10px_10px_-10px_rgba(72,84,159,0.100397)] border border-transparent sm:grid-cols-[auto_auto_minmax(0,1fr)_auto_104px_auto] sm:items-center sm:gap-x-6 sm:px-8 sm:py-[14.5px] md:max-xl:gap-x-5 md:max-xl:px-6 md:max-xl:py-6 dark:bg-brand-dark"
      role="status"
      :aria-label="`Loading invoice ${n}`"
    >
      <!-- ID skeleton -->
      <div class="col-start-1 row-start-1 sm:col-auto sm:row-auto">
        <div
          class="h-4 w-16 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
        />
      </div>

      <!-- Due date skeleton -->
      <div class="col-start-1 row-start-2 mt-6 sm:mt-0 sm:col-auto sm:row-auto">
        <div
          class="h-3 w-28 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
        />
      </div>

      <!-- Client name skeleton -->
      <div
        class="col-start-2 row-start-1 justify-self-end sm:justify-self-auto sm:col-auto sm:row-auto"
      >
        <div
          class="h-3 w-24 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
        />
      </div>

      <!-- Amount skeleton -->
      <div class="col-start-1 row-start-3 mt-2 sm:mt-0 sm:col-auto sm:row-auto">
        <div
          class="h-4 w-20 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
        />
      </div>

      <!-- Status badge skeleton -->
      <div
        class="col-start-2 row-start-2 row-span-2 mt-6 sm:mt-0 self-center justify-self-end sm:col-auto sm:row-auto"
      >
        <div
          class="h-10 w-[104px] rounded-md bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
        />
      </div>

      <!-- Chevron skeleton -->
      <div
        class="hidden sm:flex h-6 w-6 justify-self-end items-center justify-center"
      >
        <div
          class="h-3 w-2 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
        />
      </div>
    </div>
  </template>
</template>
