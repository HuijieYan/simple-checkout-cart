export async function onRequestPost(context: any) {
    const SUPABASE_URL = context.env.SUPABASE_URL;
    const SUPABASE_KEY = context.env.SUPABASE_KEY;
  
    try {
      const data = await context.request.json() as {
        cart: { name: string; qty: number; price: number }[]
      };
  
      const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({ cart: data.cart })
      });
  
      if (!insertRes.ok) throw new Error(`Failed to insert order`);
  
      return new Response(JSON.stringify({ message: 'Order saved to DB!' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: (err as Error).message }), { status: 400 });
    }
  }  
