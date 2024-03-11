import express from "express";
import Cart from '../models/Cart.js'
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../controllers/verifyAuth.js";
const  router = express.Router()

router.post('/', verifyToken, async (req, res) => {
    try {
        const newCart = new Cart(req.body);
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findById(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
        );
        res.status(201).json(updatedCart)
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
});

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const fetchedCart = await Cart.findByIdAndDelete(req.params.id)
        res.status(201).json({message: "Cart deleted"})
    }
    catch (err) {
        res.status(500).json({error: err})
    }    
})

router.get('/find/:userid', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId})
        res.status(200).json(cart);
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }
})

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
        
    } catch (err) {
        res.status(500).json({error: err})
    }
})

export default router;