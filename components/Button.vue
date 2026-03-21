<script setup lang="ts">
type ButtonType = "button" | "submit" | "reset";
type ButtonVariant =
  | "default"
  | "secondary"
  | "neutral"
  | "danger"
  | "tertiary";

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

const hasIcon = computed(() => Boolean(slots.icon));

const rootVariantClassMap: Record<ButtonVariant, string> = {
  // secondary - dark:enabled:hover:text-brand-muted-light
  default:
    "bg-brand-primary text-white enabled:hover:bg-brand-primary-light enabled:focus-visible:outline-2 enabled:focus-visible:outline-offset-2 enabled:focus-visible:outline-brand-primary-light",
  secondary:
    "bg-[#f9fafe] text-brand-muted-dark enabled:hover:bg-brand-muted-light enabled:hover:text-brand-muted-dark dark:bg-brand-dark-light dark:text-brand-muted-light dark:enabled:hover:bg-white  enabled:focus-visible:outline-2 enabled:focus-visible:outline-offset-2 enabled:focus-visible:outline-brand-muted-dark dark:enabled:focus-visible:outline-brand-muted-light",
  neutral:
    "bg-[#373b53] text-brand-muted enabled:hover:bg-brand-black enabled:hover:text-brand-muted dark:bg-[#373b53] dark:text-brand-muted-light dark:enabled:hover:bg-brand-dark dark:enabled:hover:text-brand-muted-light enabled:focus-visible:outline-2 enabled:focus-visible:outline-offset-2 enabled:focus-visible:outline-brand-muted-dark dark:enabled:focus-visible:outline-brand-muted-light",
  danger:
    "bg-brand-danger text-white enabled:hover:bg-brand-danger-light enabled:focus-visible:outline-2 enabled:focus-visible:outline-offset-2 enabled:focus-visible:outline-brand-danger-light",
  tertiary:
    "min-w-[350px] justify-center bg-[#f9fafe] enabled:hover:text-brand-muted-dark text-brand-muted-dark enabled:hover:bg-brand-muted-light dark:bg-brand-dark-light dark:text-brand-muted-light dark:enabled:hover:bg-brand-muted-light enabled:focus-visible:outline-2 enabled:focus-visible:outline-offset-2 enabled:focus-visible:outline-brand-muted-dark dark:enabled:focus-visible:outline-brand-muted-light",
};

const contentVariantClassMap: Record<ButtonVariant, string> = {
  default: "gap-[16px]",
  secondary: "gap-[16px]",
  neutral: "gap-[16px]",
  danger: "gap-[16px]",
  tertiary: "gap-2 enabled:group-hover:gap-2",
};

const iconWrapperVariantClassMap: Record<ButtonVariant, string> = {
  default: "h-8 w-8 rounded-full bg-white text-brand-primary",
  secondary: "h-8 w-8 rounded-full bg-white text-brand-primary",
  neutral: "h-8 w-8 rounded-full bg-white text-brand-primary",
  danger: "h-8 w-8 rounded-full bg-white text-brand-primary",
  tertiary: "h-auto w-auto p-0 text-current",
};

const buttonPaddingClass = computed(() => {
  if (props.variant === "tertiary") {
    return hasIcon.value ? "px-6" : "px-8";
  }

  return hasIcon.value ? "pl-2 pr-6" : "px-6";
});

const buttonClass = computed(() => [
  "group preset-heading-s-variant inline-flex h-12 items-center rounded-full transition-colors",
  rootVariantClassMap[props.variant],
  props.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
  buttonPaddingClass.value,
]);

const contentClass = computed(() => [
  "flex items-center transition-[gap] duration-200",
  contentVariantClassMap[props.variant],
]);

const iconWrapperClass = computed(() => [
  "flex items-center justify-center transition-[gap] duration-200",
  iconWrapperVariantClassMap[props.variant],
]);
</script>

<template>
  <button :type="type" :disabled="disabled" :class="buttonClass">
    <span :class="contentClass">
      <span v-if="hasIcon" :class="iconWrapperClass" aria-hidden="true">
        <slot name="icon" />
      </span>

      <span class="preset-heading-s-variant h-3">
        <slot />
      </span>
    </span>
  </button>
</template>

<style scoped>
.group :deep(svg) {
  fill: currentColor;
}
</style>
