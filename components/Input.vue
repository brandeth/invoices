<script setup lang="ts">
import { computed, useAttrs, useId, type InputHTMLAttributes } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  label: string;
  id?: string;
}>();

const attrs = useAttrs() as InputHTMLAttributes;
const generatedId = useId();

const inputId = computed(() => props.id || generatedId);

const inputAttrs = computed(() => {
  const { class: _class, id: _id, ...rest } = attrs;

  return rest;
});

const inputClass = computed(() => [
  "preset-heading-s-variant min-w-[240px] rounded-[4px] border border-brand-muted-light px-5 py-[18px] text-brand-black caret-brand-primary transition-colors focus:border-brand-primary-light focus:outline-none dark:border-brand-dark-light dark:bg-brand-dark dark:text-white dark:focus:border-brand-primary",
  attrs.class,
]);
</script>

<template>
  <div class="flex flex-col gap-[9px]">
    <label
      :for="inputId"
      class="preset-body-variant text-brand-muted-dark dark:text-brand-muted-light"
    >
      {{ label }}
    </label>

    <input :id="inputId" v-bind="inputAttrs" :class="inputClass" />
  </div>
</template>
