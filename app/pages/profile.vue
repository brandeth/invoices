<script setup lang="ts">
definePageMeta({
  layout: "default",
  title: "Profile",
});

const user = useSupabaseUser();

function formatDate(value?: string | null) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

const displayName = computed(() => {
  const fullName = user.value?.user_metadata?.full_name;

  if (typeof fullName === "string" && fullName.trim().length > 0) {
    return fullName;
  }

  const name = user.value?.user_metadata?.name;

  if (typeof name === "string" && name.trim().length > 0) {
    return name;
  }

  return user.value?.email ?? "User";
});

const provider = computed(() => {
  const providers = user.value?.app_metadata?.providers;

  if (Array.isArray(providers) && providers.length > 0) {
    return providers.map(String).join(", ");
  }

  const providerName = user.value?.app_metadata?.provider;

  if (typeof providerName === "string" && providerName.length > 0) {
    return providerName;
  }

  return "Not available";
});

const accountDetails = computed(() => [
  {
    label: "Email address",
    value: user.value?.email ?? "Not available",
    monospace: false,
  },
  {
    label: "User ID",
    value: user.value?.id ?? "Not available",
    monospace: true,
  },
  {
    label: "Created",
    value: formatDate(user.value?.created_at),
    monospace: false,
  },
  {
    label: "Last sign in",
    value: formatDate(user.value?.last_sign_in_at),
    monospace: false,
  },
  {
    label: "Provider",
    value: provider.value,
    monospace: false,
  },
]);
</script>

<template>
  <div class="mx-auto w-full max-w-182.5 space-y-8 md:max-xl:max-w-2xl">
    <section
      class="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_20px_0_rgba(72,84,159,0.08)] dark:bg-brand-dark"
    >
      <div
        class="border-b border-brand-muted-light/40 px-6 py-6 sm:px-8 dark:border-brand-dark-light"
      >
        <p class="preset-heading-s-variant mb-2 text-brand-primary">Account</p>
        <div
          class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div class="space-y-3">
            <h1 class="preset-heading-l text-brand-black dark:text-white">
              User Profile
            </h1>
            <p
              class="preset-body max-w-2xl text-brand-muted dark:text-brand-muted-light"
            >
              Signed in as
              <span
                class="preset-heading-s-variant text-brand-black dark:text-white"
              >
                {{ displayName }}
              </span>
            </p>
          </div>

          <NuxtLink
            to="/dashboard"
            class="preset-heading-s-variant inline-flex h-12 items-center justify-center rounded-full bg-brand-primary px-8 text-white transition-colors hover:bg-brand-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary-light"
          >
            Back to Dashboard
          </NuxtLink>
        </div>
      </div>

      <div class="px-6 py-6 sm:px-8 sm:py-8">
        <div v-if="user" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="detail in accountDetails"
            :key="detail.label"
            class="rounded-2xl border border-brand-muted-light/40 bg-[#f9fafe] p-5 dark:border-brand-dark-light dark:bg-brand-surface-dark"
          >
            <p class="preset-heading-s-variant mb-2 text-brand-muted">
              {{ detail.label }}
            </p>
            <p
              :class="[
                'preset-body text-brand-black dark:text-white',
                detail.monospace
                  ? 'break-all font-mono text-sm sm:text-base'
                  : '',
              ]"
            >
              {{ detail.value }}
            </p>
          </article>
        </div>

        <div
          v-else
          class="rounded-2xl border border-brand-muted-light/40 bg-[#f9fafe] p-6 dark:border-brand-dark-light dark:bg-brand-surface-dark"
        >
          <p class="preset-body text-brand-muted dark:text-brand-muted-light">
            Your account information is not available right now.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
