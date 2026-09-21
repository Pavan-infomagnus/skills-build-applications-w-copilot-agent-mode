import { Router } from 'express';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';

const router = Router();

router.get('/', async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find()
    .populate('user', 'name email')
    .populate('team', 'name city')
    .sort({ rank: 1 })
    .lean();

  response.json({ leaderboard });
});

export default router;