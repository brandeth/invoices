<script setup lang="ts">
definePageMeta({
  layout: "landing",
});
</script>

<template>
  <div class="bg-white dark:bg-brand-surface-dark">
    <LandingNav />
    <main>
      <LandingHeroAlt />
      <LandingUVP />
      <LandingFeatures />
      <LandingSocialProof />
      <LandingCTA />
      <LandingFAQ />
    </main>
    <LandingFooter />
  </div>
</template>
