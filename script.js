let cartCount = 0;
// Efek scroll sederhana untuk navbar
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    if (window.scrollY > 50) {
        nav.style.background = '#ffffffee';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.background = 'rgba(255,255,255,0.9)';
        nav.style.boxShadow = 'none';
    }
});

// Data Produk
const products = [
  {
    id: 1,
    name: "Caramel Latte",
    price: "$12",
    img: "caramel.png",
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "Vanilla Cappuccino",
    price: "$10",
    img: "vanilla.png",
    tag: "Popular"
  },
  {
    id: 3,
    name: "Mocha Chocolate",
    price: "$16",
    img: "mocha.png",
    tag: "New"
  },
  {
    id: 4,
    name: "Espresso Strong",
    price: "$8",
    img: "espresso.png",
    tag: "Classic"
  }
];

const container = document.getElementById('product-container');
const reveals = document.querySelectorAll(".feature-card");
window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
});

// Render Produk ke dalam HTML
products.forEach(product => {
  container.innerHTML += `
    <div class="col-lg-3 col-md-6">
      <div class="product-card premium-card h-100 text-center">

        <div class="badge-tag">${product.tag}</div>

        <div class="product-image-bg">
          <img src="${product.img}" alt="${product.name}" class="img-fluid">
        </div>

        <div class="p-3">
          <p class="fw-bold mb-1">${product.name}</p>
          <span class="fw-bold d-block mb-3">${product.price}</span>

          <button class="btn btn-add-cart premium-btn"
            onclick="addToCart(this, '${product.name}')">
            ADD TO CART
          </button>
        </div>

      </div>
    </div>
  `;
});

// Efek Scroll Reveal sederhana
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        const speed = 0.05;
        const rect = card.getBoundingClientRect();
        if(rect.top < window.innerHeight) {
            card.style.opacity = '1';
        }
    });
});
//cart
function changeQty(btn, change){
  const qtyEl = btn.parentElement.querySelector('.qty');
  let value = parseInt(qtyEl.innerText);

  value += change;
  if(value < 1) value = 1;

  qtyEl.innerText = value;
}

let cart = 0;
function addToCart(btn, name){
  const parent = btn.parentElement;
  const qtyEl = parent.querySelector('.qty');

  let qty = 1; // default
  if(qtyEl){
    qty = parseInt(qtyEl.innerText);
  }

  cartCount += qty;

  const cartEl = document.getElementById("cart-count");
  if (cartEl) {
    cartEl.innerText = cartCount;
  }

  showToast(`☕ ${name} ditambahkan (${qty})`);
}

// toast notifikasi
function showToast(text){
  const toast = document.getElementById('toast');
  toast.innerText = text;
  toast.classList.add('show');

  setTimeout(()=>{
    toast.classList.remove('show');
  },2000);
}