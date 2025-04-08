import mongoose from 'mongoose';
import Product from './models/Product.js';
import dotenv from 'dotenv';
dotenv.config();

const data = [
    {
        title: 'XYZ Brand Sweat Shirt cotton blend',
        desc: 'Lorem ipsum dolor\, sit amet consectetur adipisicing elit\. Nisi\, facilis.',
        img: 'https://i.pinimg.com/736x/05/59/62/055962625e32a875825f76a11ea65d19.jpg',
        categories: ['Sweat Shirt', 'Men'],
        size: ['S', 'M'],
        color: ['Red', 'Blue'],
        price: 100,
        inStock: true
    },
    {
        title: 'Nike Sweat Shirt, Breathable fabric, 100% cotton',
        desc: 'Lorem ipsum dolor\, sit amet consectetur adipisicing elit\. Nisi\, facilis.',
        img: 'https://i.pinimg.com/736x/b9/05/c7/b905c79fbe9d2ef8892e045859dbd763.jpg',
        categories: ['Sweat Shirt'],
        size: ['M', 'L'],
        color: ['Green', 'Yellow'],
        price: 2500,
        inStock: true
    },
    {
        title: 'Hoodie, Regular fit, Durable fabric',
        desc: "Lorem ipsum dolor\, sit amet consectetur adipisicing elit\. Nisi\, facilis.",
        img: 'https://i.pinimg.com/736x/98/2f/3d/982f3d7deac841a693e033ef993500eb.jpg',
        categories: ['Hoodie'],
        size: ['S', 'L'],
        color: ['Black', 'White'],
        price: 2000,
        inStock: true
    },
    {
        title: 'Manfinity Hypemode Men Slogan Graphic Grommet Detail Flap Pocket Drawstring Cargo Trousers',
        desc: 'Lorem ipsum dolor\, sit amet consectetur adipisicing elit\. Nisi\, facilis.',
        img: 'https://i.pinimg.com/736x/10/37/a6/1037a669f36f806ead18c878c719810d.jpg',
        categories: ['Men', 'Trousers'],
        size: ['S', 'M', 'L'],
        color: ['Purple', 'Orange'],
        price: 950,
        inStock: true
    },
    {
        title: 'Men Cargo Trousers, 100% cotton, Regular fit',
        desc: 'Lorem ipsum dolor\, sit amet consectetur adipisicing elit\. Nisi\, facilis.',
        img: 'https://i.pinimg.com/736x/66/25/d5/6625d5fa9b3cdecc9c35622eab96382a.jpg',
        categories: ['Trousers'],
        size: ['M', 'L'],
        color: ['Black', 'Brown'],
        price: 3000,
        inStock: true
    }
];

const insertData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log('Connected to MongoDB'));
        await Product.insertMany(data);
        console.log('Data inserted successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

insertData();