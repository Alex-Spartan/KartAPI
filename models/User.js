import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  avatar: String,
  firebaseUid: { type: String, unique: true },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default model('User', userSchema);