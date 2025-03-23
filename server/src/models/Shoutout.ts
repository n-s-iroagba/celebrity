import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/orm';

interface ShoutoutAttributes {
  id: number;
  celebrityId: number;
  userId: number;
  message: string | null;
  mediaType: 'text' | 'video' | 'voice';
  mediaUrl: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ShoutoutCreationAttributes extends Optional<ShoutoutAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Shoutout extends Model<ShoutoutAttributes, ShoutoutCreationAttributes> implements ShoutoutAttributes {
  public id!: number;
  public celebrityId!: number;
  public userId!: number;
  public message!: string | null;
  public mediaType!: 'text' | 'video' | 'voice';
  public mediaUrl!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Shoutout.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mediaType: {
      type: DataTypes.ENUM('text', 'video', 'voice'),
      allowNull: false,
    },
    mediaUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'shoutouts',
  }
);

export default Shoutout;