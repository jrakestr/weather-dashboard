import express from 'express';
import weatherRoutes from './weatherRoutes.js';

const router = express.Router();

router.use('/weather', weatherRoutes);

export default router;
