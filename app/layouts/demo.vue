<script setup lang="ts">
import { useInvoiceFormState } from "~/composables/useInvoiceFormState";
import {
  useDemoInvoices,
  type InvoiceFormData,
} from "~/composables/useDemoInvoices";
import InvoiceForm from "../../components/InvoiceForm.vue";
import Sidebar from "../../components/Sidebar.vue";

const isDark = useState<boolean>("color-theme");
const { addInvoice, updateInvoice } = useDemoInvoices();

const {
  isOpen: isInvoiceFormOpen,
  mode: invoiceFormMode,
  invoiceId: invoiceFormInvoiceId,
  initialValues: invoiceFormInitialValues,
  clear: clearInvoiceForm,
} = useInvoiceFormState();
const invoiceFormRef = ref<HTMLElement | null>(null);
const sidebarRef = ref<HTMLElement | null>(null);

function toggleTheme() {
  isDark.value = !isDark.value;
}

function closeInvoiceForm() {
  clearInvoiceForm();
}

function handleInvoiceFormSaveDraft(data: InvoiceFormData) {
  if (invoiceFormMode.value === "edit" && invoiceFormInvoiceId.value) {
    updateInvoice(invoiceFormInvoiceId.value, data);
  } else {
    addInvoice(data, "draft");
  }
  closeInvoiceForm();
}

function handleInvoiceFormSubmit(data: InvoiceFormData) {
  if (invoiceFormMode.value === "edit" && invoiceFormInvoiceId.value) {
    updateInvoice(invoiceFormInvoiceId.value, data);
  } else {
    addInvoice(data, "pending");
  }
  closeInvoiceForm();
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
  <div class="flex h-full gap-0 max-xl:flex-col xl:flex-row">
    <div ref="sidebarRef" class="relative z-30 max-xl:w-full max-xl:shadow-md">
      <Sidebar :is-dark="isDark" logo-to="/demo" @toggle-theme="toggleTheme" />
    </div>

    <div class="relative flex min-h-0 min-w-0 flex-1">
      <div
        v-if="isInvoiceFormOpen"
        class="absolute inset-0 z-10 bg-[#000000]/50"
        aria-hidden="true"
        @click="closeInvoiceForm"
      />

      <div
        ref="invoiceFormRef"
        v-if="isInvoiceFormOpen"
        class="absolute -left-25.75 top-0 z-20 h-full w-full max-xl:left-0 sm:w-auto"
      >
        <InvoiceForm
          :mode="invoiceFormMode"
          :invoice-id="invoiceFormInvoiceId"
          :initial-values="invoiceFormInitialValues"
          @close="closeInvoiceForm"
          @save-draft="handleInvoiceFormSaveDraft"
          @submit="handleInvoiceFormSubmit"
        />
      </div>

      <main
        class="relative min-w-0 flex-1 overflow-y-auto px-6 py-10 sm:px-8 md:max-xl:px-12 md:max-xl:pt-14 md:max-xl:pb-12"
      >
        <slot />
      </main>
    </div>
  </div>
</template>
