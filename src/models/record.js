// models/record.js
import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  petId: {
    type: String,
    required: [true, 'Please provide petId'],
  },
  petActivity: {
    type: String,
    required: [true, 'Please state the activity'],
  },
  petLocation: {
    type: String,
    required: [true, 'Please state the location'],
  },
  walletAddress: {
    type: String,
    required: true,
  },
  petWeight: {
    type: Number,
    required: [true, 'Please provide your pet weight'],
  },
  petCondition: {
    type: String,
    required: [true, 'Please provide your pet condition'],
  },
  IPFS: {
    type: String,
    required: false,
  },
  tokenId: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Record || mongoose.model('Record', recordSchema);
