import { Router } from 'express';
const router = Router();
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

router.post('/checkout', async (req, res) => {
  try {
    const { amount, currency, description, source } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      payment_method_types: ['card'],
      payment_method: source,
      confirm: true,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'An error occurred while processing the payment' });
  }
});

export default router;

