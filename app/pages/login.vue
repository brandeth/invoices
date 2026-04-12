<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient();
const user = useSupabaseUser();

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

watchEffect(() => {
  if (user.value) {
    navigateTo("/dashboard");
  }
});

async function handleLogin() {
  error.value = "";

  if (!email.value || !password.value) {
    error.value = "Please fill in all fields.";
    return;
  }

  loading.value = true;

  const { error: authError } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  loading.value = false;

  if (authError) {
    error.value = authError.message;
  }
}
</script>

<template>
  <div
    class="w-full max-w-120 rounded-lg bg-white px-8 py-10 shadow-md sm:px-12 dark:bg-brand-dark"
  >
    <div class="mb-10 flex flex-col items-center gap-3">
      <div
        class="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl"
      >
        <div class="absolute inset-x-0 top-0 h-full bg-brand-primary" />
        <div
          class="absolute inset-x-0 bottom-0 h-1/2 rounded-tl-[20px] bg-brand-primary-light"
        />
        <img
          src="/icons/logo-light.svg"
          alt="Invoices logo"
          class="relative h-8 w-8"
        />
      </div>
    </div>

    <h1
      class="preset-heading-l mb-2 text-center text-brand-black dark:text-white"
    >
      Login
    </h1>
    <p class="preset-body mb-8 text-center text-brand-muted">
      Sign in to manage your invoices
    </p>

    <form class="flex flex-col gap-6" @submit.prevent="handleLogin">
      <p
        v-if="error"
        class="preset-body rounded-[4px] bg-brand-danger/10 px-5 py-3 text-brand-danger"
        role="alert"
      >
        {{ error }}
      </p>

      <Input
        v-model="email"
        label="Email Address"
        type="email"
        placeholder="e.g. alex@example.com"
      />

      <Input
        v-model="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
      />

      <div class="mt-2">
        <Button type="submit" :disabled="loading" class="w-full justify-center">
          {{ loading ? "Signing in..." : "Log In" }}
        </Button>
      </div>
    </form>

    <p class="preset-body mt-8 text-center text-brand-muted">
      Don't have an account?
      <NuxtLink
        to="/register"
        class="preset-heading-s-variant text-brand-primary transition-colors hover:text-brand-primary-light"
      >
        Create Account
      </NuxtLink>
    </p>
  </div>
</template>
