export default interface ILeaderBoard {
  id?: number;
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalLosses: number;
  totalDraws: number;
  goalsFavor: number;
  goalsOwn: number;
}
