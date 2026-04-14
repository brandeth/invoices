<script setup lang="ts">
import { gsap } from "gsap";

const heroRef = ref<HTMLElement | null>(null);
const orbRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | undefined;
let orbFloatTween: gsap.core.Tween | undefined;

async function goToRegister() {
  await navigateTo("/register");
}

async function goToDemo() {
  await navigateTo("/demo");
}

onMounted(() => {
  if (!heroRef.value || !orbRef.value) {
    return;
  }

  ctx = gsap.context(() => {
    const orbElement = orbRef.value;

    if (!orbElement) {
      return;
    }

    const orbFinalOpacity =
      Number.parseFloat(getComputedStyle(orbElement).opacity) || 0.1;

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => {
        orbFloatTween = gsap.to(orbElement, {
          y: -20,
          duration: 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      },
    });

    tl.to(".hero-line-1", {
      y: 0,
      autoAlpha: 1,
      duration: 1.4,
      clearProps: "transform,opacity,visibility",
    })
      .to(
        ".hero-line-2",
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          clearProps: "transform,opacity,visibility",
        },
        "-=0.8",
      )
      .to(
        orbElement,
        {
          scale: 1,
          opacity: orbFinalOpacity,
          visibility: "visible",
          duration: 1,
          ease: "back.out(1.7)",
          clearProps: "transform,opacity,visibility",
        },
        "-=0.6",
      )
      .to(
        ".hero-subtitle",
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          clearProps: "transform,opacity,visibility",
        },
        "-=0.4",
      )
      .to(
        ".hero-cta-btn",
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.12,
          clearProps: "transform,opacity,visibility",
        },
        "-=0.3",
      )
      .to(
        ".hero-trust",
        {
          autoAlpha: 1,
          duration: 0.6,
          clearProps: "transform,opacity,visibility",
        },
        "-=0.2",
      );
  }, heroRef.value);
});

onUnmounted(() => {
  orbFloatTween?.kill();
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
      data-hero-orb
      class="absolute top-1/4 right-[10%] w-75 h-75 sm:w-100 sm:h-100 rounded-full bg-linear-to-br from-brand-primary to-brand-primary-light opacity-10 dark:opacity-20 blur-[80px] pointer-events-none"
      style="visibility: hidden; transform: scale(0); transform-origin: center"
    />

    <div
      class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center w-full"
    >
      <h1>
        <span
          class="hero-line-1 block text-[clamp(40px,8vw,96px)] font-bold leading-[1.05] tracking-tight text-brand-black dark:text-[#ede7d9]"
          style="
            opacity: 0;
            visibility: hidden;
            transform: translate3d(0, 120px, 0);
          "
        >
          Invoicing made simple.
        </span>
        <span
          class="hero-line-2 block text-[clamp(32px,6vw,80px)] font-bold leading-[1.1] tracking-tight text-brand-black/60 dark:text-[#ede7d9]/70 mt-2"
          style="
            opacity: 0;
            visibility: hidden;
            transform: translate3d(0, 80px, 0);
          "
        >
          so you can focus on your&nbsp;work.
        </span>
      </h1>

      <p
        class="hero-subtitle text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto mt-8"
        style="
          opacity: 0;
          visibility: hidden;
          transform: translate3d(0, 40px, 0);
        "
      >
        Create, send, and track professional invoices in seconds. No
        spreadsheets, no hassle — just a clean tool that gets out of your way.
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <Button
          class="hero-cta-btn justify-center px-8 sm:px-8 dark:bg-white dark:text-brand-surface-dark dark:enabled:hover:bg-white/90"
          style="
            opacity: 0;
            visibility: hidden;
            transform: translate3d(0, 30px, 0);
          "
          @click="goToRegister"
        >
          Get Started Free
        </Button>
        <Button
          variant="outline"
          class="hero-cta-btn"
          style="
            opacity: 0;
            visibility: hidden;
            transform: translate3d(0, 30px, 0);
          "
          @click="goToDemo"
        >
          View Live Demo
        </Button>
      </div>

      <p
        class="hero-trust mt-8 preset-body text-brand-muted/70"
        style="opacity: 0; visibility: hidden"
      >
        Trusted by 2,400+ freelancers and small businesses
      </p>
    </div>
  </section>
</template>
