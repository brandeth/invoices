<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "@lucide/vue";

gsap.registerPlugin(ScrollTrigger);

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

const sectionRef = ref<HTMLElement | null>(null);
const scrollContainer = inject<Ref<HTMLElement | null>>('landing-scroll-container');
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.set(".faq-header", { opacity: 0, y: 30 });
    gsap.set(".faq-item", { opacity: 0, y: 20 });

    gsap.to(".faq-header", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 85%",
        once: true,
        scroller: scrollContainer?.value,
      },
    });

    gsap.to(".faq-item", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".faq-list",
        start: "top 85%",
        once: true,
        scroller: scrollContainer?.value,
      },
    });
  }, sectionRef.value!);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section
    ref="sectionRef"
    id="faq"
    class="bg-brand-background dark:bg-brand-surface-dark py-20 sm:py-28"
  >
    <div class="max-w-7xl mx-auto px-6 sm:px-8">
      <div class="faq-header">
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
      </div>

      <div class="faq-list max-w-2xl mx-auto mt-12">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-item border-b border-brand-muted-light/30 dark:border-brand-dark-light"
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
