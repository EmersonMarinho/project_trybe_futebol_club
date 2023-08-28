import { Model, DataTypes, QueryInterface } from 'sequelize';
import ITeam from '../../Interfaces/ITeam';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable<Model<ITeam>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('teams');
  },
};
