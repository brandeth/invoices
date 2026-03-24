<script setup lang="ts">
import Button from "./Button.vue";
import Dropdown from "./Dropdown.vue";

const isInvoiceFormOpen = useState<boolean>("invoice-form-open", () => false);

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

function openInvoiceForm() {
  isInvoiceFormOpen.value = true;
}
</script>

<template>
  <header class="w-full max-w-182.5 bg-transparent">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-center">
      <div>
        <h1 class="preset-heading-l text-brand-black dark:text-white">
          Invoices
        </h1>
        <p
          class="preset-body mt-2 text-brand-muted dark:preset-body-variant dark:text-brand-muted-light"
        >
          There are {{ props.totalInvoices }} of invoices
        </p>
      </div>

      <div class="flex items-center justify-start gap-4 sm:justify-end">
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
