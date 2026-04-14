<script setup lang="ts">
import { Sun, LogOut, User } from "@lucide/vue";

const props = withDefaults(
  defineProps<{
    isDark: boolean;
    logoTo?: string;
  }>(),
  {
    logoTo: "/",
  },
);

const logoAriaLabel = computed(() => {
  if (props.logoTo === "/dashboard") return "Go to the dashboard";
  if (props.logoTo === "/demo") return "Go to the demo invoices";

  return "Go to the landing page";
});

const emit = defineEmits<{
  toggleTheme: [];
  logout: [];
}>();

const profileMenuRef = ref<HTMLElement | null>(null);
const isProfileMenuOpen = ref(false);

function toggleProfileMenu() {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
}

function closeProfileMenu() {
  isProfileMenuOpen.value = false;
}

function handleLogoutClick() {
  closeProfileMenu();
  emit("logout");
}

function handleDocumentPointerDown(event: PointerEvent) {
  if (!profileMenuRef.value) return;
  const target = event.target;
  if (!(target instanceof Node) || profileMenuRef.value.contains(target))
    return;
  closeProfileMenu();
}

function handleDocumentKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") closeProfileMenu();
}

onMounted(() => {
  document.addEventListener("pointerdown", handleDocumentPointerDown);
  document.addEventListener("keydown", handleDocumentKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", handleDocumentPointerDown);
  document.removeEventListener("keydown", handleDocumentKeydown);
});
</script>

<template>
  <aside
    class="sticky top-0 flex h-screen w-25.75 shrink-0 flex-col overflow-visible rounded-r-[20px] max-xl:h-20 max-xl:w-full max-xl:flex-row max-xl:items-stretch max-xl:justify-between max-xl:rounded-none"
    :class="props.isDark ? 'bg-brand-dark' : 'bg-[#373b53]'"
    aria-label="Sidebar"
  >
    <div
      class="relative h-25.75 w-25.75 overflow-hidden rounded-r-[20px] max-xl:h-20 max-xl:w-20 max-xl:rounded-r-[20px]"
    >
      <div class="absolute inset-x-0 top-0 h-full bg-brand-primary" />
      <div
        class="absolute inset-x-0 bottom-0 h-1/2 rounded-tl-[20px] bg-brand-primary-light"
      />

      <NuxtLink
        :to="props.logoTo"
        :aria-label="logoAriaLabel"
        class="relative flex h-full w-full items-center justify-center"
      >
        <img
          src="/icons/logo-light.svg"
          alt="Invoices logo"
          class="h-10 w-10 max-xl:h-8 max-xl:w-8"
        />
      </NuxtLink>
    </div>

    <div
      class="mt-auto flex flex-col max-xl:mt-0 max-xl:ml-auto max-xl:flex-row max-xl:items-center"
    >
      <div
        class="flex items-center justify-center py-6 max-xl:h-full max-xl:px-4 sm:max-xl:px-8 max-xl:py-0"
      >
        <button
          type="button"
          class="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          :aria-label="
            props.isDark ? 'Switch to light mode' : 'Switch to dark mode'
          "
          :aria-pressed="props.isDark"
          @click="emit('toggleTheme')"
        >
          <Sun
            v-if="props.isDark"
            :size="20"
            color="var(--color-brand-muted-dark)"
            aria-hidden="true"
          />
          <img
            v-else
            src="/icons/moon.svg"
            alt=""
            class="h-5 w-5"
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        ref="profileMenuRef"
        class="relative flex items-center justify-center border-t border-[#494e6e] py-6 max-xl:h-full max-xl:border-t-0 max-xl:border-l max-xl:px-4 sm:max-xl:px-6 max-xl:py-0"
      >
        <button
          type="button"
          class="cursor-pointer rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="User menu"
          aria-haspopup="menu"
          :aria-expanded="isProfileMenuOpen"
          @click="toggleProfileMenu"
        >
          <img
            src="/images/profile-picture.jpg"
            alt=""
            class="h-10 w-10 rounded-full object-cover"
          />
        </button>

        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-if="isProfileMenuOpen"
            role="menu"
            class="absolute bottom-6 left-full z-60 ml-3 w-44 overflow-hidden rounded-lg bg-white shadow-[0_10px_20px_0_rgba(72,84,159,0.25)] max-xl:bottom-auto max-xl:left-auto max-xl:right-4 sm:max-xl:right-6 max-xl:top-full max-xl:mt-4 max-xl:ml-0 max-xl:origin-top-right dark:bg-brand-dark-light"
          >
            <NuxtLink
              to="/profile"
              role="menuitem"
              class="preset-heading-s-variant flex w-full items-center gap-3 px-5 py-4 text-left text-brand-black transition-colors hover:text-brand-primary focus-visible:text-brand-primary focus-visible:outline-none dark:text-brand-muted-light dark:hover:text-brand-primary-light"
              @click="closeProfileMenu"
            >
              <User :size="16" aria-hidden="true" />
              Profile
            </NuxtLink>
            <button
              type="button"
              role="menuitem"
              class="preset-heading-s-variant flex w-full cursor-pointer items-center gap-3 border-t border-brand-muted-light px-5 py-4 text-left text-brand-danger transition-colors hover:text-brand-danger-light focus-visible:text-brand-danger-light focus-visible:outline-none dark:border-brand-dark"
              @click="handleLogoutClick"
            >
              <LogOut :size="16" aria-hidden="true" />
              Log out
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </aside>
</template>
