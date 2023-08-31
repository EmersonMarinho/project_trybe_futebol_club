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
}
