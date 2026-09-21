import { Router } from 'express';
import { Team } from '../models/Team.js';

const router = Router();

router.get('/', async (_request, response) => {
  const teams = await Team.find().sort({ name: 1 }).lean();

  response.json({ teams });
});

export default router;