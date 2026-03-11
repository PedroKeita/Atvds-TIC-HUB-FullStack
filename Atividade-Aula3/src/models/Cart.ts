import type { IProduct } from "./Product";

export interface CartItem {
  product: IProduct;
  quantity: number;
}

export class Cart {
  items: CartItem[] = [];

  addItem(product: IProduct, quantity: number): void {
    const alreadyInCart = this.items.some(
      (item) => item.product.id === product.id
    );

    if (alreadyInCart) {
      this.items = this.items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      this.items.push({ product, quantity });
    }
  }

  removeUnit(productId: number): void {
    this.items = this.items
      .map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
  }

  removeItem(productId: number): void {
    this.items = this.items.filter(
      (item) => item.product.id !== productId
    );
  }

  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getFinalPrice(): number {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}