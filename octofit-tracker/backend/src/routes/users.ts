import { Router } from 'express';

const router = Router();

router.get('/', (_request, response) => {
  response.json({ users: [] });
});

export default router;