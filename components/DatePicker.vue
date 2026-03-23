<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";

type CalendarDay = {
  key: string;
  dayOfMonth: number;
  isoValue: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
};

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
    label?: string;
  }>(),
  {
    modelValue: undefined,
    placeholder: "Select a date",
    label: undefined,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});
const valueFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const rootRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const calendarId = useId();
const triggerId = useId();

function createLocalDate(year: number, monthIndex: number, day: number) {
  return new Date(year, monthIndex, day, 12);
}

function parseModelValue(value?: string) {
  if (!value) {
    return null;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  const parsedDate = createLocalDate(
    Number(year),
    Number(month) - 1,
    Number(day),
  );

  if (
    parsedDate.getFullYear() !== Number(year) ||
    parsedDate.getMonth() !== Number(month) - 1 ||
    parsedDate.getDate() !== Number(day)
  ) {
    return null;
  }

  return parsedDate;
}

function formatIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMonthStart(date: Date) {
  return createLocalDate(date.getFullYear(), date.getMonth(), 1);
}

const today = createLocalDate(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate(),
);

const selectedDate = computed(() => parseModelValue(props.modelValue));

const visibleMonth = ref(getMonthStart(selectedDate.value ?? today));

watch(
  selectedDate,
  (value) => {
    if (value) {
      visibleMonth.value = getMonthStart(value);
    }
  },
  { immediate: false },
);

const triggerLabel = computed(() => {
  if (!selectedDate.value) {
    return props.placeholder;
  }

  return valueFormatter.format(selectedDate.value);
});

const monthLabel = computed(() => monthFormatter.format(visibleMonth.value));

const calendarDays = computed<CalendarDay[]>(() => {
  const monthStart = getMonthStart(visibleMonth.value);
  const startDay = monthStart.getDay();
  const gridStart = createLocalDate(
    monthStart.getFullYear(),
    monthStart.getMonth(),
    1 - startDay,
  );

  return Array.from({ length: 42 }, (_, index) => {
    const date = createLocalDate(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + index,
    );
    const isoValue = formatIsoDate(date);

    return {
      key: isoValue,
      dayOfMonth: date.getDate(),
      isoValue,
      isCurrentMonth: date.getMonth() === visibleMonth.value.getMonth(),
      isToday: isoValue === formatIsoDate(today),
      isSelected: isoValue === props.modelValue,
    };
  });
});

const triggerClass = computed(() => [
  "preset-heading-s-variant flex min-w-0 w-full items-center justify-between gap-4 rounded-[4px] border bg-white px-6 py-[18px] text-left text-brand-black transition-colors outline-none cursor-pointer dark:border-brand-dark-light dark:bg-brand-dark dark:text-white",
  isOpen.value
    ? "border-brand-primary"
    : "border-brand-muted-light hover:border-brand-primary focus-visible:border-brand-primary",
]);

function closeCalendar() {
  isOpen.value = false;
}

function toggleCalendar() {
  isOpen.value = !isOpen.value;

  if (isOpen.value && selectedDate.value) {
    visibleMonth.value = getMonthStart(selectedDate.value);
  }
}

function showPreviousMonth() {
  visibleMonth.value = createLocalDate(
    visibleMonth.value.getFullYear(),
    visibleMonth.value.getMonth() - 1,
    1,
  );
}

function showNextMonth() {
  visibleMonth.value = createLocalDate(
    visibleMonth.value.getFullYear(),
    visibleMonth.value.getMonth() + 1,
    1,
  );
}

function selectDate(isoValue: string) {
  emit("update:modelValue", isoValue);
  closeCalendar();
}

function handleDocumentPointerDown(event: PointerEvent) {
  if (!rootRef.value) {
    return;
  }

  const target = event.target;

  if (!(target instanceof Node) || rootRef.value.contains(target)) {
    return;
  }

  closeCalendar();
}

function handleEscape() {
  closeCalendar();
}

function getDayClass(day: CalendarDay) {
  return [
    "preset-heading-s-variant flex h-[15px] w-[16px] items-center justify-center rounded-[4px] transition-colors outline-none cursor-pointer p-[8px]",
    day.isSelected
      ? "text-brand-primary dark:text-brand-primary-light"
      : day.isToday
        ? "text-brand-black dark:text-white border border-brand-primary"
        : "text-brand-black dark:text-white border border-transparent hover:border-brand-muted-light focus-visible:border-brand-primary",
    !day.isCurrentMonth && !day.isSelected
      ? "opacity-[0.08] dark:text-brand-muted-light"
      : "",
  ];
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
    class="flex min-w-0 w-full flex-col gap-[9px]"
    @keydown.esc.prevent="handleEscape"
  >
    <label
      v-if="label"
      :for="triggerId"
      class="preset-body-variant text-brand-muted-dark dark:text-brand-muted-light"
    >
      {{ label }}
    </label>

    <div class="relative inline-block min-w-0 w-full">
      <button
        :id="triggerId"
        type="button"
        :class="triggerClass"
        :aria-controls="calendarId"
        :aria-expanded="isOpen"
        aria-haspopup="dialog"
        @click="toggleCalendar"
      >
        <span class="truncate">
          {{ triggerLabel }}
        </span>

        <img
          src="/icons/calendar.svg"
          alt=""
          class="h-4 w-4 shrink-0"
          aria-hidden="true"
        />
      </button>

      <div
        v-if="isOpen"
        :id="calendarId"
        class="absolute left-0 top-full z-10 mt-[24px] w-full max-w-[240px] rounded-lg border border-brand-muted-light bg-white p-6 shadow-xl dark:border-brand-dark-light dark:bg-brand-dark-light"
        role="dialog"
        :aria-labelledby="triggerId"
      >
        <!-- mb-6 -->
        <div class="mb-[32px] flex items-center justify-between gap-4">
          <button
            type="button"
            class="flex items-center justify-start rounded-[4px] border border-transparent transition-colors hover:border-brand-primary focus-visible:border-brand-primary focus-visible:outline-none cursor-pointer"
            aria-label="Previous month"
            @click="showPreviousMonth"
          >
            <img
              src="/icons/left-arrow.svg"
              alt=""
              class="h-3 w-3"
              aria-hidden="true"
            />
          </button>

          <p class="preset-heading-s-variant text-brand-black dark:text-white">
            {{ monthLabel }}
          </p>

          <button
            type="button"
            class="flex items-center justify-end rounded-[4px] border border-transparent transition-colors hover:border-brand-primary focus-visible:border-brand-primary focus-visible:outline-none cursor-pointer"
            aria-label="Next month"
            @click="showNextMonth"
          >
            <img
              src="/icons/right-arrow.svg"
              alt=""
              class="h-3 w-3"
              aria-hidden="true"
            />
          </button>
        </div>

        <div class="grid grid-cols-7 gap-y-4 mb-4">
          <span
            v-for="weekday in weekdayLabels"
            :key="weekday"
            class="preset-heading-s-variant text-center text-brand-black dark:text-brand-muted-light"
          >
            {{ weekday }}
          </span>
        </div>

        <!-- mt-4  -->
        <div class="grid grid-cols-7 items-center justify-center gap-y-2">
          <button
            v-for="day in calendarDays"
            :key="day.key"
            type="button"
            :class="getDayClass(day)"
            :aria-pressed="day.isSelected"
            @click="selectDate(day.isoValue)"
          >
            {{ day.dayOfMonth }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
