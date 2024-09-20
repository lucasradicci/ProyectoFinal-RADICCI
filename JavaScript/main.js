$(document).ready(function() {
    loadProducts();
});

// Inicializar la aplicación
function loadProducts() {
    $.getJSON('products.json')
        .done(function(products) {
            displayProducts(products);
        })
        .fail(function() {
            displayMessage('Error al cargar productos');
        });
}

// Mostrar productos en la interfaz
function displayProducts(products) {
    products.forEach(product => {
        const productDiv = $(`
            <div class="product">
                <h3>${product.name}</h3>
                <p>Marca: ${product.brand}</p>
                <p>Precio: $${product.price}</p>
                <button onclick="addToCart(${product.id})">Agregar al carrito</button>
            </div>
        `);
        $('#product-list').append(productDiv);
    });
}