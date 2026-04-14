<script setup lang="ts">
import { useId } from "vue";

import Button from "./Button.vue";

type ButtonVariant =
  | "default"
  | "secondary"
  | "neutral"
  | "danger"
  | "tertiary"
  | "outline";

const props = withDefaults(
  defineProps<{
    open: boolean;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmButtonVariant?: ButtonVariant;
  }>(),
  {
    confirmLabel: "Delete",
    cancelLabel: "Cancel",
    confirmButtonVariant: "danger",
  },
);

const emit = defineEmits<{
  close: [];
  cancel: [];
  confirm: [];
}>();

const instanceId = useId();
const titleId = `confirmation-dialog-title-${instanceId}`;
const descriptionId = `confirmation-dialog-description-${instanceId}`;

function closeDialog() {
  emit("close");
}

function cancelDialog() {
  emit("cancel");
}

function confirmDialog() {
  emit("confirm");
}

function handleDocumentKeydown(event: KeyboardEvent) {
  if (!props.open || event.key !== "Escape") {
    return;
  }

  closeDialog();
}

onMounted(() => {
  document.addEventListener("keydown", handleDocumentKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleDocumentKeydown);
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-40 flex items-center justify-center bg-[#000000]/50 px-6"
      @click="closeDialog"
    >
      <section
        :aria-describedby="descriptionId"
        :aria-labelledby="titleId"
        aria-modal="true"
        role="dialog"
        class="w-full max-w-120 rounded-lg bg-white px-6 py-6 shadow-[0_10px_30px_rgba(72,84,159,0.1)] dark:bg-brand-dark sm:px-12 sm:py-12"
        @click.stop
      >
        <div class="flex flex-col gap-2">
          <h2
            :id="titleId"
            class="preset-heading-m leading-8 text-brand-black [letter-spacing:-0.5px] dark:text-white"
          >
            {{ title }}
          </h2>

          <p
            :id="descriptionId"
            class="preset-body leading-5.5 text-brand-muted dark:text-brand-muted-light"
          >
            {{ description }}
          </p>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <Button variant="secondary" @click="cancelDialog">
            {{ cancelLabel }}
          </Button>
          <Button :variant="confirmButtonVariant" @click="confirmDialog">
            {{ confirmLabel }}
          </Button>
        </div>
      </section>
    </div>
  </Teleport>
</template>
