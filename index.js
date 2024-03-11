import mongoose from 'mongoose';
import express from 'express';
import verifyRoute from './routers/users.js'
import userRoute from './routers/profile.js';
import productRoute from './routers/product.js'
import cartRoute from './routers/cart.js'
import orderRoute from './routers/order.js'
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;
dotenv.config();


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/auth", verifyRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);


app.listen(PORT || 4000, () => {
    console.log('Server is running on port 4000');
});