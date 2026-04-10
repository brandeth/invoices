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
  <NuxtLink
    :to="props.to"
    class="grid grid-cols-2 rounded-lg bg-white p-6 no-underline shadow-[0_10px_10px_-10px_rgba(72,84,159,0.100397)] transition-[border-color] border border-transparent hover:border-brand-primary sm:grid-cols-[auto_auto_minmax(0,1fr)_auto_104px_auto] sm:items-center sm:gap-x-6 sm:px-8 sm:py-[14.5px] md:max-xl:gap-x-5 md:max-xl:px-6 md:max-xl:py-6 dark:bg-brand-dark"
    :aria-label="`View invoice ${props.id}`"
  >
    <p
      class="col-start-1 row-start-1 sm:col-auto sm:row-auto preset-heading-s-variant whitespace-nowrap text-brand-black dark:text-white"
    >
      <span class="text-brand-muted-dark">#</span>{{ props.id }}
    </p>

    <p
      class="col-start-1 row-start-2 mt-6 sm:mt-0 sm:col-auto sm:row-auto preset-body-variant whitespace-nowrap text-brand-muted-dark dark:text-brand-muted-light"
    >
      <span class="text-brand-muted dark:text-brand-muted">Due </span
      >{{ props.dueDate }}
    </p>

    <p
      class="col-start-2 row-start-1 justify-self-end sm:justify-self-auto sm:col-auto sm:row-auto preset-body-variant min-w-0 truncate text-[#858bb2] dark:text-brand-muted-light"
    >
      {{ props.clientName }}
    </p>

    <p
      class="col-start-1 row-start-3 mt-2 sm:mt-0 sm:col-auto sm:row-auto preset-heading-s whitespace-nowrap text-brand-black dark:text-white"
    >
      {{ props.amount }}
    </p>

    <InvoiceStatusBadge
      :status="props.status"
      class="col-start-2 row-start-2 row-span-2 mt-6 sm:mt-0 self-center justify-self-end sm:col-auto sm:row-auto"
    />

    <span
      class="hidden sm:flex h-6 w-6 justify-self-end items-center justify-center text-brand-muted-dark"
      aria-hidden="true"
    >
      <img src="/icons/right-arrow.svg" alt="" class="h-3 w-2" />
    </span>
  </NuxtLink>
</template>
