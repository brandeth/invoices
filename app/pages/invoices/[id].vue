<script setup lang="ts">
import InvoiceDetails from "../../../components/InvoiceDetails.vue";
import StatusActionBar from "../../../components/StatusActionBar.vue";

type Invoice = {
  id: string;
  title: string;
  invoiceDate: string;
  paymentDue: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  amount: string;
  status: "paid" | "pending" | "draft";
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
  to: string;
};

const route = useRoute();
const invoiceId = String(route.params.id);

const { data: invoices } = await useFetch<Invoice[]>("/api/invoices", {
  default: () => [],
});

const invoice = invoices.value.find((entry) => entry.id === invoiceId);

if (!invoice) {
  throw createError({
    statusCode: 404,
    statusMessage: "Invoice not found",
  });
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-182.5 flex-col gap-8">
    <header>
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-6 text-brand-black transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary dark:text-white"
      >
        <img src="/icons/left-arrow.svg" alt="" aria-hidden="true" class="h-2.5 w-1.75" />
        <span class="preset-heading-s-variant">Go back</span>
      </NuxtLink>
    </header>

    <StatusActionBar :status="invoice.status" />

    <InvoiceDetails
      :id="invoice.id"
      :title="invoice.title"
      :invoice-date="invoice.invoiceDate"
      :payment-due="invoice.paymentDue"
      :client-name="invoice.clientName"
      :client-email="invoice.clientEmail"
      :sender-address="invoice.senderAddress"
      :client-address="invoice.clientAddress"
    />
  </div>
</template>