import { Request, Response } from 'express';

import TeamService from '../services/TeamService';

class TeamController {
  static async getAllTeams(req: Request, res: Response) {
    const teams = await TeamService.getAllTeams();
    res.status(200).json(teams);
  }

  static async getTeamsById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamService.getTeamsById(Number(id));
    res.status(200).json(team);
  }
}

export default TeamController;
