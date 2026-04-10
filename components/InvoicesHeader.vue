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

const isSmScreen = ref(true);

onMounted(() => {
  const mql = window.matchMedia("(min-width: 640px)");
  isSmScreen.value = mql.matches;
  const handler = (e: MediaQueryListEvent) => {
    isSmScreen.value = e.matches;
  };
  mql.addEventListener("change", handler);
  onBeforeUnmount(() => mql.removeEventListener("change", handler));
});

const filterPlaceholder = computed(() =>
  isSmScreen.value ? "Filter by status" : "Filter",
);

function handleSelectedStatusesUpdate(value: string | string[]) {
  if (Array.isArray(value)) {
    emit("update:selectedStatuses", value);
  }
}
</script>

<template>
  <header class="w-full max-w-182.5 bg-transparent">
    <div class="flex items-center justify-between gap-4 md:max-xl:gap-10">
      <div class="min-w-0">
        <h1
          class="preset-heading-m sm:preset-heading-l text-brand-black dark:text-white"
        >
          Invoices
        </h1>
        <p
          class="preset-body mt-2 text-brand-muted dark:preset-body-variant dark:text-brand-muted-light"
        >
          <span class="hidden sm:inline">There are </span
          >{{ props.totalInvoices
          }}<span class="hidden sm:inline"> total</span> invoices
        </p>
      </div>

      <div class="flex items-center gap-4 md:max-xl:gap-5">
        <Dropdown
          :model-value="props.selectedStatuses"
          :options="statusOptions"
          variant="status-filter"
          multiple
          :placeholder="filterPlaceholder"
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
          New<span class="hidden sm:inline">&nbsp;Invoice</span>
        </Button>
      </div>
    </div>
  </header>
</template>
