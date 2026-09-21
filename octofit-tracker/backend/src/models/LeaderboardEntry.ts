import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    weeklyMinutes: { type: Number, required: true },
  },
  { collection: 'leaderboard', timestamps: true },
);

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);