<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const scrollContainer = inject<Ref<HTMLElement | null>>('landing-scroll-container');
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.set(".cta-heading", { opacity: 0, y: 40 });
    gsap.set(".cta-subtitle", { opacity: 0, y: 30 });
    gsap.set(".cta-btn", { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 85%",
        once: true,
        scroller: scrollContainer?.value,
      },
    });

    tl.to(".cta-heading", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(".cta-subtitle", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .to(".cta-btn", { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }, "-=0.3");
  }, sectionRef.value!);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section
    ref="sectionRef"
    class="bg-linear-to-br from-brand-primary to-[#6c47f0] py-20 sm:py-28"
  >
    <div class="max-w-7xl mx-auto px-6 sm:px-8 text-center">
      <h2
        class="cta-heading text-[32px] sm:text-[40px] font-bold text-white tracking-tight"
      >
        Ready to simplify your invoicing?
      </h2>
      <p class="cta-subtitle text-lg text-white/80 mt-4 max-w-lg mx-auto">
        Create your free account in seconds. No credit card required.
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <NuxtLink
          to="/register"
          class="cta-btn inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-brand-primary preset-heading-s-variant hover:bg-white/90 transition-colors"
        >
          Get Started Free
        </NuxtLink>
        <NuxtLink
          to="/demo"
          class="cta-btn inline-flex items-center justify-center h-12 px-8 rounded-full border-2 border-white/40 text-white preset-heading-s-variant hover:border-white transition-colors"
        >
          View Live Demo
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
