import {Schema, model} from 'mongoose';

const productSchema = new Schema({
    title: {type: String, required: true, unique: true},
    desc: {type: String, required: true},
    img: {type: String, required: true},
    categories: { type: Array },
    size: {type: [String], enum: ['S', 'M', 'L', 'XL']},
    color: {type: [String], required: true},
    price: {type: Number, required: true},
    inStock: {type: Boolean, default: true}
    
}, {timestamps: true})

export default model('Product', productSchema)