import { Model, DataTypes, QueryInterface } from 'sequelize';
import IUsers from '../../Interfaces/IUsers';

interface UserDefinition {
  type: typeof DataTypes.INTEGER | typeof DataTypes.STRING | typeof DataTypes.BOOLEAN,
  allowNull: boolean,
  primaryKey?: boolean,
  autoIncrement?: boolean,
}

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const users: Record<keyof IUsers, UserDefinition> = {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false },
    };
    await queryInterface.createTable<Model<IUsers>>('users', users);
  },
};
