// Load the cart data from localStorage or initialize it if it's not available
const cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));

  function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show cart notification
    const notification = document.getElementById('cart-notification');
    const notificationText = document.getElementById('cart-notification-text');

    // Reset the notification to be hidden and remove previous states if necessary
    notification.classList.remove('show', 'hide');  // Ensure it's not in either show or hide state
    notification.style.opacity = 0;  // Set the opacity to 0 to hide it initially

    // Update the notification text
    notificationText.textContent = `${product.name} added to cart!`;

    // Start the notification animation
    setTimeout(() => {
      notification.style.opacity = 1;  // Fade in the notification
      notification.classList.add('show');  // Add 'show' class to trigger the animation
    }, 10);  // Small delay before showing the notification

    // Hide the notification after the animation
    setTimeout(() => {
      notification.classList.remove('show');
      notification.classList.add('hide');
    }, 5000);  // Hide after 5 seconds
  }

  
// Add event listener for each product
document.querySelectorAll('.product').forEach((product) => {
  product.addEventListener('click', () => {
    // Toggle visibility of the Add to Cart button
    const addButton = product.querySelector('.add-to-cart');
    if (addButton) {
      addButton.classList.toggle('visible');
    }

    // Close other buttons if clicking a new product
    document.querySelectorAll('.product').forEach((p) => {
      if (p !== product) {
        const otherButton = p.querySelector('.add-to-cart');
        if (otherButton) {
          otherButton.classList.remove('visible');
        }
      }
    });
  });
});

// Add to Cart button functionality
document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent triggering the product click event
    const productElement = button.closest('.product');
    const product = {
      id: productElement.dataset.id,
      name: productElement.dataset.name,
      price: parseFloat(productElement.dataset.price),
    };
    addToCart(product);
  });
});



// Display cart items in the cart page
if (document.getElementById('cart-items')) {
  const cartItemsDiv = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');

  function renderCart() {
    cartItemsDiv.innerHTML = ''; // Clear previous items
    let totalPrice = 0;

    // Loop through cart items and display them
    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <p>${item.name} - $${item.price.toFixed(2)} 
          <button class="remove-item" data-index="${index}">Remove</button>
        </p>
      `;
      cartItemsDiv.appendChild(itemDiv);
      totalPrice += item.price;
    });

    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  renderCart();

  // Remove item from the cart
  cartItemsDiv.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
      const index = event.target.getAttribute('data-index');
      cart.splice(index, 1); // Remove the item at the specified index
      localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
      renderCart(); // Re-render the cart
    }
  });

  // Clear cart functionality
  if (document.getElementById('clear-cart')) {
    document.getElementById('clear-cart').addEventListener('click', () => {
      localStorage.removeItem('cart'); // Clear the cart from localStorage
      cart.length = 0; // Clear the cart array
      renderCart(); // Re-render the cart
    });
  }
}

// Checkout button functionality
if (document.getElementById('checkout')) {
  document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
    } else {
      alert('Thank you for your purchase!');
      localStorage.clear();
      window.location.href = 'index.html'; // Redirect to home page
    }
  });
}
