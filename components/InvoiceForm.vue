<script setup lang="ts">
import DatePicker from "./DatePicker.vue";
import Dropdown from "./Dropdown.vue";
import Input from "./Input.vue";

type LineItem = {
  id: number;
  name: string;
  quantity: string;
  price: string;
};

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
const nextLineItemId = ref(1);

function createLineItem(): LineItem {
  const id = nextLineItemId.value;
  nextLineItemId.value += 1;

  return {
    id,
    name: "",
    quantity: "1",
    price: "0",
  };
}

const lineItems = ref<LineItem[]>([createLineItem(), createLineItem()]);

const paymentTermOptions = [
  { label: "Net 1 Day", value: "net-1" },
  { label: "Net 7 Days", value: "net-7" },
  { label: "Net 14 Days", value: "net-14" },
  { label: "Net 30 Days", value: "net-30" },
];

function handlePaymentTermsUpdate(value: string | string[]) {
  if (typeof value === "string") {
    paymentTerms.value = value;
  }
}

function parseCurrencyInput(value: string) {
  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : 0;
}

function getLineItemTotal(item: LineItem) {
  const quantity = parseCurrencyInput(item.quantity);
  const price = parseCurrencyInput(item.price);

  return (quantity * price).toFixed(2);
}

function addLineItem() {
  lineItems.value.push(createLineItem());
}

function removeLineItem(id: number) {
  if (lineItems.value.length === 1) {
    lineItems.value = [createLineItem()];
    return;
  }

  lineItems.value = lineItems.value.filter((item) => item.id !== id);
}
</script>

<template>
  <aside
    class="h-full w-[719px] shrink-0 overflow-y-auto rounded-r-[20px] bg-white dark:bg-brand-surface-dark"
    aria-label="Invoice form"
  >
    <div
      class="ml-[103px] w-[calc(100%-103px)] max-w-[616px] space-y-12 px-14 py-14"
    >
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
                @update:model-value="handlePaymentTermsUpdate"
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

        <section class="space-y-6" aria-labelledby="item-list-heading">
          <div class="space-y-4">
            <h3
              id="item-list-heading"
              class="preset-heading-m text-brand-muted-dark dark:text-brand-muted-light"
            >
              Item List
            </h3>

            <div
              class="hidden grid-cols-[minmax(0,1fr)_72px_112px_minmax(72px,max-content)_40px] items-center gap-4 md:grid"
              aria-hidden="true"
            >
              <span
                class="preset-body-variant text-brand-muted-dark dark:text-brand-muted-light"
              >
                Item Name
              </span>
              <span
                class="preset-body-variant text-brand-muted-dark dark:text-brand-muted-light"
              >
                Qty.
              </span>
              <span
                class="preset-body-variant text-brand-muted-dark dark:text-brand-muted-light"
              >
                Price
              </span>
              <span
                class="preset-body-variant text-brand-muted-dark dark:text-brand-muted-light"
              >
                Total
              </span>
              <span />
            </div>

            <div>
              <div
                v-for="(item, index) in lineItems"
                :key="item.id"
                class="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_72px_112px_minmax(72px,max-content)_40px] md:items-start"
              >
                <Input
                  v-model="item.name"
                  label="Item Name"
                  hide-label
                  :name="`lineItemName-${item.id}`"
                  autocomplete="off"
                  class="min-w-0"
                />

                <Input
                  v-model="item.quantity"
                  label="Qty."
                  hide-label
                  :name="`lineItemQuantity-${item.id}`"
                  type="number"
                  min="0"
                  step="1"
                  inputmode="numeric"
                  class="min-w-0"
                />

                <Input
                  v-model="item.price"
                  label="Price"
                  hide-label
                  :name="`lineItemPrice-${item.id}`"
                  type="number"
                  min="0"
                  step="0.01"
                  inputmode="decimal"
                  class="min-w-0"
                />

                <div
                  class="flex min-w-0 flex-col gap-2.25 md:justify-self-start"
                >
                  <span
                    class="absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [-webkit-clip-path:inset(50%)] [clip-path:inset(50%)] [-webkit-clip:rect(0,0,0,0)] [clip:rect(0,0,0,0)] text-brand-muted-dark dark:text-brand-muted-light"
                  >
                    Total
                  </span>

                  <div class="flex h-14 items-center">
                    <span
                      class="preset-heading-s-variant text-brand-muted-dark dark:text-brand-muted-light"
                    >
                      {{ getLineItemTotal(item) }}
                    </span>
                  </div>
                </div>

                <div class="flex items-end md:h-full md:pb-4.5">
                  <button
                    type="button"
                    class="flex h-14 w-10 items-center justify-center text-brand-muted-dark transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary dark:text-brand-muted-light"
                    :aria-label="`Delete item ${index + 1}`"
                    @click="removeLineItem(item.id)"
                  >
                    <img
                      src="/icons/trash.svg"
                      alt=""
                      aria-hidden="true"
                      class="h-4 w-3.25"
                    />
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              class="preset-heading-s-variant flex h-12 w-full items-center justify-center rounded-full bg-[#f9fafe] px-6 text-brand-muted-dark transition-colors hover:bg-brand-muted-light hover:text-brand-muted-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-muted-dark dark:bg-brand-dark-light dark:text-brand-muted-light dark:hover:bg-brand-muted-light"
              @click="addLineItem"
            >
              + Add New Item
            </button>
          </div>
        </section>
      </form>
    </div>
  </aside>
</template>
