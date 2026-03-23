<script setup lang="ts">
import DatePicker from "./DatePicker.vue";
import Dropdown from "./Dropdown.vue";
import Input from "./Input.vue";

const props = withDefaults(
  defineProps<{
    mode?: "create" | "edit";
  }>(),
  {
    mode: "create",
  },
);

const title = computed(() =>
  props.mode === "edit" ? "Edit Invoice" : "New Invoice",
);

const billToClientName = ref("");
const billToClientEmail = ref("");
const billToStreetAddress = ref("");
const billToCity = ref("");
const billToPostCode = ref("");
const billToCountry = ref("");
const invoiceDate = ref<string | undefined>(undefined);
const paymentTerms = ref<string | undefined>(undefined);
const projectDescription = ref("");

const paymentTermOptions = [
  { label: "Net 1 Day", value: "net-1" },
  { label: "Net 7 Days", value: "net-7" },
  { label: "Net 14 Days", value: "net-14" },
  { label: "Net 30 Days", value: "net-30" },
];
</script>

<template>
  <aside
    class="h-full w-[719px] shrink-0 overflow-y-auto rounded-r-[20px] bg-white dark:bg-brand-surface-dark"
    aria-label="Invoice form"
  >
    <div class="ml-[103px] w-[calc(100%-103px)] max-w-[616px] space-y-12 px-14 py-14">
      <header>
        <h2 class="preset-heading-m text-brand-black dark:text-white">
          {{ title }}
        </h2>
      </header>

      <form class="space-y-10">
        <section class="space-y-6" aria-labelledby="bill-from-heading">
          <div class="space-y-6">
            <h3
              id="bill-from-heading"
              class="preset-heading-s text-brand-primary"
            >
              Bill From
            </h3>

            <Input
              label="Street Address"
              name="billFromStreetAddress"
              autocomplete="street-address"
              class="min-w-0 w-full"
            />

            <div class="flex items-start gap-6">
              <Input
                label="City"
                name="billFromCity"
                autocomplete="address-level2"
                class="min-w-0 flex-1"
              />

              <Input
                label="Postal Code"
                name="billFromPostalCode"
                autocomplete="postal-code"
                class="min-w-0 flex-1"
              />

              <Input
                label="Country"
                name="billFromCountry"
                autocomplete="country-name"
                class="min-w-0 flex-1"
              />
            </div>
          </div>
        </section>

        <section class="space-y-6" aria-labelledby="bill-to-heading">
          <div class="space-y-6">
            <h3
              id="bill-to-heading"
              class="preset-heading-s text-brand-primary"
            >
              Bill To
            </h3>

            <Input
              v-model="billToClientName"
              label="Client's Name"
              name="billToClientName"
              autocomplete="name"
              class="min-w-0 w-full"
            />

            <Input
              v-model="billToClientEmail"
              label="Client's Email"
              name="billToClientEmail"
              type="email"
              autocomplete="email"
              class="min-w-0 w-full"
            />

            <Input
              v-model="billToStreetAddress"
              label="Street Address"
              name="billToStreetAddress"
              autocomplete="street-address"
              class="min-w-0 w-full"
            />

            <div class="flex items-start gap-6">
              <Input
                v-model="billToCity"
                label="City"
                name="billToCity"
                autocomplete="address-level2"
                class="min-w-0 flex-1"
              />

              <Input
                v-model="billToPostCode"
                label="Post Code"
                name="billToPostCode"
                autocomplete="postal-code"
                class="min-w-0 flex-1"
              />

              <Input
                v-model="billToCountry"
                label="Country"
                name="billToCountry"
                autocomplete="country-name"
                class="min-w-0 flex-1"
              />
            </div>

            <div class="flex items-start gap-6">
              <DatePicker
                v-model="invoiceDate"
                label="Invoice Date"
                placeholder="Select a date"
                class="min-w-0 flex-1"
              />

              <Dropdown
                :model-value="paymentTerms"
                label="Payment Terms"
                placeholder="Select payment terms"
                :options="paymentTermOptions"
                class="min-w-0 flex-1"
                @update:model-value="paymentTerms = $event"
              />
            </div>

            <Input
              v-model="projectDescription"
              label="Project Description"
              name="projectDescription"
              autocomplete="off"
              class="min-w-0 w-full"
            />
          </div>
        </section>
      </form>
    </div>
  </aside>
</template>