<script setup lang="ts">
import { Menu, X, Sun, Moon } from "@lucide/vue";

const isDark = useState<boolean>("color-theme");
const isMobileMenuOpen = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-brand-muted-light/30 backdrop-blur-md bg-white/80 dark:bg-brand-surface-dark/80 dark:border-brand-dark-light"
  >
    <nav class="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
      <!-- Left: Logo + Nav links -->
      <div class="flex items-center gap-8">
        <NuxtLink
          to="/"
          class="flex items-center gap-3"
          @click="closeMobileMenu"
        >
          <div
            class="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl"
          >
            <div class="absolute inset-x-0 top-0 h-full bg-brand-primary" />
            <div
              class="absolute inset-x-0 bottom-0 h-1/2 rounded-tl-[20px] bg-brand-primary-light"
            />
            <img
              src="/icons/logo-light.svg"
              alt="Invoices logo"
              class="relative h-5 w-5"
            />
          </div>
          <span class="preset-heading-m text-brand-black dark:text-white"
            >Invoices</span
          >
        </NuxtLink>

        <div class="hidden md:flex items-center gap-6">
          <a
            href="#features"
            class="preset-body text-brand-muted hover:text-brand-primary transition-colors cursor-pointer"
          >
            Features
          </a>
          <a
            href="#faq"
            class="preset-body text-brand-muted hover:text-brand-primary transition-colors cursor-pointer"
          >
            FAQ
          </a>
        </div>
      </div>

      <!-- Right: Auth buttons (desktop) -->
      <div class="hidden md:flex items-center gap-4">
        <button
          type="button"
          class="flex items-center justify-center h-10 w-10 rounded-full text-brand-muted hover:text-brand-primary transition-colors"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="isDark = !isDark"
        >
          <Sun v-if="isDark" :size="20" />
          <Moon v-else :size="20" />
        </button>
        <NuxtLink
          to="/login"
          class="preset-heading-s-variant text-brand-muted-dark dark:text-brand-muted-light hover:text-brand-primary transition-colors"
        >
          Log In
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="inline-flex items-center h-10 px-6 rounded-full bg-brand-primary text-white preset-heading-s-variant hover:bg-brand-primary-light transition-colors"
        >
          Get Started Free
        </NuxtLink>
      </div>

      <!-- Mobile: Hamburger -->
      <button
        class="md:hidden flex items-center justify-center h-10 w-10 text-brand-muted hover:text-brand-primary transition-colors"
        :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
        @click="toggleMobileMenu"
      >
        <X v-if="isMobileMenuOpen" :size="24" />
        <Menu v-else :size="24" />
      </button>
    </nav>

    <!-- Mobile dropdown panel -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden border-t border-brand-muted-light/30 dark:border-brand-dark-light bg-white dark:bg-brand-surface-dark px-6 py-6 flex flex-col gap-4"
    >
      <a
        href="#features"
        class="preset-body text-brand-muted hover:text-brand-primary transition-colors cursor-pointer py-2"
        @click="closeMobileMenu"
      >
        Features
      </a>
      <a
        href="#faq"
        class="preset-body text-brand-muted hover:text-brand-primary transition-colors cursor-pointer py-2"
        @click="closeMobileMenu"
      >
        FAQ
      </a>
      <button
        type="button"
        class="flex items-center gap-3 py-2 text-brand-muted hover:text-brand-primary transition-colors"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="isDark = !isDark"
      >
        <Sun v-if="isDark" :size="20" />
        <Moon v-else :size="20" />
        <span class="preset-body">{{
          isDark ? "Light Mode" : "Dark Mode"
        }}</span>
      </button>
      <div class="flex flex-col gap-3 pt-2">
        <NuxtLink
          to="/login"
          class="preset-heading-s-variant text-brand-muted-dark dark:text-brand-muted-light hover:text-brand-primary transition-colors py-2"
          @click="closeMobileMenu"
        >
          Log In
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="inline-flex items-center justify-center h-10 px-6 rounded-full bg-brand-primary text-white preset-heading-s-variant hover:bg-brand-primary-light transition-colors"
          @click="closeMobileMenu"
        >
          Get Started Free
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
