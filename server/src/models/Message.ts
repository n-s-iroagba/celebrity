import {
  DataTypes,
  ForeignKey,
  Model,
  Optional,
  NonAttribute,
} from "sequelize";
import sequelize from "../config/orm";
import Chat from "./Chat";

interface MessageAttributes {
  id: number;
  senderId: number;
  chatId: ForeignKey<Chat["id"]>;
  content: string;
  mediaType: "text" | "video" | "voice" | "image";
  mediaUrl: string | null;
  isSeen: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  chat?: NonAttribute<Chat>;
}

interface MessageCreationAttributes
  extends Optional<
    MessageAttributes,
    "id" | "isSeen" | "createdAt" | "updatedAt"
  > {}

export class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes
{
  declare id: number;
  declare senderType: "fan" | "celebrity";
  declare senderId: number;
  declare chatId: ForeignKey<Chat["id"]>;
  declare content: string;
  declare mediaType: "text" | "video" | "voice" | "image";
  declare mediaUrl: string | null;
  declare isSeen: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare chat?: NonAttribute<Chat>;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "chats",
        key: "id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mediaType: {
      type: DataTypes.ENUM("text", "video", "voice", "image"),
      allowNull: false,
      defaultValue: "text",
    },
    mediaUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isSeen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "messages",
    timestamps: true,
  }
);

Message.belongsTo(Chat, { foreignKey: "chatId", as: "chat" });
Chat.hasMany(Message, { foreignKey: "chatId", as: "messages" });
export default Message;
