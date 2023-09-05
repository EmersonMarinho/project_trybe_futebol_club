import { Router } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const router = Router();

router.get('/home', LeaderboardController.getLeaderboard);
router.get('/away', LeaderboardController.getLeaderboard);

export default router;
