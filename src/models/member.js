// models/member.js
import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  petId: {
    type: String,
    required: [true, 'Please provide petId'],
  },
  name: {
    type: String,
    required: [true, 'Please state the name'],
  },
  walletAddress: {
    type: String,
    required: [true, 'Please state the wallet Address'],
  },
  location: {
    type: String,
    required: [true, 'Please state the working location'],
  },
  AddedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Member || mongoose.model('Member', memberSchema);
