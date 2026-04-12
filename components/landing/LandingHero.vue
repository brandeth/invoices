<template>
  <section class="py-20 sm:py-28 lg:py-36">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 text-center">
      <h1
        class="text-[48px] sm:text-[56px] lg:text-[64px] font-bold leading-[1.1] tracking-tight text-brand-black dark:text-white"
      >
        Invoicing made simple, so you can focus on your&nbsp;work.
      </h1>

      <p
        class="text-lg sm:text-xl text-brand-muted dark:text-brand-muted-light max-w-2xl mx-auto mt-6"
      >
        Create, send, and track professional invoices in seconds. No
        spreadsheets, no hassle — just a clean tool that gets out of your way.
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <NuxtLink
          to="/register"
          class="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-brand-primary text-white preset-heading-s-variant hover:bg-brand-primary-light transition-colors"
        >
          Get Started Free
        </NuxtLink>
        <NuxtLink
          to="/demo"
          class="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-[#f9fafe] text-brand-muted-dark preset-heading-s-variant hover:bg-brand-muted-light transition-colors dark:bg-brand-dark-light dark:text-brand-muted-light dark:hover:bg-white"
        >
          View Live Demo
        </NuxtLink>
      </div>

      <p class="mt-8 preset-body text-brand-muted">
        Trusted by 2,400+ freelancers and small businesses
      </p>
    </div>
  </section>
</template>
