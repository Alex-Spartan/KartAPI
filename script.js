import mongoose from 'mongoose';
import Product from './models/Product.js';
import dotenv from 'dotenv';
dotenv.config();

const data = [
  {
    "title": "Floral Summer Dress, Lightweight, Sleeveless",
    "desc": "Breezy floral dress perfect for warm weather and outdoor events.",
    "img": "https://i.etsystatic.com/7799304/r/il/1fed03/2105859613/il_1588xN.2105859613_79ms.jpg",
    "categories": ["dress", "women", "trending"],
    "size": ["S", "M", "L"],
    "color": ["blue", "white"],
    "price": 1999,
    "inStock": true
  },
  {
    "title": "Cotton Kurti Set, Ethnic Wear, Comfortable Fit",
    "desc": "Soft cotton kurti with matching pants. Ideal for daily or festive wear.",
    "img": "https://media.vogue.in/wp-content/uploads/2019/11/Sara-Ali-Khan-in-kurta-set.jpg",
    "categories": ["kurti", "women", "popular"],
    "size": ["M", "L", "XL"],
    "color": ["red", "gold"],
    "price": 1499,
    "inStock": true
  },
  {
    "title": "Women's Activewear Set, High-Stretch Leggings & Top",
    "desc": "Performance-oriented activewear designed for workouts and yoga.",
    "img": "https://images.meesho.com/images/products/353502040/wp1hz_512.webp",
    "categories": ["women", "popular", "trending"],
    "size": ["S", "M"],
    "color": ["black", "purple"],
    "price": 2200,
    "inStock": true
  },
  {
    "title": "Women’s Casual Blazer, Slim Fit, Formal Look",
    "desc": "A modern casual blazer ideal for office and business casual occasions.",
    "img": "https://imagescdn.allensolly.com/img/app/product/3/39628839-12999139.jpg?auto=format&w=390",
    "categories": ["blazer", "women"],
    "size": ["M", "L"],
    "color": ["grey", "black"],
    "price": 2799,
    "inStock": true
  },
  {
    "title": "Boho Maxi Skirt, Printed, Ankle Length",
    "desc": "Comfortable and stylish skirt with traditional boho prints.",
    "img": "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2025/APRIL/23/n1ooCmo9_29e3173a133f42d19f0284fc576a453f.jpg",
    "categories": ["skirt", "women", "trending"],
    "size": ["M", "L", "XL"],
    "color": ["pink", "blue"],
    "price": 1350,
    "inStock": true
  }
]

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