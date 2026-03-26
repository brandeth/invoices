<script setup lang="ts">
import Button from "./Button.vue";
import InvoiceStatusBadge from "./InvoiceStatusBadge.vue";

type InvoiceStatus = "paid" | "pending" | "draft";

defineProps<{
  status: InvoiceStatus;
}>();

defineEmits<{
  edit: [];
  delete: [];
}>();
</script>

<template>
  <section
    class="flex h-[88px] items-center justify-between rounded-[8px] bg-white px-8 shadow-md dark:bg-brand-dark"
    aria-label="Invoice status and actions"
  >
    <div class="flex items-center gap-5">
      <span
        class="preset-body-variant text-[#858bb2] dark:text-brand-muted-light"
        >Status</span
      >
      <InvoiceStatusBadge :status="status" />
    </div>

    <div class="flex items-center gap-2">
      <Button variant="secondary" @click="$emit('edit')">Edit</Button>
      <Button variant="danger" @click="$emit('delete')">Delete</Button>
      <Button>Mark as Paid</Button>
    </div>
  </section>
</template>
