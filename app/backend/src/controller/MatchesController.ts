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
}
