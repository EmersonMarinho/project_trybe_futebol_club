import Team from '../database/models/teams';
import ILeaderboard from '../Interfaces/ILeaderBoard';
import IMatches from '../Interfaces/IMatches';

export default class LeaderboardUtils {
  static async createLeaderboard(): Promise<ILeaderboard[]> {
    const allTeams = await Team.findAll();

    const leaderboard: ILeaderboard[] = allTeams.map((team) => ({
      id: team.id,
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '0.00',
    }));

    return leaderboard;
  }

  static async updateLeaderboard(
    leaderboard: ILeaderboard[],
    matches: IMatches[],
  ): Promise<ILeaderboard[]> {
    const updatedLeaderboard = [...leaderboard];

    matches.forEach((match) => {
      if (
        updatedLeaderboard[match.homeTeamId - 1]
        && updatedLeaderboard[match.awayTeamId - 1]
      ) {
        updatedLeaderboard[match.homeTeamId - 1].totalGames += 1;
        updatedLeaderboard[match.awayTeamId - 1].totalGames += 1;

        updatedLeaderboard[match.homeTeamId - 1].goalsFavor += match.homeTeamGoals;
        updatedLeaderboard[match.awayTeamId - 1].goalsFavor += match.awayTeamGoals;

        updatedLeaderboard[match.homeTeamId - 1].goalsOwn += match.awayTeamGoals;
        updatedLeaderboard[match.awayTeamId - 1].goalsOwn += match.homeTeamGoals;
      }
    });

    return updatedLeaderboard;
  }

  static async updateVictoriesAndLosses(
    leaderboard: ILeaderboard[],
    match: IMatches[],
  ): Promise<ILeaderboard[]> {
    const updatedLeaderboard = [...leaderboard];

    match.forEach((game) => {
      const homeTeamIndex = game.homeTeamId - 1;
      const awayTeamIndex = game.awayTeamId - 1;

      if (game.homeTeamGoals !== game.awayTeamGoals) {
        const winningTeamIndex = game.homeTeamGoals > game.awayTeamGoals
          ? homeTeamIndex : awayTeamIndex;
        const losingTeamIndex = game.homeTeamGoals < game.awayTeamGoals
          ? homeTeamIndex : awayTeamIndex;

        updatedLeaderboard[winningTeamIndex].totalPoints += 3;
        updatedLeaderboard[winningTeamIndex].totalVictories += 1;
        updatedLeaderboard[losingTeamIndex].totalLosses += 1;
      }
    });

    return updatedLeaderboard;
  }

  static async updateDraw(
    leaderboard: ILeaderboard[],
    match: IMatches[],
  ): Promise<ILeaderboard[]> {
    const updatedLeaderboard = [...leaderboard];

    match.forEach((game) => {
      if (game.homeTeamGoals === game.awayTeamGoals) {
        const homeTeamIndex = game.homeTeamId - 1;
        const awayTeamIndex = game.awayTeamId - 1;

        updatedLeaderboard[homeTeamIndex].totalPoints += 1;
        updatedLeaderboard[homeTeamIndex].totalDraws += 1;

        updatedLeaderboard[awayTeamIndex].totalPoints += 1;
        updatedLeaderboard[awayTeamIndex].totalDraws += 1;
      }
    });

    return updatedLeaderboard;
  }

  static updateGoalsBalance(leaderboard: ILeaderboard[], matches: IMatches[]): ILeaderboard[] {
    return leaderboard.map((team) => {
      let goalsBalance = team.goalsBalance || 0;
      matches.forEach((match) => {
        if (!match.inProgress) {
          if (team.id === match.homeTeamId) {
            goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
          } else if (team.id === match.awayTeamId) {
            goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
          }
        }
      });

      return { ...team, goalsBalance };
    });
  }

  static updateEfficiency(leaderboard: ILeaderboard[]): ILeaderboard[] {
    return leaderboard.map((team) => {
      const efficiency = ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
      return { ...team, efficiency };
    });
  }

  static orderLeaderboard(leaderboard: ILeaderboard[]): ILeaderboard[] {
    const orderLeaderboard = leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      return b.totalVictories - a.totalVictories || 0;
    });

    return orderLeaderboard;
  }
}
