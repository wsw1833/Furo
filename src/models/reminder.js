// models/reminder.js
import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
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
  appointmentDate: {
    type: Date,
    required: [true, 'Please state the appointment date'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Reminder ||
  mongoose.model('Reminder', reminderSchema);
