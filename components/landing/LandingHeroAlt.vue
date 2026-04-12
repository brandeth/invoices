<script setup lang="ts">
import { gsap } from "gsap";

const heroRef = ref<HTMLElement | null>(null);
const orbRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".hero-line-1", {
      y: 120,
      opacity: 0,
      duration: 1.4,
    })
      .from(
        ".hero-line-2",
        {
          y: 80,
          opacity: 0,
          duration: 1.2,
        },
        "-=0.8"
      )
      .from(
        orbRef.value!,
        {
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      )
      .from(
        ".hero-subtitle",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .from(
        ".hero-cta-btn",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
        },
        "-=0.3"
      )
      .from(
        ".hero-trust",
        {
          opacity: 0,
          duration: 0.6,
        },
        "-=0.2"
      );

    tl.then(() => {
      gsap.to(orbRef.value!, {
        y: -20,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  }, heroRef.value!);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section
    ref="heroRef"
    class="relative bg-white dark:bg-brand-surface-dark overflow-hidden min-h-[90vh] flex items-center"
  >
    <!-- Radial gradient overlay -->
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,93,250,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(124,93,250,0.15),transparent_70%)]"
    />

    <!-- Decorative orb -->
    <div
      ref="orbRef"
      class="absolute top-1/4 right-[10%] w-75 h-75 sm:w-100 sm:h-100 rounded-full bg-linear-to-br from-brand-primary to-brand-primary-light opacity-10 dark:opacity-20 blur-[80px] pointer-events-none"
    />

    <div
      class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center w-full"
    >
      <h1>
        <span
          class="hero-line-1 block text-[clamp(40px,8vw,96px)] font-bold leading-[1.05] tracking-tight text-brand-black dark:text-[#ede7d9]"
        >
          Invoicing made simple.
        </span>
        <span
          class="hero-line-2 block text-[clamp(32px,6vw,80px)] font-bold leading-[1.1] tracking-tight text-brand-black/60 dark:text-[#ede7d9]/70 mt-2 sm:pl-[5%]"
        >
          so you can focus on your&nbsp;work.
        </span>
      </h1>

      <p
        class="hero-subtitle text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto mt-8"
      >
        Create, send, and track professional invoices in seconds. No
        spreadsheets, no hassle — just a clean tool that gets out of your way.
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <NuxtLink
          to="/register"
          class="hero-cta-btn inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-brand-primary text-white dark:bg-white dark:text-brand-surface-dark preset-heading-s-variant hover:bg-white/90 transition-colors"
        >
          Get Started Free
        </NuxtLink>
        <NuxtLink
          to="/demo"
          class="hero-cta-btn inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full border-2 border-brand-muted-light text-brand-muted-dark dark:border-white/30 dark:text-white preset-heading-s-variant hover:border-white transition-colors"
        >
          View Live Demo
        </NuxtLink>
      </div>

      <p class="hero-trust mt-8 preset-body text-brand-muted/70">
        Trusted by 2,400+ freelancers and small businesses
      </p>
    </div>
  </section>
</template>
