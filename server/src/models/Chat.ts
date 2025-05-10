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
  HasOneGetAssociationMixin,
} from "sequelize";
import sequelize from "../config/orm";
import { Message } from "./Message";
import { Celebrity } from "./Celebrity";
import { Fan } from "./Fan";

export interface ChatAttributes {
  id: number;
  celebrityId:ForeignKey<Celebrity['id']>;
  fanId:ForeignKey<Fan['id']>
  celebrity?:NonAttribute<Celebrity>
  fan?:NonAttribute<Fan>
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ChatCreationAttributes extends Optional<ChatAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Chat extends Model<ChatAttributes, ChatCreationAttributes> implements ChatAttributes {
  public id!: number;
    celebrityId!:ForeignKey<Celebrity['id']>;
  fanId!:ForeignKey<Fan['id']>
  celebrity?:NonAttribute<Celebrity>
  fan?:NonAttribute<Fan>
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  public getFan!: HasOneGetAssociationMixin<Fan>;
    public getCelebrity!: HasOneGetAssociationMixin<Celebrity>;

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

  };

  public readonly messages?: NonAttribute<Message[]>;
}

Chat.init(
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
       fanId: {
      type: DataTypes.INTEGER,
      allowNull: false,

     
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


