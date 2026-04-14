<script setup lang="ts">
import {
  type InvoiceFormInitialValues,
  useInvoiceFormState,
} from "~/composables/useInvoiceFormState";
import {
  useDemoInvoices,
  type DemoInvoice,
} from "~/composables/useDemoInvoices";
import ConfirmationDialog from "../../../../components/ConfirmationDialog.vue";
import InvoiceDetails from "../../../../components/InvoiceDetails.vue";
import StatusActionBar from "../../../../components/StatusActionBar.vue";

definePageMeta({ layout: "demo" });

const route = useRoute();
const router = useRouter();
const invoiceId = String(route.params.id);

useSeoMeta({
  title: () => `Invoice #${String(route.params.id)}`,
});

const { openEdit: openEditInvoiceForm } = useInvoiceFormState();
const { getById, deleteInvoice, updateStatus, isStorageHydrated } =
  useDemoInvoices();
const isDeleteDialogOpen = ref(false);
const isPaymentStatusDialogOpen = ref(false);

const invoice = computed(() => getById(invoiceId));

function getNextPaymentStatus(status: DemoInvoice["status"]) {
  if (status === "pending") {
    return "paid";
  }

  if (status === "paid") {
    return "pending";
  }

  return undefined;
}

const paymentStatusActionTarget = computed(() =>
  invoice.value ? getNextPaymentStatus(invoice.value.status) : undefined,
);

const markPendingDescription = computed(() =>
  invoice.value
    ? `Are you sure you want to mark invoice #${invoice.value.id} as pending? This changes the payment status back from paid.`
    : "",
);

const isHydrated = ref(false);
const isPageReady = computed(() => isHydrated.value && isStorageHydrated.value);

function throwInvoiceNotFoundError() {
  throw createError({
    statusCode: 404,
    statusMessage: "Invoice not found",
  });
}

onMounted(() => {
  isHydrated.value = true;
});

watch(
  isPageReady,
  (ready) => {
    if (ready && !invoice.value) {
      throwInvoiceNotFoundError();
    }
  },
  { immediate: true },
);

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

function mapInvoiceToFormValues(entry: DemoInvoice): InvoiceFormInitialValues {
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
  if (!invoice.value) return;
  openEditInvoiceForm(invoice.value.id, mapInvoiceToFormValues(invoice.value));
}

function applyPaymentStatusAction() {
  const nextStatus = paymentStatusActionTarget.value;

  if (!invoice.value || !nextStatus) {
    return;
  }

  updateStatus(invoice.value.id, nextStatus);
}

function handlePaymentStatusAction() {
  if (!invoice.value || !paymentStatusActionTarget.value) {
    return;
  }

  if (invoice.value.status === "paid") {
    isPaymentStatusDialogOpen.value = true;
    return;
  }

  applyPaymentStatusAction();
}

function closePaymentStatusDialog() {
  isPaymentStatusDialogOpen.value = false;
}

function confirmPaymentStatusAction() {
  applyPaymentStatusAction();
  closePaymentStatusDialog();
}

function openDeleteDialog() {
  isDeleteDialogOpen.value = true;
}

function closeDeleteDialog() {
  isDeleteDialogOpen.value = false;
}

function confirmDelete() {
  deleteInvoice(invoiceId);
  closeDeleteDialog();
  router.push("/demo");
}
</script>

<template>
  <div
    v-if="!isPageReady"
    class="mx-auto flex w-full max-w-182.5 flex-col gap-8"
  >
    <div class="animate-pulse space-y-8">
      <!-- Back link skeleton -->
      <div
        class="h-4 w-20 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
      />
      <!-- Status bar skeleton -->
      <div
        class="flex h-22 items-center justify-between rounded-lg bg-white px-8 shadow-md dark:bg-brand-dark"
      >
        <div class="flex items-center gap-5">
          <div
            class="h-3 w-12 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
          />
          <div
            class="h-10 w-26 rounded-md bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
          />
        </div>
        <div class="flex items-center gap-2">
          <div
            class="h-12 w-18 rounded-full bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
          />
          <div
            class="h-12 w-22 rounded-full bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
          />
          <div
            class="h-12 w-32 rounded-full bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
          />
        </div>
      </div>
      <!-- Details card skeleton -->
      <div class="rounded-lg bg-white px-12 py-12 shadow-md dark:bg-brand-dark">
        <div class="flex items-start justify-between">
          <div class="space-y-2">
            <div
              class="h-4 w-20 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
            />
            <div
              class="h-3 w-32 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
            />
          </div>
          <div class="space-y-1.5 text-right">
            <div
              class="ml-auto h-3 w-40 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
            />
            <div
              class="ml-auto h-3 w-16 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
            />
            <div
              class="ml-auto h-3 w-20 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
            />
            <div
              class="ml-auto h-3 w-28 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
            />
          </div>
        </div>
        <div class="mt-10 grid grid-cols-3 gap-8">
          <div class="space-y-8">
            <div class="space-y-3">
              <div
                class="h-3 w-20 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
              />
              <div
                class="h-4 w-28 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
              />
            </div>
            <div class="space-y-3">
              <div
                class="h-3 w-22 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
              />
              <div
                class="h-4 w-28 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
              />
            </div>
          </div>
          <div class="space-y-3">
            <div
              class="h-3 w-12 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
            />
            <div
              class="h-4 w-28 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
            />
            <div class="mt-2 space-y-1.5">
              <div
                class="h-3 w-28 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
              />
              <div
                class="h-3 w-16 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
              />
              <div
                class="h-3 w-20 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
              />
              <div
                class="h-3 w-28 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
              />
            </div>
          </div>
          <div class="space-y-3">
            <div
              class="h-3 w-12 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
            />
            <div
              class="h-4 w-40 rounded bg-brand-muted-light/50 dark:bg-brand-muted-dark/30"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else-if="invoice"
    class="mx-auto flex w-full max-w-182.5 flex-col gap-8 pb-24 sm:pb-0"
  >
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
      @payment-status-action="handlePaymentStatusAction"
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
      :open="isPaymentStatusDialogOpen"
      title="Mark Invoice as Pending?"
      :description="markPendingDescription"
      confirm-label="Mark as Pending"
      confirm-button-variant="default"
      @cancel="closePaymentStatusDialog"
      @close="closePaymentStatusDialog"
      @confirm="confirmPaymentStatusAction"
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
