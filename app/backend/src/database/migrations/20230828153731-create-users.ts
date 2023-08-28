import { Model, QueryInterface, DataTypes } from 'sequelize';
import IUsers from '../../Interfaces/IUsers'

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable<Model<IUsers>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      password: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      email: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      role: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
    });
  }
}