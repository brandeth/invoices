<script setup lang="ts">
import Button from "./Button.vue";
import InvoiceStatusBadge from "./InvoiceStatusBadge.vue";

type InvoiceStatus = "paid" | "pending" | "draft";

const props = withDefaults(
  defineProps<{
    status: InvoiceStatus;
    paymentStatusActionLoading?: boolean;
  }>(),
  {
    paymentStatusActionLoading: false,
  },
);

const paymentStatusActionLabel = computed(() => {
  if (props.status === "pending") {
    return "Mark as Paid";
  }

  if (props.status === "paid") {
    return "Mark as Pending";
  }

  return undefined;
});

const paymentStatusActionVariant = computed(() => "default");

defineEmits<{
  edit: [];
  delete: [];
  paymentStatusAction: [];
}>();
</script>

<template>
  <section
    class="flex h-22 items-center justify-between rounded-lg bg-white px-6 sm:px-8 shadow-md dark:bg-brand-dark"
    aria-label="Invoice status and actions"
  >
    <div
      class="flex w-full items-center justify-between sm:w-auto sm:justify-start gap-5"
    >
      <span
        class="preset-body-variant text-[#858bb2] dark:text-brand-muted-light"
        >Status</span
      >
      <InvoiceStatusBadge :status="props.status" />
    </div>

    <div class="hidden sm:flex items-center gap-2">
      <Button variant="secondary" @click="$emit('edit')">Edit</Button>
      <Button variant="danger" @click="$emit('delete')">Delete</Button>
      <Button
        v-if="paymentStatusActionLabel"
        :variant="paymentStatusActionVariant"
        :disabled="props.paymentStatusActionLoading"
        @click="$emit('paymentStatusAction')"
      >
        {{ paymentStatusActionLabel }}
      </Button>
    </div>
  </section>

  <!-- Mobile-only fixed bottom action bar -->
  <div
    class="fixed bottom-0 left-0 right-0 flex items-center gap-2 bg-white px-6 py-5 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.15)] dark:bg-brand-dark sm:hidden"
  >
    <Button
      class="flex-auto justify-center"
      variant="secondary"
      @click="$emit('edit')"
      >Edit</Button
    >
    <Button
      class="flex-auto justify-center"
      variant="danger"
      @click="$emit('delete')"
      >Delete</Button
    >
    <Button
      v-if="paymentStatusActionLabel"
      class="flex-auto justify-center"
      :variant="paymentStatusActionVariant"
      :disabled="props.paymentStatusActionLoading"
      @click="$emit('paymentStatusAction')"
    >
      {{ paymentStatusActionLabel }}
    </Button>
  </div>
</template>
