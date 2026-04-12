<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FilePlus,
  Filter,
  ClipboardList,
  CircleCheckBig,
  Eye,
  ShieldCheck,
} from "@lucide/vue";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: FilePlus,
    title: "Create in clicks, not hours",
    description:
      "Add client details, line items, and payment terms with a guided form. Every field is validated so nothing slips through.",
  },
  {
    icon: Filter,
    title: "Filter and find fast",
    description:
      "Instantly filter invoices by status — draft, pending, or paid. Your dashboard shows exactly what needs attention.",
  },
  {
    icon: ClipboardList,
    title: "Track every detail",
    description:
      "Each invoice stores client info, item breakdowns, quantities, totals, and due dates in one clean view.",
  },
  {
    icon: CircleCheckBig,
    title: "One-click status updates",
    description:
      "Mark invoices as paid with a single click. Status badges update in real time across your dashboard.",
  },
  {
    icon: Eye,
    title: "Try before you sign up",
    description:
      "Explore the full app in demo mode — no account required. See exactly how it works before committing.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description:
      "Built on Supabase with email authentication. Your data is encrypted and accessible only to you.",
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const scrollContainer = inject<Ref<HTMLElement | null>>('landing-scroll-container');
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.set(".feat-label", { opacity: 0, y: 30 });
    gsap.set(".feat-heading", { opacity: 0, y: 30 });
    gsap.set(".feat-subtitle", { opacity: 0, y: 30 });
    gsap.set(".feat-card", { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 85%",
        once: true,
        scroller: scrollContainer?.value,
      },
    });

    tl.to(".feat-label", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(".feat-heading", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .to(".feat-subtitle", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");

    gsap.to(".feat-card", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".feat-grid",
        start: "top 80%",
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
    id="features"
    class="bg-brand-background dark:bg-brand-surface-dark py-20 sm:py-28"
  >
    <div class="max-w-7xl mx-auto px-6 sm:px-8">
      <p
        class="feat-label preset-body font-bold uppercase tracking-widest text-brand-primary mb-4 text-center"
      >
        Features
      </p>
      <h2
        class="feat-heading text-[28px] sm:text-[32px] font-bold text-brand-black dark:text-white text-center"
      >
        A smarter way to manage invoices
      </h2>
      <p
        class="feat-subtitle text-base text-brand-muted dark:text-brand-muted-light mt-3 text-center"
      >
        From draft to paid — every step is designed to save you time.
      </p>

      <div class="feat-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="feat-card p-8 rounded-2xl bg-white dark:bg-brand-dark border border-brand-muted-light/20 dark:border-brand-dark-light hover:border-brand-primary/40 transition-colors duration-200"
        >
          <div
            class="h-10 w-10 rounded-lg bg-brand-primary text-white flex items-center justify-center mb-5"
          >
            <component :is="feature.icon" :size="20" />
          </div>
          <h3 class="preset-heading-s text-brand-black dark:text-white">
            {{ feature.title }}
          </h3>
          <p
            class="preset-body text-brand-muted dark:text-brand-muted-light mt-2"
          >
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
