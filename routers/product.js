import express from "express";
import Product from '../models/Product.js'
import { verifyTokenAndAdmin } from "../controllers/verifyAuth.js";
const router = express.Router()

router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findById(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
        );
        res.status(201).json(updatedProduct)
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
});

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const fetchedProduct = await Product.findByIdAndDelete(req.params.id)
        res.status(201).json({message: "Product deleted"})
    }
    catch (err) {
        res.status(500).json({error: err})
    }    
})

router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }
})

router.get('/', async (req, res) => {
    try {
        const qNew = req.query.new;
        const qCategory = req.query.category;
        let products;

        if (qNew) {
            products = await Product.find().sort({createdAt: -1}).limit(5)
        } else if (qCategory) {
            products = await Product.find(
                {
                    categories: {
                    $in: [qCategory]
                }
            }
            )
        } else {
            products = await Product.find()
        }


        res.status(200).json(products)
        
    } catch (err) {
        res.status(500).json({error: err})
    }
})

export default router;