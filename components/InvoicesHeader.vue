<script setup lang="ts">
import { useInvoiceFormState } from "~/composables/useInvoiceFormState";
import Button from "./Button.vue";
import Dropdown from "./Dropdown.vue";

const { openCreate: openInvoiceForm } = useInvoiceFormState();

const props = defineProps<{
  totalInvoices: number;
  selectedStatuses: string[];
}>();

const emit = defineEmits<{
  "update:selectedStatuses": [value: string[]];
}>();

const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
];

function handleSelectedStatusesUpdate(value: string | string[]) {
  if (Array.isArray(value)) {
    emit("update:selectedStatuses", value);
  }
}
</script>

<template>
  <header class="w-full max-w-182.5 bg-transparent">
    <div
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-center md:max-xl:grid-cols-[minmax(0,1fr)_1fr] md:max-xl:items-end md:max-xl:gap-10"
    >
      <div class="min-w-0">
        <h1 class="preset-heading-l text-brand-black dark:text-white">
          Invoices
        </h1>
        <p
          class="preset-body mt-2 text-brand-muted dark:preset-body-variant dark:text-brand-muted-light"
        >
          There are {{ props.totalInvoices }} of invoices
        </p>
      </div>

      <div
        class="flex items-center justify-start gap-4 sm:justify-end md:max-xl:shrink-0 md:max-xl:flex-nowrap md:max-xl:gap-5"
      >
        <Dropdown
          :model-value="props.selectedStatuses"
          :options="statusOptions"
          variant="status-filter"
          multiple
          placeholder="Filter by status"
          @update:model-value="handleSelectedStatusesUpdate"
        />

        <Button @click="openInvoiceForm">
          <template #icon>
            <img
              src="/icons/plus.svg"
              alt=""
              class="h-2.5 w-2.5"
              aria-hidden="true"
            />
          </template>
          New Invoice
        </Button>
      </div>
    </div>
  </header>
</template>
