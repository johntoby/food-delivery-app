const foods = [
    { id: 1, name: "Margherita Pizza", category: "pizza", price: 12.99, img: "🍕" },
    { id: 2, name: "Pepperoni Pizza", category: "pizza", price: 14.99, img: "🍕" },
    { id: 3, name: "Cheese Burger", category: "burger", price: 9.99, img: "🍔" },
    { id: 4, name: "Bacon Burger", category: "burger", price: 11.99, img: "🍔" },
    { id: 5, name: "Salmon Sushi", category: "sushi", price: 15.99, img: "🍣" },
    { id: 6, name: "Tuna Roll", category: "sushi", price: 13.99, img: "🍣" }
];

let cart = [];

function renderFoods(category = "all") {
    const grid = document.getElementById("foodGrid");
    const filtered = category === "all" ? foods : foods.filter(f => f.category === category);
    
    grid.innerHTML = filtered.map(food => `
        <div class="food-card">
            <div style="font-size: 80px; text-align: center;">${food.img}</div>
            <h3>${food.name}</h3>
            <p class="price">$${food.price}</p>
            <button onclick="addToCart(${food.id})">Add to Cart</button>
        </div>
    `).join("");
}

function addToCart(id) {
    const food = foods.find(f => f.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...food, quantity: 1 });
    }
    
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const total = document.getElementById("total");
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join("");
    
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    total.textContent = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
}

document.querySelectorAll(".category").forEach(btn => {
    btn.addEventListener("click", (e) => {
        document.querySelectorAll(".category").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        renderFoods(e.target.dataset.category);
    });
});

document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length > 0) {
        alert("Order placed! Total: $" + document.getElementById("total").textContent);
        cart = [];
        updateCart();
    }
});

renderFoods();
