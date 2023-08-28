import { Model, DataTypes, QueryInterface } from 'sequelize';
import IMatches from '../../Interfaces/IMatches';

interface FieldDefinition {
  type: typeof DataTypes.INTEGER | typeof DataTypes.BOOLEAN,
  allowNull: boolean,
  field?: string
  primaryKey?: boolean,
  autoIncrement?: boolean,
}

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const fields: Record<keyof IMatches, FieldDefinition> = {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      homeTeamId: { type: DataTypes.INTEGER, allowNull: false, field: 'home_team_id' },
      homeTeamGoals: { type: DataTypes.INTEGER, allowNull: false, field: 'home_team_goals' },
      awayTeamId: { type: DataTypes.INTEGER, allowNull: false, field: 'away_team_id' },
      awayTeamGoals: { type: DataTypes.INTEGER, allowNull: false, field: 'away_team_goals' },
      inProgress: { type: DataTypes.BOOLEAN, allowNull: false, field: 'in_progress' },
    };
    await queryInterface.createTable<Model<IMatches>>('matches', fields);
  },
};
