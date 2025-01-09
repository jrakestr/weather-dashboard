import path from 'node:path';
import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), 'client/dist/index.html'));
});

export default router;
