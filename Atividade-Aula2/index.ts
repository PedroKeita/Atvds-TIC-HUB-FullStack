import { User } from "./src/User.js";
import { Category } from "./src/Category.js";
import { Product } from "./src/Product.js";
import { Cart } from "./src/Cart.js";

// Categorias
const electronics = new Category(1, "Eletrônicos");
const clothing = new Category(2, "Roupas");

// Produtos
const notebook = new Product(1, "Notebook ", 4500.0, electronics);
const mouse = new Product(2, "Mouse ", 150.0, electronics);
const bola = new Product(3, "bola de basquete", 80.0, clothing);

// Usuários
const admin = new User(1, "pedro gerente", "pedro@loja.com", "ADMIN");
const customer = new User(2, "isadora", "isadora@email.com", "CUSTOMER");

console.log("=== Usuários ===");
console.log(`${admin.name} — Role: ${admin.role}`);
console.log(`${customer.name} — Role: ${customer.role}`);

//  Carrinho de compras
const cart = new Cart();
cart.addItem(notebook, 1);
cart.addItem(mouse, 2);
cart.addItem(bola, 3);
cart.addItem(mouse, 1); 

console.log("\n=== Carrinho ===");
console.log("Total de itens:", cart.getTotalItems());
console.log("Valor total: R$", cart.getFinalPrice());