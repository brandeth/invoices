<script setup lang="ts">
import Button from "../components/Button.vue";
import DatePicker from "../components/DatePicker.vue";
import Dropdown from "../components/Dropdown.vue";
import Input from "../components/Input.vue";
import Sidebar from "../components/Sidebar.vue";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Draft", value: "draft" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
];

const selectedStatus = ref<string>();
const selectedInvoiceDate = ref<string>();
const isDark = useState("color-theme", () => false);

watchEffect(() => {
  if (!import.meta.client) {
    return;
  }

  document.documentElement.classList.toggle("dark", isDark.value);
});

function toggleTheme() {
  isDark.value = !isDark.value;
}
</script>

<template>
  <div
    class="h-screen overflow-hidden bg-slate-100 text-slate-900 transition-colors dark:bg-brand-surface-dark dark:text-white"
  >
    <NuxtRouteAnnouncer />
    <div class="flex h-screen items-start gap-6 sm:gap-8">
      <Sidebar :is-dark="isDark" @toggle-theme="toggleTheme" />

      <main class="h-full w-full overflow-y-auto px-6 py-10 sm:px-8">
        <div class="max-w-4xl justify-center mx-auto">
          <section
            class="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-brand-dark-light dark:bg-brand-dark sm:p-8"
          >
            <header
              class="border-b border-slate-200 pb-5 dark:border-[#494e6e]"
            >
              <p
                class="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-brand-muted-light"
              >
                Typography Preset Specimen
              </p>
              <h1
                class="mt-3 text-2xl font-semibold text-slate-900 dark:text-white"
              >
                Main app shell demo
              </h1>
              <p
                class="mt-2 max-w-2xl text-sm text-slate-600 dark:text-brand-muted-light"
              >
                Each sample below uses one of the existing preset classes from
                the shared stylesheet so you can verify the visual treatment in
                a neutral layout.
              </p>
            </header>

            <div class="mt-6 space-y-4">
              <article
                class="rounded-xl border border-slate-200 bg-white px-4 py-4 transition-colors dark:border-brand-dark-light dark:bg-brand-surface-dark sm:px-5"
              >
                <p
                  class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-brand-muted-light"
                >
                  Button component demo
                </p>
                <div class="mt-4 flex flex-wrap gap-4">
                  <Button>
                    <template #icon>
                      <img
                        src="/icons/plus.svg"
                        alt=""
                        class="h-2.5 w-2.5"
                        aria-hidden="true"
                      />
                    </template>
                    New Invoice
                  </Button>

                  <Button variant="secondary"> Filter Invoices </Button>

                  <Button variant="neutral"> Save as Draft </Button>

                  <Button variant="danger"> Delete Invoice </Button>

                  <Button variant="tertiary">
                    <template #icon> + </template>
                    Add Payment Details
                  </Button>
                </div>
              </article>

              <article
                class="rounded-xl border border-slate-200 bg-white px-4 py-4 transition-colors dark:border-brand-dark-light dark:bg-brand-surface-dark sm:px-5"
              >
                <p
                  class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-brand-muted-light"
                >
                  Input component demo
                </p>
                <div class="mt-4 max-w-sm">
                  <Input
                    id="invoice-number"
                    label="Invoice Number"
                    name="invoiceNumber"
                    type="text"
                    placeholder="e.g. XM9141"
                    autocomplete="off"
                  />
                </div>
              </article>

              <article
                class="rounded-xl border border-slate-200 bg-white px-4 py-4 transition-colors dark:border-brand-dark-light dark:bg-brand-surface-dark sm:px-5"
              >
                <p
                  class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-brand-muted-light"
                >
                  Dropdown component demo
                </p>

                <div class="mt-4 max-w-sm space-y-3">
                  <Dropdown
                    v-model="selectedStatus"
                    label="Status"
                    :options="statusOptions"
                    placeholder="Filter by status"
                  />

                  <p
                    class="preset-body text-slate-600 dark:text-brand-muted-light"
                  >
                    Selected value:
                    <span class="text-slate-900 dark:text-white">{{
                      selectedStatus ?? "None"
                    }}</span>
                  </p>
                </div>
              </article>

              <article
                class="rounded-xl border border-slate-200 bg-white px-4 py-4 transition-colors dark:border-brand-dark-light dark:bg-brand-surface-dark sm:px-5"
              >
                <p
                  class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-brand-muted-light"
                >
                  DatePicker component demo
                </p>

                <div class="mt-4 max-w-sm space-y-3">
                  <DatePicker
                    v-model="selectedInvoiceDate"
                    label="Invoice Date"
                    placeholder="Select invoice date"
                  />

                  <p
                    class="preset-body text-slate-600 dark:text-brand-muted-light"
                  >
                    Selected value:
                    <span class="text-slate-900 dark:text-white">{{
                      selectedInvoiceDate ?? "None"
                    }}</span>
                  </p>
                </div>
              </article>

              <article
                class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 transition-colors dark:border-brand-dark-light dark:bg-brand-dark-light sm:px-5"
              >
                <p
                  class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-brand-muted-light"
                >
                  .preset-heading-l
                </p>
                <p class="preset-heading-l mt-3 text-slate-900 dark:text-white">
                  Invoice dashboard overview
                </p>
              </article>

              <article
                class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 transition-colors dark:border-brand-dark-light dark:bg-brand-dark-light sm:px-5"
              >
                <p
                  class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-brand-muted-light"
                >
                  .preset-heading-m
                </p>
                <p class="preset-heading-m mt-3 text-slate-900 dark:text-white">
                  Current billing period
                </p>
              </article>

              <article
                class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 transition-colors dark:border-brand-dark-light dark:bg-brand-dark-light sm:px-5"
              >
                <p
                  class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-brand-muted-light"
                >
                  .preset-heading-s
                </p>
                <p class="preset-heading-s mt-3 text-slate-900 dark:text-white">
                  Draft invoices awaiting review
                </p>
              </article>

              <article
                class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 transition-colors dark:border-brand-dark-light dark:bg-brand-dark-light sm:px-5"
              >
                <p
                  class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-brand-muted-light"
                >
                  .preset-heading-s-variant
                </p>
                <p
                  class="preset-heading-s-variant mt-3 text-slate-900 dark:text-white"
                >
                  Paid on 20 Mar 2026
                </p>
              </article>

              <article
                class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 transition-colors dark:border-brand-dark-light dark:bg-brand-dark-light sm:px-5"
              >
                <p
                  class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-brand-muted-light"
                >
                  .preset-body
                </p>
                <p
                  class="preset-body mt-3 max-w-2xl text-slate-700 dark:text-brand-muted-light"
                >
                  Use this sample to confirm the primary body preset remains
                  readable for short descriptive copy, helper text, and compact
                  interface content.
                </p>
              </article>

              <article
                class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 transition-colors dark:border-brand-dark-light dark:bg-brand-dark-light sm:px-5"
              >
                <p
                  class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-brand-muted-light"
                >
                  .preset-body-variant
                </p>
                <p
                  class="preset-body-variant mt-3 text-slate-700 dark:text-brand-muted-light"
                >
                  Ref: INV-2026-031 | Status: Pending | Terms: Net 14
                </p>
              </article>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>
