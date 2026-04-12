<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";

const openIndex = ref<number | null>(null);

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index;
}

const faqs = [
  {
    question: "Is Invoices really free?",
    answer:
      "Yes. The core invoicing features are completely free. Create, manage, and track invoices without paying a cent.",
  },
  {
    question: "Do I need a credit card to sign up?",
    answer:
      "No. Just enter your email and password to create an account. That's it.",
  },
  {
    question: "Can I try it without creating an account?",
    answer:
      "Absolutely. Visit the demo mode to explore the full app with sample data — no sign-up required.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Your data is stored on Supabase with row-level security and encrypted at rest. Only you can access your invoices.",
  },
  {
    question: "Can I use it on my phone?",
    answer:
      "Yes. Invoices is fully responsive and works on any screen size — desktop, tablet, or mobile.",
  },
  {
    question: "How do I get support?",
    answer:
      "Reach out via email at support@invoices.app. We typically respond within 24 hours.",
  },
];
</script>

<template>
  <section
    id="faq"
    class="bg-brand-background dark:bg-brand-surface-dark py-20 sm:py-28"
  >
    <div class="max-w-7xl mx-auto px-6 sm:px-8">
      <p
        class="preset-body font-bold uppercase tracking-widest text-brand-primary mb-4 text-center"
      >
        FAQ
      </p>
      <h2
        class="text-[28px] sm:text-[32px] font-bold text-brand-black dark:text-white text-center"
      >
        Frequently asked questions
      </h2>
      <p
        class="text-base text-brand-muted dark:text-brand-muted-light mt-3 text-center"
      >
        Everything you need to know to get started.
      </p>

      <div class="max-w-2xl mx-auto mt-12">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="border-b border-brand-muted-light/30 dark:border-brand-dark-light"
        >
          <button
            class="flex justify-between items-center w-full py-5 cursor-pointer group text-left"
            :aria-expanded="openIndex === index"
            @click="toggle(index)"
          >
            <span
              class="preset-heading-s text-brand-black dark:text-white group-hover:text-brand-primary transition-colors"
            >
              {{ faq.question }}
            </span>
            <ChevronDown
              :size="20"
              class="text-brand-muted transition-transform duration-200 shrink-0 ml-4"
              :class="{ 'rotate-180': openIndex === index }"
            />
          </button>
          <div
            class="grid transition-all duration-300"
            :class="openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            role="region"
          >
            <div class="overflow-hidden">
              <p
                class="preset-body text-brand-muted dark:text-brand-muted-light pb-5 leading-relaxed"
              >
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
