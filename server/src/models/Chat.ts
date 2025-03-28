import { Model, DataTypes, Optional, NonAttribute, ForeignKey } from 'sequelize';
import sequelize from '../config/orm';
import {Celebrity} from './Celebrity';
import {Fan} from './Fan';
import Message from './Message';

interface ChatAttributes {
  id: number;
  fanId: ForeignKey<Fan['id']>;
  celebrityId: ForeignKey<Celebrity['id']>;
  status: 'not_yet_seen' | 'seen' | 'responded';
  createdAt?: Date;
  updatedAt?: Date;
  Celebrity?: NonAttribute<Celebrity>;
  Fan?: NonAttribute<Fan>;
  Messages?: NonAttribute<Message[]>;
}

interface ChatCreationAttributes extends Optional<ChatAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Chat extends Model<ChatAttributes, ChatCreationAttributes> implements ChatAttributes {
  declare id: number;
  declare fanId: ForeignKey<Fan['id']>;
  declare celebrityId: ForeignKey<Celebrity['id']>;
  declare status: 'not_yet_seen' | 'seen' | 'responded';
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  
  declare Celebrity?: NonAttribute<Celebrity>;
  declare Fan?: NonAttribute<Fan>;
  declare Messages?: NonAttribute<Message[]>;
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
      references: {
        model: 'fans',
        key: 'id'
      }
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'celebrities',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('not_yet_seen', 'seen', 'responded'),
      allowNull: false,
      defaultValue: 'not_yet_seen'
    }
  },
  {
    sequelize,
    tableName: 'chats',
    timestamps: true,
    paranoid: false
  }
);


export default Chat;