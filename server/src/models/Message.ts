import { DataTypes, ForeignKey, Model, Optional } from 'sequelize';
import sequelize from '../config/orm';
import { Celebrity } from './Celebrity';
import { Fan } from './Fan';
import Chat from './Chat';


interface MessageAttributes {
  id: number;
  senderId:ForeignKey<Fan['id']|Celebrity['id']>;
  chatId: ForeignKey<Chat['id']>
  message: string | null;
  mediaType: 'text' | 'video' | 'voice';
  mediaUrl: string | null;
  isSeen:boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number;
  public isSeen!: boolean;
  public senderId!: number;
  public message!: string | null;
  public mediaType!: 'text' | 'video' | 'voice';
  public mediaUrl!: string | null;
  public chatId!:number
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isSeen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chatId: {
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

export default Message;