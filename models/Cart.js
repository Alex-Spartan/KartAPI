import {Schema, model} from 'mongoose';

const cartSchema = new Schema({
    userId: {type: String, required: true, unique: true},
    product: [{
      productId: {
        type: String
      },
      quantity: {
        type:Number,
        default: 1
      }, _id: false
    }],
}, {timestamps: true})

export default model('cart', cartSchema)