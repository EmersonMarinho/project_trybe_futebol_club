import { Request, Response } from 'express';

import MatchesService from '../services/MatchesService';
import TeamService from '../services/TeamService';

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
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    const homeTeamExists = await TeamService.ifTeamExists(homeTeamId);
    const awayTeamExists = await TeamService.ifTeamExists(awayTeamId);

    if (!homeTeamExists || !awayTeamExists) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const newMatch = await MatchesService.createMatch(
      { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals },
    );

    res.status(201).json(newMatch);
  }
}
