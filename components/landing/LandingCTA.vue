<template>
  <section
    class="bg-gradient-to-br from-brand-primary to-[#6c47f0] py-20 sm:py-28"
  >
    <div class="max-w-7xl mx-auto px-6 sm:px-8 text-center">
      <h2
        class="text-[32px] sm:text-[40px] font-bold text-white tracking-tight"
      >
        Ready to simplify your invoicing?
      </h2>
      <p class="text-lg text-white/80 mt-4 max-w-lg mx-auto">
        Create your free account in seconds. No credit card required.
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <NuxtLink
          to="/register"
          class="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-brand-primary preset-heading-s-variant hover:bg-white/90 transition-colors"
        >
          Get Started Free
        </NuxtLink>
        <NuxtLink
          to="/demo"
          class="inline-flex items-center justify-center h-12 px-8 rounded-full border-2 border-white/40 text-white preset-heading-s-variant hover:border-white transition-colors"
        >
          View Live Demo
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
