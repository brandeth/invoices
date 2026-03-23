<script setup lang="ts">
import InvoiceStatusBadge from "./InvoiceStatusBadge.vue";

type InvoiceStatus = "paid" | "pending" | "draft";

const props = defineProps<{
  id: string;
  dueDate: string;
  clientName: string;
  amount: string;
  status: InvoiceStatus;
  to: string;
}>();
</script>

<template>
  <article
    class="grid grid-cols-[auto_auto_1fr_auto_104px_auto] items-center gap-x-6 rounded-lg bg-white px-8 pt-[14.5px] pb-[14.5px] shadow-[0_10px_10px_-10px_rgba(72,84,159,0.100397)] dark:bg-brand-dark"
  >
    <p class="preset-heading-s-variant whitespace-nowrap text-brand-black dark:text-white">
      <span class="text-brand-muted-dark">#</span>{{ props.id }}
    </p>

    <p class="preset-body-variant whitespace-nowrap text-brand-muted-dark dark:text-brand-muted-light">
      <span class="text-brand-muted dark:text-brand-muted">Due </span>{{ props.dueDate }}
    </p>

    <p class="preset-body-variant min-w-0 truncate text-[#858bb2] dark:text-brand-muted-light">
      {{ props.clientName }}
    </p>

    <p class="preset-heading-s whitespace-nowrap text-brand-black dark:text-white">
      {{ props.amount }}
    </p>

    <InvoiceStatusBadge :status="props.status" />

    <NuxtLink
      :to="props.to"
      class="flex h-6 w-6 items-center justify-center text-brand-muted-dark transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      :aria-label="`View invoice ${props.id}`"
    >
      <img src="/icons/right-arrow.svg" alt="" aria-hidden="true" class="h-3 w-2" />
    </NuxtLink>
  </article>
</template>