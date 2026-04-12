<script setup lang="ts">
import { MousePointerClick, Zap, Cloud, Moon } from "@lucide/vue";

const cards = [
  {
    icon: MousePointerClick,
    title: "No learning curve",
    description:
      "A clean, intuitive interface designed for people who'd rather be working than figuring out software.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    description:
      "Create a complete invoice in under 60 seconds — from client details to line items to sending.",
  },
  {
    icon: Cloud,
    title: "Always in sync",
    description:
      "Your invoices live in the cloud. Access them from any device, anytime, with real-time status tracking.",
  },
  {
    icon: Moon,
    title: "Dark mode included",
    description:
      "Work late without the glare. Toggle between light and dark themes with one click.",
  },
];
</script>

<template>
  <section class="bg-white dark:bg-brand-dark py-20 sm:py-28">
    <div class="max-w-7xl mx-auto px-6 sm:px-8">
      <p
        class="preset-body font-bold uppercase tracking-widest text-brand-primary mb-4 text-center"
      >
        Why Invoices?
      </p>
      <h2
        class="text-[28px] sm:text-[32px] font-bold text-brand-black dark:text-white text-center"
      >
        Everything you need. Nothing you don't.
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <div
          v-for="card in cards"
          :key="card.title"
          class="p-6 rounded-xl bg-brand-background dark:bg-brand-dark-light group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <div
            class="h-12 w-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4"
          >
            <component :is="card.icon" :size="24" class="text-brand-primary" />
          </div>
          <h3 class="preset-heading-s text-brand-black dark:text-white">
            {{ card.title }}
          </h3>
          <p
            class="preset-body text-brand-muted dark:text-brand-muted-light mt-2"
          >
            {{ card.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
