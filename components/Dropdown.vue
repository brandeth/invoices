<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId } from "vue";

type DropdownOption = {
  label: string;
  value: string;
};

const props = withDefaults(
  defineProps<{
    options: DropdownOption[];
    modelValue?: string;
    placeholder?: string;
    label?: string;
  }>(),
  {
    modelValue: undefined,
    placeholder: "Select an option",
    label: undefined,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const rootRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const listboxId = useId();
const triggerId = useId();

const selectedOption = computed(() =>
  props.options.find((option) => option.value === props.modelValue),
);

const triggerLabel = computed(
  () => selectedOption.value?.label ?? props.placeholder,
);

const triggerClass = computed(() => [
  "preset-heading-s-variant flex min-w-60 w-full items-center justify-between gap-4 rounded-[4px] border bg-white px-[18px] py-[20px] text-left text-brand-black transition-colors outline-none cursor-pointer dark:border-brand-dark-light dark:bg-brand-dark dark:text-white",
  isOpen.value
    ? "border-brand-primary"
    : "border-brand-muted-light hover:border-brand-primary focus-visible:border-brand-primary",
]);

const itemClass = (value: string) => [
  "preset-heading-s-variant flex w-full cursor-pointer items-center px-6 py-[18px] text-left text-brand-black transition-colors hover:text-brand-primary focus-visible:text-brand-primary focus-visible:outline-none dark:text-brand-muted-light",
  props.modelValue === value
    ? "text-brand-primary dark:text-brand-primary-light"
    : "",
];

function closeDropdown() {
  isOpen.value = false;
}

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option: DropdownOption) {
  emit("update:modelValue", option.value);
  closeDropdown();
}

function handleDocumentPointerDown(event: PointerEvent) {
  if (!rootRef.value) {
    return;
  }

  const target = event.target;

  if (!(target instanceof Node) || rootRef.value.contains(target)) {
    return;
  }

  closeDropdown();
}

function handleEscape() {
  closeDropdown();
}

onMounted(() => {
  document.addEventListener("pointerdown", handleDocumentPointerDown);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", handleDocumentPointerDown);
});
</script>

<template>
  <div
    ref="rootRef"
    class="flex min-w-60 w-full flex-col gap-[9px]"
    @keydown.esc.prevent="handleEscape"
  >
    <label
      v-if="label"
      :for="triggerId"
      class="preset-body-variant text-brand-muted-dark dark:text-brand-muted-light"
    >
      {{ label }}
    </label>

    <div class="relative inline-block min-w-60 w-full">
      <button
        :id="triggerId"
        type="button"
        :class="triggerClass"
        :aria-controls="listboxId"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        @click="toggleDropdown"
      >
        <span class="truncate">
          {{ triggerLabel }}
        </span>

        <img
          src="/icons/dropdown.svg"
          alt=""
          class="h-1.75 w-2.5 shrink-0"
          aria-hidden="true"
        />
      </button>

      <ul
        v-if="isOpen"
        :id="listboxId"
        role="listbox"
        class="absolute left-0 top-full z-10 mt-6 w-full overflow-hidden rounded-lg bg-white shadow-xl divide-y divide-brand-muted-light dark:divide-brand-dark dark:bg-brand-dark-light"
      >
        <li v-for="option in options" :key="option.value" role="presentation">
          <button
            type="button"
            role="option"
            :aria-selected="modelValue === option.value"
            :class="itemClass(option.value)"
            @click="selectOption(option)"
          >
            {{ option.label }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
