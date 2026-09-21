import { Router } from 'express';

const router = Router();

router.get('/', (_request, response) => {
  response.json({ teams: [] });
});

export default router;