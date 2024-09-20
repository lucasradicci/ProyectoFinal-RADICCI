let cart = [];

// Agregar producto al carrito
function addToCart(productId) {
    $.getJSON('products.json')
        .done(function(products) {
            const product = products.find(p => p.id === productId);
            if (!product) {
                displayMessage('Producto no encontrado');
                return;
            }
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
        })
        .fail(function() {
            displayMessage('Error al cargar productos');
        });
}

