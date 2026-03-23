<script setup lang="ts">
import InvoiceItem from "../components/InvoiceItem.vue";
import InvoicesHeader from "../components/InvoicesHeader.vue";
import Sidebar from "../components/Sidebar.vue";

type Invoice = {
  id: string;
  dueDate: string;
  clientName: string;
  amount: string;
  status: "paid" | "pending" | "draft";
  to: string;
};

const { data: invoices } = await useFetch<Invoice[]>("/api/invoices", {
  default: () => [],
});

const selectedStatuses = ref<string[]>([]);
const totalInvoices = computed(() => invoices.value.length);
const filteredInvoices = computed(() => {
  if (selectedStatuses.value.length === 0) {
    return invoices.value;
  }

  return invoices.value.filter((invoice) =>
    selectedStatuses.value.includes(invoice.status),
  );
});
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
        <div class="mx-auto w-full max-w-182.5 space-y-16">
          <InvoicesHeader
            :total-invoices="totalInvoices"
            :selected-statuses="selectedStatuses"
            @update:selected-statuses="selectedStatuses = $event"
          />

          <section class="space-y-4" aria-label="Invoices list">
            <InvoiceItem
              v-for="invoice in filteredInvoices"
              :key="invoice.id"
              :id="invoice.id"
              :due-date="invoice.dueDate"
              :client-name="invoice.clientName"
              :amount="invoice.amount"
              :status="invoice.status"
              :to="invoice.to"
            />
          </section>
        </div>
      </main>
    </div>
  </div>
</template>
