<script setup lang="ts">
import {
  type InvoiceFormInitialValues,
  useInvoiceFormState,
} from "~/composables/useInvoiceFormState";
import ConfirmationDialog from "../../../../components/ConfirmationDialog.vue";
import InvoiceDetails from "../../../../components/InvoiceDetails.vue";
import StatusActionBar from "../../../../components/StatusActionBar.vue";

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
  items: Array<{
    name: string;
    quantity: number;
    price: string;
    total: string;
  }>;
  to: string;
};

const route = useRoute();
const invoiceId = String(route.params.id);
const { openEdit: openEditInvoiceForm } = useInvoiceFormState();
const isDeleteDialogOpen = ref(false);

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

const displayMonthMap: Record<string, number> = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

function parseDisplayDateToIso(value: string) {
  const match = /^(\d{1,2})\s([A-Za-z]{3})\s(\d{4})$/.exec(value.trim());

  if (!match) {
    return undefined;
  }

  const [, day, monthLabel, year] = match;
  const month = displayMonthMap[monthLabel];

  if (!month) {
    return undefined;
  }

  return `${year}-${`${month}`.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function normalizeCurrencyToInput(value: string) {
  return value.replace(/[^\d.-]/g, "");
}

function derivePaymentTerms(invoiceDateValue: string, paymentDueValue: string) {
  const invoiceDateIso = parseDisplayDateToIso(invoiceDateValue);
  const paymentDueIso = parseDisplayDateToIso(paymentDueValue);

  if (!invoiceDateIso || !paymentDueIso) {
    return undefined;
  }

  const invoiceDateObject = new Date(`${invoiceDateIso}T00:00:00Z`);
  const paymentDueObject = new Date(`${paymentDueIso}T00:00:00Z`);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const dayDelta = Math.round(
    (paymentDueObject.getTime() - invoiceDateObject.getTime()) /
      millisecondsPerDay,
  );

  return [1, 7, 14, 30].includes(dayDelta) ? `net-${dayDelta}` : undefined;
}

function mapInvoiceToFormValues(entry: Invoice): InvoiceFormInitialValues {
  return {
    billFromStreetAddress: entry.senderAddress.street,
    billFromCity: entry.senderAddress.city,
    billFromPostCode: entry.senderAddress.postCode,
    billFromCountry: entry.senderAddress.country,
    billToClientName: entry.clientName,
    billToClientEmail: entry.clientEmail,
    billToStreetAddress: entry.clientAddress.street,
    billToCity: entry.clientAddress.city,
    billToPostCode: entry.clientAddress.postCode,
    billToCountry: entry.clientAddress.country,
    invoiceDate: parseDisplayDateToIso(entry.invoiceDate),
    paymentTerms: derivePaymentTerms(entry.invoiceDate, entry.paymentDue),
    projectDescription: entry.title,
    lineItems: entry.items.map((item) => ({
      name: item.name,
      quantity: `${item.quantity}`,
      price: normalizeCurrencyToInput(item.price),
    })),
  };
}

function handleEdit() {
  openEditInvoiceForm(invoice.id, mapInvoiceToFormValues(invoice));
}

function openDeleteDialog() {
  isDeleteDialogOpen.value = true;
}

function closeDeleteDialog() {
  isDeleteDialogOpen.value = false;
}

function confirmDelete() {
  closeDeleteDialog();
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-182.5 flex-col gap-8">
    <header>
      <NuxtLink
        to="/demo"
        class="inline-flex items-center gap-6 text-brand-black transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary dark:text-white"
      >
        <img
          src="/icons/left-arrow.svg"
          alt=""
          aria-hidden="true"
          class="h-2.5 w-1.75"
        />
        <span class="preset-heading-s-variant">Go back</span>
      </NuxtLink>
    </header>

    <StatusActionBar
      :status="invoice.status"
      @delete="openDeleteDialog"
      @edit="handleEdit"
    />

    <InvoiceDetails
      :id="invoice.id"
      :title="invoice.title"
      :invoice-date="invoice.invoiceDate"
      :payment-due="invoice.paymentDue"
      :client-name="invoice.clientName"
      :client-email="invoice.clientEmail"
      :amount="invoice.amount"
      :sender-address="invoice.senderAddress"
      :client-address="invoice.clientAddress"
      :items="invoice.items"
    />

    <ConfirmationDialog
      :open="isDeleteDialogOpen"
      title="Confirm Deletion"
      :description="`Are you sure you want to delete invoice #${invoice.id}? This action cannot be undone.`"
      @cancel="closeDeleteDialog"
      @close="closeDeleteDialog"
      @confirm="confirmDelete"
    />
  </div>
</template>
