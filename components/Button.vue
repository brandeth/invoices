<script setup lang="ts">
type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "default";

const props = withDefaults(
  defineProps<{
    type?: ButtonType;
    disabled?: boolean;
    variant?: ButtonVariant;
  }>(),
  {
    type: "button",
    disabled: false,
    variant: "default",
  },
);

const slots = useSlots();

const variantClassMap: Record<ButtonVariant, string> = {
  default:
    "bg-brand-primary text-white enabled:hover:bg-brand-primary-light enabled:focus-visible:outline-2 enabled:focus-visible:outline-offset-2 enabled:focus-visible:outline-brand-primary-light",
};

const buttonClass = computed(() => [
  "preset-heading-s-variant inline-flex h-12 items-center gap-[16px] rounded-full transition-colors",
  variantClassMap[props.variant],
  props.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
  hasIcon.value ? "pl-2 pr-6" : "px-6",
]);

const hasIcon = computed(() => Boolean(slots.icon));
</script>

<template>
  <button :type="type" :disabled="disabled" :class="buttonClass">
    <span
      v-if="hasIcon"
      class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-primary"
      aria-hidden="true"
    >
      <slot name="icon" />
    </span>

    <span class="preset-heading-s-variant text-white h-3">
      <slot />
    </span>
  </button>
</template>
