import MatchesModel from '../database/models/matches';
import TeamModel from '../database/models/teams';

export default class MatchesService {
  static async getAllMatches() {
    const matches = await MatchesModel.findAll({
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
