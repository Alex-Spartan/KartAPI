import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const exists = await User.findOne({
            username : req.body.username,
            email : req.body.email,
        });

        if (exists) {
            return res.status(400).json({error: 'User already exists'})
        }

        const hashed = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashed,
        })
        
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        return res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email})
        if (!user) {
            return res.status(400).json({error: 'Invalid Credential'})
        }

        const pass = user.password;
        const compare = await bcrypt.compare(password, pass)
        if (!compare) {
            return res.status(400).json({error: 'Invalid Credential'})
        }

        const accessToken = jwt.sign({
            id: user._id, 
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
        )
        return res.status(201).json({...user._doc, password: null, accessToken});
    } 
    catch (err) {
        return res.status(500).json({error: err})
    }
})



export default router;