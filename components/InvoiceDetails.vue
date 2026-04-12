<script setup lang="ts">
import InvoiceSummaryTable from "./InvoiceSummaryTable.vue";

defineProps<{
  id: string;
  title: string;
  invoiceDate: string;
  paymentDue: string;
  clientName: string;
  clientEmail: string;
  amount: string;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: string;
    total: string;
  }>;
}>();
</script>

<template>
  <section
    class="rounded-[8px] bg-white px-6 py-6 shadow-md dark:bg-brand-dark sm:px-[48px] sm:py-[48px]"
    aria-label="Invoice details"
  >
    <div
      class="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between"
    >
      <div class="min-w-0 space-y-2">
        <p class="preset-heading-s-variant text-brand-black dark:text-white">
          <span class="text-brand-muted-dark">#</span>{{ id }}
        </p>
        <p
          class="preset-body-variant text-brand-muted-dark dark:text-brand-muted-light"
        >
          {{ title }}
        </p>
      </div>

      <address
        class="preset-body flex shrink-0 flex-col items-start text-left not-italic text-brand-muted-dark dark:text-brand-muted-light sm:items-end sm:text-right"
      >
        <p>{{ senderAddress.street }}</p>
        <p>{{ senderAddress.city }}</p>
        <p>{{ senderAddress.postCode }}</p>
        <p>{{ senderAddress.country }}</p>
      </address>
    </div>

    <div class="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
      <div class="space-y-8">
        <div class="space-y-3">
          <p
            class="preset-body-variant text-brand-muted-dark dark:text-brand-muted-light"
          >
            Invoice Date
          </p>
          <p class="preset-heading-s text-brand-black dark:text-white">
            {{ invoiceDate }}
          </p>
        </div>

        <div class="space-y-3">
          <p
            class="preset-body-variant text-brand-muted-dark dark:text-brand-muted-light"
          >
            Payment Due
          </p>
          <p class="preset-heading-s text-brand-black dark:text-white">
            {{ paymentDue }}
          </p>
        </div>
      </div>

      <div class="space-y-3">
        <p
          class="preset-body-variant text-brand-muted-dark dark:text-brand-muted-light"
        >
          Bill To
        </p>
        <div class="space-y-1">
          <p class="preset-heading-s text-brand-black dark:text-white">
            {{ clientName }}
          </p>
          <address
            class="preset-body not-italic text-brand-muted-dark dark:text-brand-muted-light"
          >
            <p>{{ clientAddress.street }}</p>
            <p>{{ clientAddress.city }}</p>
            <p>{{ clientAddress.postCode }}</p>
            <p>{{ clientAddress.country }}</p>
          </address>
        </div>
      </div>

      <div class="space-y-3">
        <p
          class="preset-body-variant text-brand-muted-dark dark:text-brand-muted-light"
        >
          Sent to
        </p>
        <p
          class="preset-heading-s break-words text-brand-black dark:text-white"
        >
          {{ clientEmail }}
        </p>
      </div>
    </div>

    <div class="mt-12">
      <InvoiceSummaryTable :items="items" :amount-due="amount" />
    </div>
  </section>
</template>
