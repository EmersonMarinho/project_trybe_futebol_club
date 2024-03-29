import MatchesModel from '../database/models/matches';
import TeamModel from '../database/models/teams';

export default class MatchesService {
  static async getAllMatches(inProgress: boolean | null) {
    const inProgessClause = inProgress !== null ? { inProgress } : {};
    const matches = await MatchesModel.findAll({
      where: inProgessClause,
      include: [
        {
          model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  static async finishMatch(id: number) {
    await MatchesModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  static async updateMatch(id: string, score: { homeTeamGoals: number, awayTeamGoals: number }) {
    await MatchesModel.update(
      score,
      { where: { id } },
    );
  }

  static async createMatch(payload:
  { homeTeamId: number, awayTeamId: number, homeTeamGoals: number, awayTeamGoals: number }) {
    const match = await MatchesModel.create({
      ...payload,
      inProgress: true,
    });
    return match;
  }
}
