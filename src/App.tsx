import { useState } from 'react';
import './App.css';
import { checkout } from './api';

type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

function App() {
  // Sample products
  const products = [
    { id: 1, name: 'Mechanical Keyboard', price: 399 },
    { id: 2, name: 'Wireless Mouse', price: 199 },
    { id: 3, name: 'Monitor Stand', price: 299 }
  ];

  const [cart, setCart] = useState<CartItem[]>([]);

  // Add product to cart
  const addToCart = (product: { id: number; name: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  // Remove product
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    const result = await checkout(cart);
    alert(`Order status: ${result.message}`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Shopping Cart Demo</h1>

      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: '10px' }}>
            {p.name} - ${p.price}
            <button onClick={() => addToCart(p)} style={{ marginLeft: '10px' }}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>The cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} * {item.qty} = ${item.price * item.qty}
              <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '10px' }}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Total: ${total}</h3>
      <button onClick={handleCheckout} disabled={cart.length === 0}>
        Checkout
      </button>
    </div>
  );
}

export default App;
