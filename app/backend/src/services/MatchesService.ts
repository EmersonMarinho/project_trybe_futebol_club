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

    // if (!score) return { error: 'Score is required' };

    // const [homeTeamGoals, awayTeamGoals] = score.split('-');
    // const match = await MatchesModel.findByPk(id);

    // if (!match) {
    //   return null;
    // }
    // match.homeTeamGoals = Number(homeTeamGoals);
    // match.awayTeamGoals = Number(awayTeamGoals);
    // match.inProgress = false;
    // await match.save().then(() => console.log('Match updated')).catch((err) =>
    //   console.log(err.message));
    // return match;
  }
}
