<script setup lang="ts">
defineProps<{
  items: Array<{
    name: string;
    quantity: number;
    price: string;
    total: string;
  }>;
  amountDue: string;
}>();
</script>

<template>
  <section
    class="overflow-hidden rounded-[8px] bg-[#f9fafe] dark:bg-brand-dark-light"
    aria-label="Invoice summary"
  >
    <table class="block w-full border-collapse sm:table">
      <thead class="hidden sm:table-header-group">
        <tr>
          <th
            class="preset-body px-8 pt-8 pb-6 text-left font-medium text-brand-muted-dark dark:text-brand-muted-light"
            scope="col"
          >
            Item Name
          </th>
          <th
            class="preset-body px-8 pt-8 pb-6 text-center font-medium text-brand-muted-dark dark:text-brand-muted-light"
            scope="col"
          >
            QTY.
          </th>
          <th
            class="preset-body px-8 pt-8 pb-6 text-right font-medium text-brand-muted-dark dark:text-brand-muted-light"
            scope="col"
          >
            Price
          </th>
          <th
            class="preset-body px-8 pt-8 pb-6 text-right font-medium text-brand-muted-dark dark:text-brand-muted-light"
            scope="col"
          >
            Total
          </th>
        </tr>
      </thead>

      <tbody class="block sm:table-row-group">
        <tr
          v-for="item in items"
          :key="`${item.name}-${item.quantity}-${item.total}`"
          class="flex flex-wrap items-center sm:table-row"
        >
          <td
            class="block w-1/2 px-6 py-2 sm:table-cell sm:w-auto sm:px-8 sm:py-4 sm:align-top"
          >
            <span
              class="preset-heading-s-variant text-brand-black dark:text-white"
              >{{ item.name }}</span
            >
            <span
              class="mt-2 block preset-heading-s-variant text-brand-muted-dark dark:text-brand-muted-light sm:hidden"
            >
              {{ item.quantity }} x {{ item.price }}
            </span>
          </td>
          <td class="hidden sm:table-cell px-8 py-4 text-center align-top">
            <span
              class="preset-heading-s-variant text-brand-muted-dark dark:text-brand-muted-light"
              >{{ item.quantity }}</span
            >
          </td>
          <td class="hidden sm:table-cell px-8 py-4 text-right align-top">
            <span
              class="preset-heading-s-variant text-brand-muted-dark dark:text-brand-muted-light"
              >{{ item.price }}</span
            >
          </td>
          <td
            class="block w-1/2 px-6 py-2 text-right sm:table-cell sm:w-auto sm:px-8 sm:py-4 sm:align-top"
          >
            <span
              class="preset-heading-s-variant text-brand-black dark:text-white"
              >{{ item.total }}</span
            >
          </td>
        </tr>
      </tbody>
    </table>

    <footer
      class="flex items-center justify-between bg-[#373b53] dark:bg-black px-6 py-6 text-white sm:px-8"
    >
      <span class="preset-body">Amount Due</span>
      <span class="preset-heading-m">{{ amountDue }}</span>
    </footer>
  </section>
</template>
