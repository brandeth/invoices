<script setup lang="ts">
type InvoiceStatus = "paid" | "pending" | "draft";

const props = defineProps<{
  status: InvoiceStatus;
}>();

const statusClassMap: Record<InvoiceStatus, string> = {
  paid: "bg-[#33d69f]/6 text-[#33d69f] dark:bg-[#33d69f]/10",
  pending: "bg-[#ff8f00]/6 text-[#ff8f00] dark:bg-[#ff8f00]/10",
  draft: "bg-[#373b53]/6 text-[#373b53] dark:bg-brand-muted-light/6 dark:text-brand-muted-light",
};

const statusDotClassMap: Record<InvoiceStatus, string> = {
  paid: "bg-[#33d69f]",
  pending: "bg-[#ff8f00]",
  draft: "bg-[#373b53] dark:bg-brand-muted-light",
};

const statusLabelMap: Record<InvoiceStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  draft: "Draft",
};
</script>

<template>
  <div
    class="inline-flex w-full max-w-[104px] items-center justify-center gap-2 rounded-[6px] px-[30px] py-[14px]"
    :class="statusClassMap[props.status]"
  >
    <span
      :class="['inline-block h-2 w-2 shrink-0 rounded-full', statusDotClassMap[props.status]]"
      aria-hidden="true"
    />
    <span class="preset-heading-s-variant">{{ statusLabelMap[props.status] }}</span>
  </div>
</template>