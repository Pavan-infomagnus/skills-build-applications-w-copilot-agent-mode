import { Router } from 'express';

const router = Router();

router.get('/', (_request, response) => {
  response.json({ activities: [] });
});

export default router;