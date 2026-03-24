<script setup lang="ts">
import InvoiceForm from "../components/InvoiceForm.vue";
import Sidebar from "../components/Sidebar.vue";

const isDark = useState<boolean>("color-theme", () => false);
const isInvoiceFormOpen = useState<boolean>("invoice-form-open", () => false);
const invoiceFormRef = ref<HTMLElement | null>(null);
const sidebarRef = ref<HTMLElement | null>(null);

watchEffect(() => {
  if (!import.meta.client) {
    return;
  }

  document.documentElement.classList.toggle("dark", isDark.value);
});

function toggleTheme() {
  isDark.value = !isDark.value;
}

function closeInvoiceForm() {
  isInvoiceFormOpen.value = false;
}

function handleDocumentPointerDown(event: PointerEvent) {
  if (!isInvoiceFormOpen.value || !invoiceFormRef.value) {
    return;
  }

  const target = event.target;

  if (
    !(target instanceof Node) ||
    invoiceFormRef.value.contains(target) ||
    sidebarRef.value?.contains(target)
  ) {
    return;
  }

  closeInvoiceForm();
}

function handleDocumentKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    closeInvoiceForm();
  }
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
  <div
    class="h-screen overflow-hidden bg-brand-background text-brand-black dark:bg-brand-surface-dark dark:text-white"
  >
    <NuxtRouteAnnouncer />

    <div class="flex h-full gap-0">
      <div ref="sidebarRef" class="relative z-30">
        <Sidebar :is-dark="isDark" @toggle-theme="toggleTheme" />
      </div>

      <div class="relative flex min-w-0 flex-1">
        <div
          v-if="isInvoiceFormOpen"
          class="absolute inset-0 z-10 bg-[#000000]/50"
          aria-hidden="true"
          @click="closeInvoiceForm"
        />

        <div
          ref="invoiceFormRef"
          v-if="isInvoiceFormOpen"
          class="absolute left-[-103px] top-0 z-20 h-full"
        >
          <InvoiceForm />
        </div>

        <main
          class="relative min-w-0 flex-1 overflow-y-auto px-6 py-10 sm:px-8"
        >
          <NuxtPage />
        </main>
      </div>
    </div>
  </div>
</template>
