<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "@lucide/vue";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: "2,400+", label: "Active users" },
  { number: "18,000+", label: "Invoices created" },
  { number: "99.9%", label: "Uptime" },
];

const testimonials = [
  {
    quote:
      "I switched from a spreadsheet to Invoices and saved hours every month. The interface is so clean — it's the only tool I actually enjoy using.",
    name: "Sarah Chen",
    role: "Freelance Designer",
  },
  {
    quote:
      "Demo mode sold me instantly. I could see exactly how everything worked before creating an account. That kind of transparency is rare.",
    name: "Marcus Rivera",
    role: "Web Developer",
  },
  {
    quote:
      "Dark mode, fast filters, one-click payments — this is what invoicing software should feel like. No bloat, just what you need.",
    name: "Aisha Patel",
    role: "Marketing Consultant",
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const scrollContainer = inject<Ref<HTMLElement | null>>('landing-scroll-container');
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.set(".proof-label", { opacity: 0, y: 30 });
    gsap.set(".proof-heading", { opacity: 0, y: 30 });
    gsap.set(".proof-stat", { opacity: 0, y: 30, scale: 0.8 });
    gsap.set(".proof-testimonial", { opacity: 0, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 85%",
        once: true,
        scroller: scrollContainer?.value,
      },
    });

    tl.to(".proof-label", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(".proof-heading", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");

    gsap.to(".proof-stat", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".proof-stats",
        start: "top 85%",
        once: true,
        scroller: scrollContainer?.value,
      },
    });

    gsap.to(".proof-testimonial", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".proof-testimonials",
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
  <section ref="sectionRef" class="bg-white dark:bg-brand-dark py-20 sm:py-28">
    <div class="max-w-7xl mx-auto px-6 sm:px-8">
      <p
        class="proof-label preset-body font-bold uppercase tracking-widest text-brand-primary mb-4 text-center"
      >
        Social Proof
      </p>
      <h2
        class="proof-heading text-[28px] sm:text-[32px] font-bold text-brand-black dark:text-white text-center mb-16"
      >
        Loved by freelancers and small teams
      </h2>

      <!-- Stats -->
      <div
        class="proof-stats flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 mb-16"
      >
        <div v-for="stat in stats" :key="stat.label" class="proof-stat text-center">
          <div class="text-[40px] font-bold text-brand-primary">
            {{ stat.number }}
          </div>
          <div class="preset-body text-brand-muted mt-1">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Testimonials -->
      <div class="proof-testimonials grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="proof-testimonial p-8 rounded-2xl bg-brand-background dark:bg-brand-dark-light"
        >
          <Quote :size="32" class="text-brand-primary/30 mb-4" />
          <p
            class="text-[15px] text-brand-black dark:text-white leading-relaxed"
          >
            {{ testimonial.quote }}
          </p>
          <div
            class="border-t border-brand-muted-light/30 dark:border-brand-dark-light mt-6 pt-4"
          >
            <div
              class="preset-heading-s-variant text-brand-black dark:text-white"
            >
              {{ testimonial.name }}
            </div>
            <div class="preset-body text-brand-muted mt-1">
              {{ testimonial.role }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
