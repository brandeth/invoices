<script setup lang="ts">
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <NuxtRouteAnnouncer />
    <main
      class="mx-auto flex min-h-screen max-w-4xl items-start justify-center px-6 py-10 sm:px-8"
    >
      <section
        class="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <header class="border-b border-slate-200 pb-5">
          <p
            class="text-xs font-medium uppercase tracking-[0.2em] text-slate-500"
          >
            Typography Preset Specimen
          </p>
          <h1 class="mt-3 text-2xl font-semibold text-slate-900">
            Main app shell demo
          </h1>
          <p class="mt-2 max-w-2xl text-sm text-slate-600">
            Each sample below uses one of the existing preset classes from the
            shared stylesheet so you can verify the visual treatment in a
            neutral layout.
          </p>
        </header>

        <div class="mt-6 space-y-4">
          <article
            class="rounded-xl border border-slate-200 bg-white px-4 py-4 sm:px-5"
          >
            <p
              class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
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
            class="rounded-xl border border-slate-200 bg-brand-surface-dark px-4 py-4 sm:px-5"
          >
            <p
              class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
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
            class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 sm:px-5"
          >
            <p
              class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
            >
              .preset-heading-l
            </p>
            <p class="preset-heading-l mt-3 text-slate-900">
              Invoice dashboard overview
            </p>
          </article>

          <article
            class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 sm:px-5"
          >
            <p
              class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
            >
              .preset-heading-m
            </p>
            <p class="preset-heading-m mt-3 text-slate-900">
              Current billing period
            </p>
          </article>

          <article
            class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 sm:px-5"
          >
            <p
              class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
            >
              .preset-heading-s
            </p>
            <p class="preset-heading-s mt-3 text-slate-900">
              Draft invoices awaiting review
            </p>
          </article>

          <article
            class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 sm:px-5"
          >
            <p
              class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
            >
              .preset-heading-s-variant
            </p>
            <p class="preset-heading-s-variant mt-3 text-slate-900">
              Paid on 20 Mar 2026
            </p>
          </article>

          <article
            class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 sm:px-5"
          >
            <p
              class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
            >
              .preset-body
            </p>
            <p class="preset-body mt-3 max-w-2xl text-slate-700">
              Use this sample to confirm the primary body preset remains
              readable for short descriptive copy, helper text, and compact
              interface content.
            </p>
          </article>

          <article
            class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 sm:px-5"
          >
            <p
              class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
            >
              .preset-body-variant
            </p>
            <p class="preset-body-variant mt-3 text-slate-700">
              Ref: INV-2026-031 | Status: Pending | Terms: Net 14
            </p>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>
