<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId } from "vue";

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownVariant = "default" | "status-filter";

type DropdownValue = string | string[] | undefined;

const props = withDefaults(
  defineProps<{
    options: DropdownOption[];
    modelValue?: DropdownValue;
    placeholder?: string;
    label?: string;
    variant?: DropdownVariant;
    multiple?: boolean;
  }>(),
  {
    modelValue: undefined,
    placeholder: "Select an option",
    label: undefined,
    variant: "default",
    multiple: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string | string[]];
}>();

const rootRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const menuId = useId();
const triggerId = useId();

const isStatusFilterVariant = computed(() => props.variant === "status-filter");

const selectedValue = computed(() =>
  typeof props.modelValue === "string" ? props.modelValue : undefined,
);

const selectedValues = computed(() =>
  Array.isArray(props.modelValue) ? props.modelValue : [],
);

const selectedOption = computed(() =>
  props.options.find((option) => option.value === selectedValue.value),
);

const selectedCount = computed(() => selectedValues.value.length);

const triggerLabel = computed(() => {
  if (!isStatusFilterVariant.value) {
    return selectedOption.value?.label ?? props.placeholder;
  }

  return props.placeholder;
});

const triggerClass = computed(() => [
  isStatusFilterVariant.value
    ? "preset-heading-s-variant inline-flex cursor-pointer items-center gap-3 bg-transparent p-0 text-left text-brand-black outline-none focus-visible:text-brand-primary sm:w-full sm:max-w-[117.46px] sm:justify-between dark:text-white"
    : "preset-heading-s-variant flex min-w-0 w-full items-center justify-between gap-4 rounded-[4px] border bg-white px-6 py-[18px] text-left text-brand-black transition-colors outline-none cursor-pointer dark:border-brand-dark-light dark:bg-brand-dark dark:text-white",
  isStatusFilterVariant.value
    ? ""
    : isOpen.value
      ? "border-brand-primary"
      : "border-brand-muted-light hover:border-brand-primary focus-visible:border-brand-primary",
]);

const defaultItemClass = (value: string) => [
  "preset-heading-s-variant flex w-full cursor-pointer items-center px-6 py-[18px] text-left text-brand-black transition-colors hover:text-brand-primary focus-visible:text-brand-primary focus-visible:outline-none dark:text-brand-muted-light",
  selectedValue.value === value
    ? "text-brand-primary dark:text-brand-primary-light"
    : "",
];

function isSelected(value: string) {
  return selectedValues.value.includes(value);
}

function statusFilterItemClass(value: string) {
  return [
    "group preset-heading-s flex w-full cursor-pointer items-center gap-3.25 text-left text-brand-black outline-none dark:text-white",
    isSelected(value) ? "text-brand-black dark:text-white" : "",
  ];
}

function statusFilterCheckboxClass(value: string) {
  return [
    "flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border border-[#979797] bg-brand-muted-light transition-colors group-hover:border-brand-primary group-focus-visible:border-brand-primary dark:border-brand-dark dark:bg-brand-dark",
    isSelected(value)
      ? "border-brand-primary bg-brand-primary dark:bg-brand-primary"
      : "",
  ];
}

const containerClass = computed(() =>
  isStatusFilterVariant.value
    ? "flex flex-col sm:w-full sm:max-w-[117.46px] sm:shrink-0"
    : "flex min-w-0 w-full flex-col gap-2.25",
);

const wrapperClass = computed(() =>
  isStatusFilterVariant.value
    ? "relative sm:w-full sm:max-w-[117.46px] sm:shrink-0"
    : "relative inline-block min-w-0 w-full",
);

const menuClass = computed(() =>
  isStatusFilterVariant.value
    ? "absolute left-1/2 top-full z-10 mt-6 min-w-48 -translate-x-1/2 rounded-lg bg-white p-6 shadow-[0_10px_20px_0_rgba(72,84,159,0.25)] dark:bg-brand-dark-light dark:shadow-sm"
    : "absolute left-0 top-full z-10 mt-6 w-full overflow-hidden rounded-lg bg-white shadow-xl divide-y divide-brand-muted-light dark:divide-brand-dark dark:bg-brand-dark-light",
);

function closeDropdown() {
  isOpen.value = false;
}

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option: DropdownOption) {
  if (props.multiple || isStatusFilterVariant.value) {
    const nextValue = isSelected(option.value)
      ? selectedValues.value.filter((item) => item !== option.value)
      : [...selectedValues.value, option.value];

    emit("update:modelValue", nextValue);
    return;
  }

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

function handleDocumentKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    closeDropdown();
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
    ref="rootRef"
    :class="containerClass"
    @keydown.esc.prevent="handleEscape"
  >
    <label
      v-if="label"
      :for="triggerId"
      class="preset-body-variant text-brand-muted-dark dark:text-brand-muted-light"
    >
      {{ label }}
    </label>

    <div :class="wrapperClass">
      <button
        :id="triggerId"
        type="button"
        :class="triggerClass"
        :aria-controls="menuId"
        :aria-expanded="isOpen"
        :aria-haspopup="isStatusFilterVariant ? 'menu' : 'listbox'"
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
        :id="menuId"
        :role="isStatusFilterVariant ? 'menu' : 'listbox'"
        :aria-labelledby="isStatusFilterVariant ? triggerId : undefined"
        :class="menuClass"
      >
        <li
          v-for="option in options"
          :key="option.value"
          :class="isStatusFilterVariant ? 'not-last:mb-4' : ''"
          :role="isStatusFilterVariant ? 'none' : 'presentation'"
        >
          <button
            type="button"
            :role="isStatusFilterVariant ? 'menuitemcheckbox' : 'option'"
            :aria-checked="
              isStatusFilterVariant ? isSelected(option.value) : undefined
            "
            :aria-selected="
              !isStatusFilterVariant
                ? selectedValue === option.value
                : undefined
            "
            :class="
              isStatusFilterVariant
                ? statusFilterItemClass(option.value)
                : defaultItemClass(option.value)
            "
            @click="selectOption(option)"
          >
            <template v-if="isStatusFilterVariant">
              <span
                :class="statusFilterCheckboxClass(option.value)"
                aria-hidden="true"
              >
                <img
                  v-if="isSelected(option.value)"
                  src="/icons/check.svg"
                  alt=""
                  class="h-2.5 w-2.5"
                />
              </span>

              <span>{{ option.label }}</span>
            </template>

            <template v-else>
              {{ option.label }}
            </template>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
