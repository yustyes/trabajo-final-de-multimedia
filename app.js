let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarProducto(nombre, precio) {
    const producto = { nombre, precio };
    carrito.push(producto);
    guardarCarrito();
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");

    if (!lista || !totalElemento) return;

    lista.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio;

        lista.innerHTML += `
            <li>
                ${producto.nombre} - $${producto.precio}
                <button onclick="eliminarProducto(${index})">X</button>
            </li>
        `;
    });

    totalElemento.textContent = total;
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    guardarCarrito();
}

document.addEventListener("DOMContentLoaded", actualizarCarrito);


if(localStorage.getItem("modo") === "oscuro"){
    document.body.classList.add("dark");
    document.body.classList.add("dark-mode");
}

// Pone el icono correcto al cargar
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".theme-toggle i");
    if(!btn) return;

    if(document.body.classList.contains("dark") || document.body.classList.contains("dark-mode")){
        btn.classList.remove("fa-sun");
        btn.classList.add("fa-moon");
    }else{
        btn.classList.remove("fa-moon");
        btn.classList.add("fa-sun");
    }
});

function cambiarModo(){
    const icon = document.querySelector(".theme-toggle i");
    const button = document.querySelector(".theme-toggle");

    // animación
    if(button) button.classList.add("anim");

    setTimeout(() => {
        document.body.classList.toggle("dark");
        document.body.classList.toggle("dark-mode");

        // cambia icono
        if(icon){
            if(document.body.classList.contains("dark") || document.body.classList.contains("dark-mode")){
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
            }else{
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            }
        }

        if(button) button.classList.remove("anim");
    }, 180);

    if(document.body.classList.contains("dark")){
        localStorage.setItem("modo","oscuro");
    }else{
        localStorage.setItem("modo","claro");
    }
}

function toggleCarrito() {
    document.getElementById("carrito").classList.toggle("activo");
}


/* ===== FUNCIONALIDAD CARRITO MEJORADO ===== */

let cart = [];

function addToCart(name, price, img) {
    let existing = cart.find(p => p.name === name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({name, price, img, qty:1});
    }
    renderCart();
}

function renderCart() {
    let panel = document.querySelector(".cart-panel");
    if (!panel) return;

    panel.innerHTML = "<h2>Carrito</h2>";

    let total = 0;

    cart.forEach(p => {
        total += p.price * p.qty;
        panel.innerHTML += `
        <div class="cart-item">
            <img src="${p.img}">
            <div>
                <p>${p.name}</p>
                <p>${p.qty} x ${p.price}</p>
            </div>
        </div>
        `;
    });

    panel.innerHTML += `<div class="cart-total">Total: ${total}</div>`;
}

function toggleCart() {
    document.querySelector(".cart-panel").classList.toggle("active");
}

/* Dark mode fix */
document.querySelector(".mode-btn")?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
