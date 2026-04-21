/**
 * Netlify Serverless Function: Stripe Checkout Session verifizieren
 * Aufruf: POST /.netlify/functions/verify-checkout-session
 * Body: { sessionId, orderId? }
 * Env: STRIPE_SECRET_KEY
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

  const sessionId = String(body.sessionId || '').trim();
  const requestedOrderId = String(body.orderId || '').trim();
  if (!sessionId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'sessionId is required' }),
    };
  }

  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'customer'],
    });

    const metadata = session.metadata || {};
    const orderIds = String(metadata.orderIds || '')
      .split(',')
      .map((id) => String(id || '').trim())
      .filter(Boolean);
    const metaOrderId = String(metadata.orderId || '').trim();
    if (metaOrderId && orderIds.indexOf(metaOrderId) < 0) orderIds.push(metaOrderId);

    if (requestedOrderId && orderIds.length && orderIds.indexOf(requestedOrderId) < 0) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'orderId does not match checkout session metadata' }),
      };
    }

    const paid = session.payment_status === 'paid' && session.status === 'complete';
    const paymentIntentId = session.payment_intent
      ? (typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent.id)
      : '';
    const customerEmail =
      (session.customer_details && session.customer_details.email) ||
      session.customer_email ||
      '';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        verified: !!paid,
        sessionId: session.id,
        paymentStatus: session.payment_status || '',
        checkoutStatus: session.status || '',
        paymentIntentId,
        customerEmail,
        orderIds,
      }),
    };
  } catch (err) {
    console.error('Stripe verify error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Stripe session verification failed' }),
    };
  }
};
