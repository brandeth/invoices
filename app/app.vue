<script setup lang="ts">
import Sidebar from "../components/Sidebar.vue";

const isDark = useState<boolean>("color-theme", () => false);

watchEffect(() => {
  if (!import.meta.client) {
    return;
  }

  document.documentElement.classList.toggle("dark", isDark.value);
});

function toggleTheme() {
  isDark.value = !isDark.value;
}
</script>

<template>
  <div
    class="h-screen overflow-hidden bg-brand-background text-brand-black dark:bg-brand-surface-dark dark:text-white"
  >
    <NuxtRouteAnnouncer />

    <div class="flex h-full gap-6 sm:gap-8">
      <Sidebar :is-dark="isDark" @toggle-theme="toggleTheme" />

      <main class="min-w-0 flex-1 overflow-y-auto px-6 py-10 sm:px-8">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>
