import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    joinedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);