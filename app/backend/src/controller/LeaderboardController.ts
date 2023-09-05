import { Request, Response } from 'express';

import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getLeaderboard();
    res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
