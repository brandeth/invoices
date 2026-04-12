<script setup lang="ts">
import { computed, useAttrs, useId, type InputHTMLAttributes } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  label: string;
  hideLabel?: boolean;
  id?: string;
  type?: string;
  modelValue?: string | number;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const attrs = useAttrs() as InputHTMLAttributes;
const generatedId = useId();

const inputId = computed(() => props.id || generatedId);

const inputAttrs = computed(() => {
  const { class: _class, id: _id, modelValue: _modelValue, ...rest } = attrs;

  return rest;
});

const containerClass = computed(() => [
  "flex min-w-0 flex-col gap-[9px]",
  attrs.class,
]);

const labelClass = computed(() => [
  "preset-body-variant text-brand-muted-dark dark:text-brand-muted-light",
  props.hideLabel &&
    "absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [-webkit-clip-path:inset(50%)] [clip-path:inset(50%)] [-webkit-clip:rect(0,0,0,0)] [clip:rect(0,0,0,0)]",
]);

function handleInput(event: Event) {
  const target = event.target;

  if (target instanceof HTMLInputElement) {
    emit("update:modelValue", target.value);
  }
}

const inputClass = computed(() => [
  "preset-heading-s-variant min-w-0 w-full rounded-[4px] border border-brand-muted-light px-5 py-[18px] text-brand-black caret-brand-primary transition-colors focus:border-brand-primary-light focus:outline-none dark:border-brand-dark-light dark:bg-brand-dark dark:text-white dark:focus:border-brand-primary",
]);
</script>

<template>
  <div :class="containerClass">
    <label :for="inputId" :class="labelClass">
      {{ label }}
    </label>

    <input
      :id="inputId"
      :type="props.type || 'text'"
      :value="props.modelValue"
      v-bind="inputAttrs"
      :class="inputClass"
      @input="handleInput"
    />
  </div>
</template>
