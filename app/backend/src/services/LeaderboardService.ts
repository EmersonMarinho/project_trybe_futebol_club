import IMatches from '../Interfaces/IMatches';
import MatchesService from './MatchesService';
import LeaderboardUtils from '../helpers/LeaderboardHelper';
import ILeaderboard from '../Interfaces/ILeaderBoard';

export default class LeaderboardService {
  static async getLeaderboard(): Promise<Partial<ILeaderboard>[]> {
    const allMatches: IMatches[] = await MatchesService.getAllMatches(false);

    const leaderboard: ILeaderboard[] = await LeaderboardUtils.createLeaderboard();

    const updatePoints = await LeaderboardUtils.updateLeaderboard(leaderboard, allMatches);

    const updateVictoriesAndLosses = await
    LeaderboardUtils.updateVictoriesAndLosses(updatePoints, allMatches);

    const updateDraws = await LeaderboardUtils.updateDraw(updateVictoriesAndLosses, allMatches);

    const ordered = LeaderboardUtils.orderLeaderboard(updateDraws).map((team) => {
      const { id, ...rest } = team;
      return rest;
    });

    return ordered;
  }
}
