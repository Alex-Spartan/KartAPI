import express from "express";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../controllers/verifyAuth.js'
import User from "../models/User.js";
const router = express.Router();

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        return res.status(201).json(updatedUser)
    } catch (err) {
        return res.status(500).json(err)
    }
})

router.get('/stats', verifyTokenAndAdmin, (req, res) => {
    try {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

        User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    } catch (err) {
        return res.status(500).json(err)
    }
})

router.get('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;
        return res.status(200).json(others)
    } catch (err) {
        return res.status(500).json(err)
    }
})


export default router;