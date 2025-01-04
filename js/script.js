// Referencias al DOM
const productosContainer = document.getElementById("productos-container");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const contactForm = document.getElementById("contact-form");
const btnAgregarList = document.querySelectorAll(".btn-agregar");

// Carrito en memoria
let cart = [];

// Inicializar Carrito (si deseas persistencia)
function initCart() {
  const storedCart = sessionStorage.getItem("taller3dCart"); 
  if (storedCart) {
    cart = JSON.parse(storedCart);
    renderCart();
  }
}
function saveCart() {
  sessionStorage.setItem("taller3dCart", JSON.stringify(cart));
}

// Renderizar Carrito
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.precio;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.nombre}</span> 
      <span>$${item.precio.toFixed(2)}</span>
      <button data-index="${index}">X</button>
    `;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = total.toFixed(2);
}

// Agregar al Carrito (simulación con datos de la card)
function addToCart(nombre, precio) {
  cart.push({ nombre, precio });
  renderCart();
  saveCart();
}

// Eliminar del Carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
  saveCart();
}

// Evento en cada botón "Agregar al Carrito"
btnAgregarList.forEach(btn => {
  btn.addEventListener("click", (e) => {
    // Buscamos los datos del producto en el card
    const card = e.target.closest(".card-producto");
    const nombre = card.querySelector("h3").innerText;
    const precioText = card.querySelector("p").innerText.replace('$','').replace(' ARS','');
    const precio = parseFloat(precioText);
    addToCart(nombre, precio);
  });

  // Evento para mostrar/ocultar descripción
  cardClickDescription(card = btn.closest(".card-producto"));
});

// Función para mostrar/ocultar descripción al hacer clic fuera del botón
function cardClickDescription(card) {
  card.addEventListener("click", (e) => {
    // Evitar colisión con el botón
    if (e.target.classList.contains("btn-agregar")) return;
    const descripcion = card.querySelector(".descripcion-oculta");
    descripcion.style.display = descripcion.style.display === "none" ? "block" : "none";
  });
}

// Listener para eliminar ítems del carrito
cartItems.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = e.target.getAttribute("data-index");
    removeFromCart(index);
  }
});

// Checkout
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("El carrito está vacío.");
  } else {
    alert("¡Gracias por tu compra!");
    cart = [];
    renderCart();
    saveCart();
  }
});

// Validación de Formulario de Contacto
contactForm.addEventListener("submit", (e) => {
  const nombre = contactForm.nombre.value.trim();
  const correo = contactForm.correo.value.trim();
  const mensaje = contactForm.mensaje.value.trim();

  if (!nombre || !correo || !mensaje) {
    console.log("Por favor, completa todos los campos antes de enviar.");
    // e.preventDefault(); // Si deseas cancelar el envío
  } else {
    console.log("Formulario completo. Se envía el formulario.");
  }
});

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  initCart();
});