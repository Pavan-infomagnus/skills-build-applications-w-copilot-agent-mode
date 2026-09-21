import { Router } from 'express';
import { Workout } from '../models/Workout.js';

const router = Router();

router.get('/', async (_request, response) => {
  const workouts = await Workout.find().sort({ difficulty: 1, title: 1 }).lean();

  response.json({ workouts });
});

export default router;