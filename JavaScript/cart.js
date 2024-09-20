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

// Actualizar la visualización del carrito
function updateCart() {
    $('#cart').html('<h2>Carrito</h2>');
    if (cart.length === 0) {
        $('#cart').append('<p>El carrito está vacío.</p>');
        return;
    }
    cart.forEach(item => {
        const cartItemDiv = $(`
            <p>${item.name} x${item.quantity} - $${item.price * item.quantity}</p>
        `);
        $('#cart').append(cartItemDiv);
    });
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    $('#cart').append(<h3>Total: $${totalPrice}</h3>);
}

