import {
  Model,
  DataTypes,
  Optional,
  NonAttribute,
  ForeignKey,
  BelongsToGetAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  Association,
} from "sequelize";
import sequelize from "../config/orm";
import { Job } from "./Job";
import { Message } from "./Message";

export interface ChatAttributes {
  id: number;
  jobId: ForeignKey<Job["id"]>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ChatCreationAttributes extends Optional<ChatAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Chat extends Model<ChatAttributes, ChatCreationAttributes> implements ChatAttributes {
  public id!: number;
  public jobId!: ForeignKey<Job["id"]>;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  public getJob!: BelongsToGetAssociationMixin<Job>;
  
  // Message associations
  public getMessages!: HasManyGetAssociationsMixin<Message>;
  public addMessage!: HasManyAddAssociationMixin<Message, number>;
  public addMessages!: HasManyAddAssociationsMixin<Message, number>;
  public countMessages!: HasManyCountAssociationsMixin;
  public createMessage!: HasManyCreateAssociationMixin<Message>;
  public hasMessage!: HasManyHasAssociationMixin<Message, number>;
  public hasMessages!: HasManyHasAssociationsMixin<Message, number>;
  public removeMessage!: HasManyRemoveAssociationMixin<Message, number>;
  public removeMessages!: HasManyRemoveAssociationsMixin<Message, number>;
  public setMessages!: HasManySetAssociationsMixin<Message, number>;

  // Model associations
  public static associations: {
    messages: Association<Chat, Message>;
    job: Association<Chat, Job>;
  };

  // Non-attribute fields
  public readonly job?: NonAttribute<Job>;
  public readonly messages?: NonAttribute<Message[]>;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // Ensures one-to-one relationship with Job
      references: {
        model: 'jobs',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: "chats",
    timestamps: true,
    paranoid: false,
  }
);

Chat.belongsTo(Job, { foreignKey: "jobId", as: "job" });
Job.hasOne(Chat, { foreignKey: "jobId", as: "chat" });
export default Chat;


