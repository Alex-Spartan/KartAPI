import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyTokenAndAdmin } from '../controllers/verifyAuth.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Server error" });
    }
});


router.post("/firebase-auth", async (req, res) => {
    const { name, email, avatar, firebaseUid } = req.body;
    console.log(req.body);
    try {
        let user = await User.findOne({ firebaseUid });
        if (!user) {
            user = await User.create({ name, email, avatar, firebaseUid });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


export default router;