import TeamModel from '../database/models/teams';

class TeamService {
  static async getAllTeams() {
    const teams = await TeamModel.findAll();
    return teams;
  }

  static async getTeamsById(id: number) {
    const team = await TeamModel.findByPk(id);
    return team;
  }

  static async ifTeamExists(teamId: number): Promise<boolean> {
    const team = await TeamModel.findByPk(teamId);
    return !!team;
  }
}

export default TeamService;
