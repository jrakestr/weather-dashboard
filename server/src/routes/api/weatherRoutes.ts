import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

router.post('/', async (req: Request, res: Response) => {
  try {
    const cityName = req.body.cityName;
    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const data = await WeatherService.getWeatherForCity(cityName);
    await HistoryService.addCity(cityName);
    res.json(data);
  } catch (error) {
    console.error('Error in POST /:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
  }
});

router.get('/history', async (_req: Request, res: Response) => {
  try {
    const data = await HistoryService.getCities();
    res.json(data);
  } catch (error) {
    console.error('Error in GET /history:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
  }
});

router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'City ID is required' });
    }

    await HistoryService.removeCity(id);
    res.json({ success: 'Removed city from search history' });
  } catch (error) {
    console.error('Error in DELETE /history/:id:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
  }
});

export default router;