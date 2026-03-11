<template>
  <div class="card">
    <div class="card-category">{{ product.category.title }}</div>
    <div class="card-name">{{ product.name }}</div>
    <p class="card-price">R$ {{ product.price.toFixed(2) }}</p>
    <button class="card-btn" @click="$emit('add-to-cart', product)">
      + Adicionar
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { IProduct } from "../models/Product";

export default defineComponent({
  name: "ProductCard",
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
  },
  emits: ["add-to-cart"],
});
</script>

<style scoped>
.card {
  background: #111120;
  border: 1px solid #1e1e2e;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color 0.2s, transform 0.2s;
}

.card:hover {
  border-color: #7c3aed;
  transform: translateY(-4px);
}

.card-category {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #7c3aed;
}

.card-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #f0ede8 !important;
}

.card-price {
  font-size: 1.4rem;
  font-weight: 500;
  color: #f0ede8;
  margin-top: 4px;
}

.card-btn {
  margin-top: auto;
  padding: 10px;
  background: transparent;
  border: 1px solid #7c3aed;
  border-radius: 8px;
  color: #7c3aed;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.card-btn:hover {
  background: #7c3aed;
  color: white;
}
</style>