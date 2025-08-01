export async function checkout(cart: { name: string; qty: number; price: number }[]) {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart })
    });
    return res.json();
  }
  