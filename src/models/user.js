// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [30, 'Name cannot be more than 60 characters'],
  },
  walletAddress: {
    type: String,
    required: [true],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  petType: {
    type: String,
    required: [true, 'Please provide your pet type'],
  },
  petBreed: {
    type: String,
    required: [true, 'Please provide your pet breed'],
  },
  birthDay: {
    type: Date,
    required: [true, 'Please provide your pet birthday'],
  },
  petImage: {
    type: Date,
    required: [true, 'Please provide your pet image in URL'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
