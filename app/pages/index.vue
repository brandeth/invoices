<script setup lang="ts">
definePageMeta({
  layout: "landing",
});
</script>

<template>
  <div>
    <LandingNav />
    <main>
      <LandingHero />
      <LandingUVP />
      <LandingFeatures />
      <LandingSocialProof />
      <LandingCTA />
      <LandingFAQ />
    </main>
    <LandingFooter />
  </div>
</template>
