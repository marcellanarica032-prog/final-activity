const products = [
  { id: 1, name: "Lipstick", price: 350 },
  { id: 2, name: "Foundation", price: 599 },
  { id: 3, name: "Mascara", price: 450 },
  { id: 4, name: "Blush", price: 320 }
];

let cart = [];

const productParent = document.getElementById("product-parent");
const cartContainer = document.getElementById("cart-container");
const total = document.getElementById("cart-total");
const count = document.getElementById("cart-count");

products.forEach((p) => {
  productParent.innerHTML += `
    <div class="product-container">
      <h3>${p.name}</h3>
      <p>₱${p.price}</p>
      <button onclick="addToCart(${p.id})">
        Add to Cart
      </button>
    </div>
  `;
});

function addToCart(id) {

  let item = cart.find((p) => p.id === id);

  if (item) {
    item.qty++;
  } else {
    let product = products.find((p) => p.id === id);

    cart.push({
      ...product,
      qty: 1
    });
  }

  showCart();
}

function showCart() {

  cartContainer.innerHTML = "";

  let cartTotal = 0;
  let itemCount = 0;

  cart.forEach((item) => {

    let sub = item.price * item.qty;

    cartTotal += sub;

    itemCount += item.qty;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>₱${item.price}</p>
        <p>Qty: ${item.qty}</p>
        <p>Subtotal: ₱${sub}</p>

        <button onclick="item.qty++; showCart()">
          +
        </button>

        <button onclick="item.qty--; if(item.qty==0) removeItem(${item.id}); showCart()">
          -
        </button>

        <button onclick="removeItem(${item.id})">
          Remove
        </button>
      </div>
    `;
  });

  total.innerText = cartTotal;

  count.innerText = itemCount;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  }
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  showCart();
}

document.getElementById("clear-cart").onclick = () => {
  cart = [];
  showCart();
};