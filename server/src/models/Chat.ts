import {
  Model,
  DataTypes,
  Optional,
  NonAttribute,
  ForeignKey,
} from "sequelize";
import sequelize from "../config/orm";
import { Celebrity } from "./Celebrity";
import { Fan } from "./Fan";
import Message from "./Message";
import { Job } from "./Job";

interface ChatAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  Messages?: NonAttribute<Message[]>;
  jobId: ForeignKey<Job["id"]>;
  job?: NonAttribute<Job>;
}

interface ChatCreationAttributes
  extends Optional<ChatAttributes, "id" | "createdAt" | "updatedAt"> {}

class Chat
  extends Model<ChatAttributes, ChatCreationAttributes>
  implements ChatAttributes
{
  declare id: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare Messages?: NonAttribute<Message[]>;
  declare jobId: ForeignKey<Job["id"]>;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "chats",
    timestamps: true,
    paranoid: false,
  }
);

export default Chat;
