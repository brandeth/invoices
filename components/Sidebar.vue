<script setup lang="ts">
import { Sun } from "@lucide/vue";

defineProps<{
  isDark: boolean;
}>();

const emit = defineEmits<{
  toggleTheme: [];
}>();
</script>

<template>
  <aside
    class="sticky top-0 flex h-screen w-25.75 shrink-0 flex-col overflow-hidden rounded-r-[20px] max-xl:h-20 max-xl:w-full max-xl:flex-row max-xl:items-stretch max-xl:justify-between max-xl:rounded-none"
    :class="isDark ? 'bg-brand-dark' : 'bg-[#373b53]'"
    aria-label="Sidebar"
  >
    <div
      class="relative h-25.75 w-25.75 overflow-hidden rounded-r-[20px] max-xl:h-20 max-xl:w-20 max-xl:rounded-r-[20px]"
    >
      <div class="absolute inset-x-0 top-0 h-full bg-brand-primary" />
      <div
        class="absolute inset-x-0 bottom-0 h-1/2 rounded-tl-[20px] bg-brand-primary-light"
      />

      <div class="relative flex h-full w-full items-center justify-center">
        <img
          src="/icons/logo-light.svg"
          alt="Invoices logo"
          class="h-10 w-10 max-xl:h-8 max-xl:w-8"
        />
      </div>
    </div>

    <div
      class="mt-auto flex flex-col max-xl:mt-0 max-xl:ml-auto max-xl:flex-row max-xl:items-center"
    >
      <div
        class="flex items-center justify-center py-6 max-xl:h-full max-xl:px-4 sm:max-xl:px-8 max-xl:py-0"
      >
        <button
          type="button"
          class="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          :aria-pressed="isDark"
          @click="emit('toggleTheme')"
        >
          <Sun
            v-if="isDark"
            :size="20"
            color="var(--color-brand-muted-dark)"
            aria-hidden="true"
          />
          <img
            v-else
            src="/icons/moon.svg"
            alt=""
            class="h-5 w-5"
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        class="flex items-center justify-center border-t border-[#494e6e] py-6 max-xl:h-full max-xl:border-t-0 max-xl:border-l max-xl:px-4 sm:max-xl:px-6 max-xl:py-0"
      >
        <img
          src="/images/profile-picture.jpg"
          alt="User profile picture"
          class="h-10 w-10 rounded-full object-cover"
        />
      </div>
    </div>
  </aside>
</template>
