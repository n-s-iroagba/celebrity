import { Model, DataTypes, Optional, NonAttribute, ForeignKey } from 'sequelize';
import sequelize from '../config/orm';
import { Celebrity } from './Celebrity'; // Fixed typo in import (was Celebrity)

interface ChatAttributes {
  id: number;
  fanId: number;
  celebrityId: ForeignKey<Celebrity['id']>;
  createdAt?: Date;
  updatedAt?: Date;
  Celebrity?: NonAttribute<Celebrity>; // Changed to uppercase to match Sequelize convention
}

interface ChatCreationAttributes extends Optional<ChatAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Chat extends Model<ChatAttributes, ChatCreationAttributes> implements ChatAttributes {
  declare id: number;
  declare fanId: number;
  declare celebrityId: ForeignKey<Celebrity['id']>;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  
  declare Celebrity?: NonAttribute<Celebrity>; // Association field
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
      references: { // Added foreign key reference
        model: 'fans',
        key: 'id'
      }
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { // Added foreign key reference
        model: 'celebrities',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    tableName: 'chats',
    timestamps: true,
    paranoid: false // Add if you want soft deletion
  }
);

// Associations should be defined separately
Chat.belongsTo(Celebrity, {
  foreignKey: 'celebrityId',
  as: 'Celebrity' // Matches the interface definition
});

export default Chat;