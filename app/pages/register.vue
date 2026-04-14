<script setup lang="ts">
definePageMeta({
  layout: "auth",
  title: "Create Account",
});

const client = useSupabaseClient();
const user = useSupabaseUser();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const success = ref(false);
const loading = ref(false);

watchEffect(() => {
  if (user.value) {
    navigateTo("/dashboard");
  }
});

async function handleRegister() {
  error.value = "";

  if (!email.value || !password.value || !confirmPassword.value) {
    error.value = "Please fill in all fields.";
    return;
  }

  if (password.value.length < 6) {
    error.value = "Password must be at least 6 characters.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }

  loading.value = true;

  const { error: authError } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });

  loading.value = false;

  if (authError) {
    error.value = authError.message;
  } else {
    success.value = true;
  }
}
</script>

<template>
  <div
    class="w-full max-w-120 rounded-lg bg-white px-8 py-10 shadow-md sm:px-12 dark:bg-brand-dark"
  >
    <div class="mb-10 flex flex-col items-center gap-3">
      <NuxtLink
        to="/"
        aria-label="Go to the landing page"
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
      </NuxtLink>
    </div>

    <h1
      class="preset-heading-l mb-2 text-center text-brand-black dark:text-white"
    >
      Create Account
    </h1>
    <p class="preset-body mb-8 text-center text-brand-muted">
      Sign up to start managing your invoices
    </p>

    <template v-if="success">
      <div
        class="flex flex-col items-center gap-4 rounded-[4px] bg-[#33d69f]/10 px-6 py-8 text-center"
      >
        <p class="preset-heading-s text-[#33d69f]">Check your email</p>
        <p class="preset-body text-brand-muted dark:text-brand-muted-light">
          We've sent a confirmation link to
          <span
            class="preset-heading-s-variant text-brand-black dark:text-white"
            >{{ email }}</span
          >. Please verify your email to complete registration.
        </p>
      </div>

      <p class="preset-body mt-8 text-center text-brand-muted">
        Already have an account?
        <NuxtLink
          to="/login"
          class="preset-heading-s-variant text-brand-primary transition-colors hover:text-brand-primary-light"
        >
          Log In
        </NuxtLink>
      </p>
    </template>

    <template v-else>
      <form class="flex flex-col gap-6" @submit.prevent="handleRegister">
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
          placeholder="At least 6 characters"
        />

        <Input
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Repeat your password"
        />

        <div class="mt-2">
          <Button
            type="submit"
            :disabled="loading"
            class="w-full justify-center"
          >
            {{ loading ? "Creating account..." : "Create Account" }}
          </Button>
        </div>
      </form>

      <p class="preset-body mt-8 text-center text-brand-muted">
        Already have an account?
        <NuxtLink
          to="/login"
          class="preset-heading-s-variant text-brand-primary transition-colors hover:text-brand-primary-light"
        >
          Log In
        </NuxtLink>
      </p>
    </template>
  </div>
</template>
