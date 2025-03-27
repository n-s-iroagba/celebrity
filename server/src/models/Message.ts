import { DataTypes, ForeignKey, Model, Optional, NonAttribute } from 'sequelize';
import sequelize from '../config/orm';
import Chat from './Chat';

interface MessageAttributes {
  id: number;
  senderType: 'fan' | 'celebrity';
  senderId: number;
  chatId: ForeignKey<Chat['id']>;
  content: string;
  mediaType: 'text' | 'video' | 'voice' | 'image';
  mediaUrl: string | null;
  isSeen: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  Chat?: NonAttribute<Chat>;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id' | 'isSeen' | 'createdAt' | 'updatedAt'> {}

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  declare id: number;
  declare senderType: 'fan' | 'celebrity';
  declare senderId: number;
  declare chatId: ForeignKey<Chat['id']>;
  declare content: string;
  declare mediaType: 'text' | 'video' | 'voice' | 'image';
  declare mediaUrl: string | null;
  declare isSeen: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  
  declare Chat?: NonAttribute<Chat>;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderType: {
      type: DataTypes.ENUM('fan', 'celebrity'),
      allowNull: false
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chats',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mediaType: {
      type: DataTypes.ENUM('text', 'video', 'voice', 'image'),
      allowNull: false,
      defaultValue: 'text'
    },
    mediaUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isSeen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize,
    tableName: 'messages',
    timestamps: true
  }
);

// Associations
Message.belongsTo(Chat, {
  foreignKey: 'chatId',
  as: 'Chat'
});

export default Message;