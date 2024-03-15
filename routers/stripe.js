import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_SECRET)
const router = express.Router();

router.post('/payment', (req, res) => {
    console.log(stripe);
    stripe.charges.create({
        source: req.body.tokenid,
        amount: req.body.amount,
        currency: 'usd'
    }, (stripeErr, stripeRes) => {
        if(stripeErr){
            // console.log(stripeErr);
            res.status(500).send(stripeErr)
        } else {
            // console.log(stripeRes);
            res.status(200).send(stripeRes)
        }
    })
})

export default router;