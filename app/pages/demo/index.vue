<script setup lang="ts">
import { useDemoInvoices } from "~/composables/useDemoInvoices";
import EmptyState from "../../../components/EmptyState.vue";
import InvoiceItem from "../../../components/InvoiceItem.vue";
import InvoicesHeader from "../../../components/InvoicesHeader.vue";
import Skeleton from "../../../components/Skeleton.vue";

definePageMeta({ layout: "demo" });

const { invoices } = useDemoInvoices();

const isHydrated = ref(false);
onMounted(() => {
  isHydrated.value = true;
});

const isLoading = computed(() => !isHydrated.value);
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
const hasInvoicesToDisplay = computed(() => filteredInvoices.value.length > 0);
</script>

<template>
  <div
    class="mx-auto w-full max-w-182.5 space-y-8 sm:space-y-16 md:max-xl:max-w-[42rem] md:max-xl:space-y-14"
  >
    <InvoicesHeader
      :total-invoices="totalInvoices"
      :selected-statuses="selectedStatuses"
      @update:selected-statuses="selectedStatuses = $event"
    />

    <section class="space-y-4" aria-label="Invoices list">
      <Skeleton v-if="isLoading" variant="invoice-item" :count="5" />

      <template v-else-if="hasInvoicesToDisplay">
        <InvoiceItem
          v-for="invoice in filteredInvoices"
          :key="invoice.id"
          :id="invoice.id"
          :due-date="invoice.dueDate"
          :client-name="invoice.clientName"
          :amount="invoice.amount"
          :status="invoice.status"
          :to="`/demo/invoices/${invoice.id}`"
        />
      </template>

      <div
        v-else
        class="flex min-h-[calc(100vh-16rem)] items-center justify-center"
      >
        <EmptyState />
      </div>
    </section>
  </div>
</template>
