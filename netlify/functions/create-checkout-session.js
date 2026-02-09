/**
 * Netlify Serverless Function: Stripe Checkout Session erstellen
 * Aufruf: POST /.netlify/functions/create-checkout-session
 * Body: { orderId, total, currency?, successUrl?, cancelUrl?, lineItems? }
 * Env: STRIPE_SECRET_KEY (im Netlify Dashboard unter Site settings → Environment variables)
 */

const Stripe = require('stripe');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'STRIPE_SECRET_KEY is not configured' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }

  const { orderId, total, currency = 'eur', successUrl, cancelUrl, lineItems } = body;
  const amountCents = Math.round(Number(total) * 100);
  if (!orderId || !Number.isFinite(amountCents) || amountCents < 50) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'orderId and total (>= 0.50) required' }),
    };
  }

  const origin = event.headers.origin || event.headers.Origin || '';
  const base = successUrl || (origin ? `${origin}/checkout/success` : '');
  const cancel = cancelUrl || (origin ? `${origin}/checkout/cancel` : '');
  if (!base || !cancel) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'successUrl and cancelUrl or Origin required' }),
    };
  }

  const stripe = new Stripe(secret);

  const sessionConfig = {
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems && lineItems.length > 0
      ? lineItems.map((item) => ({
          price_data: {
            currency: (currency || 'eur').toLowerCase(),
            unit_amount: Math.round(Number(item.amount || item.price || 0) * 100),
            product_data: {
              name: item.name || item.title || 'Mittagessen',
              description: item.description || undefined,
            },
          },
          quantity: Number(item.quantity) || 1,
        }))
      : [
          {
            price_data: {
              currency: (currency || 'eur').toLowerCase(),
              unit_amount: amountCents,
              product_data: {
                name: 'Mittagio Bestellung',
                description: `Bestellung #${orderId}`,
              },
            },
            quantity: 1,
          },
        ],
    success_url: base + (base.includes('?') ? '&' : '?') + 'session_id={CHECKOUT_SESSION_ID}',
    cancel_url: cancel + (cancel.includes('?') ? '&' : '?') + 'cancel=1&orderId=' + encodeURIComponent(orderId),
    client_reference_id: orderId,
    metadata: { orderId },
    allow_promotion_codes: true,
  };

  try {
    const session = await stripe.checkout.sessions.create(sessionConfig);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url, sessionId: session.id }),
    };
  } catch (err) {
    console.error('Stripe error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Stripe Checkout failed' }),
    };
  }
};
