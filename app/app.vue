<script setup lang="ts">
import InvoicesHeader from "../components/InvoicesHeader.vue";
import Sidebar from "../components/Sidebar.vue";

const invoices = [
  { id: "RT3080", status: "paid" },
  { id: "XM9141", status: "pending" },
  { id: "RG0314", status: "draft" },
  { id: "RT2080", status: "paid" },
  { id: "AA1449", status: "pending" },
  { id: "TY9141", status: "draft" },
  { id: "FV2353", status: "paid" },
];

const selectedStatuses = ref<string[]>([]);
const totalInvoices = computed(() => invoices.length);
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
    class="min-h-screen overflow-hidden bg-brand-background text-brand-black dark:bg-brand-surface-dark dark:text-white"
  >
    <NuxtRouteAnnouncer />

    <div class="flex min-h-screen items-start gap-6 sm:gap-8">
      <Sidebar :is-dark="isDark" @toggle-theme="toggleTheme" />

      <main class="w-full overflow-y-auto min-h-screen px-6 py-10 sm:px-8">
        <div class="mx-auto w-full max-w-182.5">
          <InvoicesHeader
            :total-invoices="totalInvoices"
            :selected-statuses="selectedStatuses"
            @update:selected-statuses="selectedStatuses = $event"
          />
        </div>
      </main>
    </div>
  </div>
</template>
