<script setup lang="ts">
import { Sun, Moon } from "@lucide/vue";

const isDark = useState<boolean>("color-theme");
</script>

<template>
  <footer
    class="bg-white dark:bg-brand-dark border-t border-brand-muted-light/30 dark:border-brand-dark-light py-12 sm:py-16"
  >
    <div class="max-w-7xl mx-auto px-6 sm:px-8">
      <!-- Top row -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-8">
        <!-- Col 1: Logo -->
        <div class="col-span-2 sm:col-span-1">
          <div class="flex items-center gap-3">
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
          </div>
          <p class="preset-body text-brand-muted mt-3">
            Simple invoicing for freelancers and small teams.
          </p>
        </div>

        <!-- Col 2: Product -->
        <div>
          <h3
            class="preset-heading-s-variant text-brand-black dark:text-white mb-4"
          >
            Product
          </h3>
          <a
            href="#features"
            class="preset-body text-brand-muted hover:text-brand-primary transition-colors block py-1"
          >
            Features
          </a>
          <NuxtLink
            to="/demo"
            class="preset-body text-brand-muted hover:text-brand-primary transition-colors block py-1"
          >
            Demo
          </NuxtLink>
        </div>

        <!-- Col 3: Account -->
        <div>
          <h3
            class="preset-heading-s-variant text-brand-black dark:text-white mb-4"
          >
            Account
          </h3>
          <NuxtLink
            to="/login"
            class="preset-body text-brand-muted hover:text-brand-primary transition-colors block py-1"
          >
            Log In
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="preset-body text-brand-muted hover:text-brand-primary transition-colors block py-1"
          >
            Sign Up
          </NuxtLink>
        </div>

        <!-- Col 4: Legal -->
        <div>
          <h3
            class="preset-heading-s-variant text-brand-black dark:text-white mb-4"
          >
            Legal
          </h3>
          <a
            href="#"
            class="preset-body text-brand-muted hover:text-brand-primary transition-colors block py-1"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            class="preset-body text-brand-muted hover:text-brand-primary transition-colors block py-1"
          >
            Terms of Service
          </a>
        </div>
      </div>

      <!-- Bottom row -->
      <div
        class="border-t border-brand-muted-light/30 dark:border-brand-dark-light mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <p class="preset-body text-brand-muted">
          &copy; 2026 Invoices. All rights reserved.
        </p>
        <button
          class="flex items-center justify-center h-10 w-10 rounded-full text-brand-muted hover:text-brand-primary transition-colors"
          aria-label="Toggle dark mode"
          @click="isDark = !isDark"
        >
          <Moon v-if="!isDark" :size="20" />
          <Sun v-else :size="20" />
        </button>
      </div>
    </div>
  </footer>
</template>
