import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    coach: { type: String, required: true },
    memberCount: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);