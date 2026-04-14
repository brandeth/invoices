<script setup lang="ts">
const isDark = useState<boolean>("color-theme", () => false);
const route = useRoute();

useHead(() => {
  const pageTitle = route.meta.title;

  return {
    title: typeof pageTitle === "string" ? pageTitle : undefined,
    titleTemplate: (title) => (title ? `Invoices - ${title}` : "Invoices"),
  };
});

watchEffect(() => {
  if (!import.meta.client) {
    return;
  }

  document.documentElement.classList.toggle("dark", isDark.value);
});
</script>

<template>
  <div
    class="h-screen overflow-hidden bg-brand-background text-brand-black dark:bg-brand-surface-dark dark:text-white"
  >
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
