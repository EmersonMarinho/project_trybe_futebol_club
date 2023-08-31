import { Request, Response } from 'express';

import MatchesService from '../services/MatchesService';

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const inProgress = req.query.inProgress ? req.query.inProgress === 'true' : null;
    const matches = await MatchesService.getAllMatches(inProgress);
    res.status(200).json(matches);
  }

  static async finishMatch(req: Request, res: Response) {
    const { user } = req.body;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;

    await MatchesService.finishMatch(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = req.body;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const score = req.body;
    await MatchesService.updateMatch(id, score);
    return res.status(200).json({ message: 'Updated' });
  }

  static async createMatch(req: Request, res: Response) {
    try {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
      const newMatch = await MatchesService.createMatch(
        { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals },
      );
      res.status(201).json(newMatch);
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
}
