import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/orm';

interface ChatAttributes {
  id: number;
  fanId: number;
  celebrityId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ChatCreationAttributes extends Optional<ChatAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Chat extends Model<ChatAttributes, ChatCreationAttributes> implements ChatAttributes {
  public id!: number;
  public fanId!: number;
  public celebrityId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'chats',
    timestamps: true, // Enable createdAt and updatedAt
  }
);

export default Chat;