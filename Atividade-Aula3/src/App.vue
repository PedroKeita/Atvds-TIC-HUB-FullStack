<template>
  <div class="app">
    <header class="header">
      <h1>KeitaStore</h1>
      <span class="cart-badge" v-if="totalItems > 0">{{ totalItems }} itens</span>
    </header>

    <main class="main">
      <section class="products-section">
        <h2 class="section-title">Produtos</h2>
        <div class="products">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
      </section>

      <aside class="cart-section">
        <h2 class="section-title">🛒 Carrinho</h2>

        <div v-if="cartItems.length > 0">
          <table class="cart-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartItems" :key="item.product.id">
                <td>{{ item.product.name }}</td>
                <td class="qty-cell">
                  <button class="qty-btn" @click="removeUnit(item.product.id)">−</button>
                  {{ item.quantity }}
                  <button class="qty-btn" @click="addToCart(item.product)">+</button>
                </td>
                <td>R$ {{ (item.product.price * item.quantity).toFixed(2) }}</td>
                <td>
                  <button class="remove-btn" @click="removeItem(item.product.id)">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="cart-footer">
            <div class="cart-total-row">
              <span>Total de itens</span>
              <strong>{{ totalItems }}</strong>
            </div>
            <div class="cart-total-row highlight">
              <span>Preço final</span>
              <strong>R$ {{ finalPrice }}</strong>
            </div>
            <button class="checkout-btn">Finalizar compra</button>
          </div>
        </div>

        <div v-else class="empty-cart">
          <p>🛍️</p>
          <p>Seu carrinho está vazio</p>
        </div>
      </aside>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductCard from "./components/ProductCard.vue";
import { Product } from "./models/Product";
import { Category } from "./models/Category";
import type { IProduct } from "./models/Product";
import type { CartItem } from "./models/Cart";

export default defineComponent({
  name: "App",
  components: { ProductCard },

  data() {
    const electronics = new Category(1, "Eletrônicos");
    const sport = new Category(2, "Esportes");
    return {
      cartItems: [] as CartItem[],
      products: [
        new Product(1, "Notebook ", 4500.0, electronics),
        new Product(2, "Mouse ", 150.0, electronics),
        new Product(3, "Bola de basquete", 80.0, sport),
      ] as IProduct[],
    };
  },

  computed: {
    totalItems(): number {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    finalPrice(): string {
      return this.cartItems
        .reduce((total, item) => total + item.product.price * item.quantity, 0)
        .toFixed(2);
    },
  },

  methods: {
    addToCart(product: IProduct): void {
      const index = this.cartItems.findIndex((item) => item.product.id === product.id);
      if (index >= 0) {
        this.cartItems[index].quantity += 1;
      } else {
        this.cartItems.push({ product, quantity: 1 });
      }
    },
    removeUnit(productId: number): void {
      const index = this.cartItems.findIndex((item) => item.product.id === productId);
      if (index >= 0) {
        if (this.cartItems[index].quantity > 1) {
          this.cartItems[index].quantity -= 1;
        } else {
          this.cartItems.splice(index, 1);
        }
      }
    },
    removeItem(productId: number): void {
      const index = this.cartItems.findIndex((item) => item.product.id === productId);
      if (index >= 0) this.cartItems.splice(index, 1);
    },
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app {
  min-height: 100vh;
  background: #0a0a0f;
  color: #f0ede8;
  font-family: 'DM Sans', sans-serif;
}

/* HEADER */
.header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 28px 48px;
  border-bottom: 1px solid #1e1e2e;
  background: #0d0d16;
}

.header h1 {
  font-family: 'Syne', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #f0ede8;
}

.cart-badge {
  background: #7c3aed;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
}

/* LAYOUT */
.main {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  padding: 40px 48px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-family: 'Syne', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #a89ec9;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 24px;
}

/* PRODUCTS GRID */
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

/* CART */
.cart-section {
  background: #111120;
  border: 1px solid #1e1e2e;
  border-radius: 16px;
  padding: 28px;
  height: fit-content;
  position: sticky;
  top: 24px;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.cart-table th {
  text-align: left;
  color: #6b6b8a;
  font-weight: 500;
  padding: 0 8px 12px;
  border-bottom: 1px solid #1e1e2e;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cart-table td {
  padding: 14px 8px;
  border-bottom: 1px solid #1a1a2e;
  vertical-align: middle;
}

.qty-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.qty-btn {
  background: #1e1e2e;
  border: none;
  color: #f0ede8;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.qty-btn:hover {
  background: #7c3aed;
}

.remove-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.remove-btn:hover {
  opacity: 1;
}

.cart-footer {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-total-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #a89ec9;
}

.cart-total-row.highlight {
  font-size: 1.1rem;
  color: #f0ede8;
  padding-top: 10px;
  border-top: 1px solid #1e1e2e;
}

.checkout-btn {
  margin-top: 8px;
  width: 100%;
  padding: 14px;
  background: #7c3aed;
  border: none;
  border-radius: 10px;
  color: white;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: background 0.2s, transform 0.1s;
}

.checkout-btn:hover {
  background: #6d28d9;
  transform: translateY(-1px);
}

.empty-cart {
  text-align: center;
  padding: 40px 0;
  color: #4a4a6a;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.empty-cart p:first-child {
  font-size: 2.5rem;
}
</style>