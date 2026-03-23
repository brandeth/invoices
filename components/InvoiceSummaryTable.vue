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
  <section class="overflow-hidden rounded-[8px] bg-[#f9fafe]" aria-label="Invoice summary">
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th
            class="preset-body px-8 pt-8 pb-6 text-left font-medium text-brand-muted-dark"
            scope="col"
          >
            Item Name
          </th>
          <th
            class="preset-body px-8 pt-8 pb-6 text-center font-medium text-brand-muted-dark"
            scope="col"
          >
            QTY.
          </th>
          <th
            class="preset-body px-8 pt-8 pb-6 text-right font-medium text-brand-muted-dark"
            scope="col"
          >
            Price
          </th>
          <th
            class="preset-body px-8 pt-8 pb-6 text-right font-medium text-brand-muted-dark"
            scope="col"
          >
            Total
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="`${item.name}-${item.quantity}-${item.total}`">
          <td class="px-8 py-4 align-top">
            <span class="preset-heading-s-variant text-brand-black">{{ item.name }}</span>
          </td>
          <td class="px-8 py-4 text-center align-top">
            <span class="preset-heading-s-variant text-brand-muted-dark">{{ item.quantity }}</span>
          </td>
          <td class="px-8 py-4 text-right align-top">
            <span class="preset-heading-s-variant text-brand-muted-dark">{{ item.price }}</span>
          </td>
          <td class="px-8 py-4 text-right align-top">
            <span class="preset-heading-s-variant text-brand-black">{{ item.total }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <footer class="flex items-center justify-between bg-[#373b53] px-8 py-6 text-white">
      <span class="preset-body">Amount Due</span>
      <span class="preset-heading-m">{{ amountDue }}</span>
    </footer>
  </section>
</template>