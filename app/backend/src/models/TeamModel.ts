import ITeamModel from '../Interfaces/ITeamModel';
import ITeam from '../Interfaces/ITeam';
import teams from '../database/models/teams';

export default class TeamModel implements ITeamModel {
  private model = teams;

  public async findAll(): Promise<ITeam[]> {
    const db = await this.model.findAll();
    return db.map(({ id, teamName }: ITeam) => ({
      id,
      teamName,
    }));
  }

  public async findByPk(id: number): Promise<ITeam | null> {
    const teamFound = await this.model.findByPk(id);
    return teamFound;
  }
}
