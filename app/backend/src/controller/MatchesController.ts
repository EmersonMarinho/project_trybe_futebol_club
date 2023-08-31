import { Request, Response } from 'express';

import MatchesService from '../services/MatchesService';

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const inProgress = req.query.inProgress ? req.query.inProgress === 'true' : null;
    const matches = await MatchesService.getAllMatches(inProgress);
    res.status(200).json(matches);
  }
}
