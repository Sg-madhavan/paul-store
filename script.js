let cart = [];

// 🔽 BACKEND la irundhu products load panna function
async function loadProducts() {
  try {
    let res = await fetch("http://localhost:5000/api/products");
    let data = await res.json();

    let container = document.querySelector(".product-grid");
    container.innerHTML = "";

    data.forEach(p => {
      container.innerHTML += `
        <div class="card">
          <img src="https://via.placeholder.com/200" />
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <button onclick="addToCart('${p.name}')">Customize</button>
        </div>
      `;
    });

  } catch (err) {
    console.error("Error loading products:", err);
  }
}

// 🔽 Add to cart
function addToCart(product) {
  cart.push(product);
  alert(product + " added to cart!");
}

// 🔽 Open cart modal
function openCart() {
  document.getElementById("cartModal").style.display = "block";
  let list = document.getElementById("cartItems");
  list.innerHTML = "";

  cart.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  // Place order button add pannuvom
  list.innerHTML += `<button onclick="placeOrder()">Place Order</button>`;
}

// 🔽 Close cart
function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

// 🔽 Backend ku order send panna function
async function placeOrder() {
  try {
    let res = await fetch("http://localhost:5000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items: cart })
    });

    let data = await res.json();
    alert(data.message);

    cart = []; // clear cart
    closeCart();

  } catch (err) {
    console.error("Order error:", err);
  }
}

// 🔥 PAGE LOAD aagumbothu automatic ah products load aaganum
loadProducts();
