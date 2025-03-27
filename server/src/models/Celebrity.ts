import {
  Model,
  DataTypes,
  Optional,
  Sequelize,
  NonAttribute,
} from "sequelize";
import sequelize from "../config/orm";
import Chat from "./Chat";

export interface CelebrityAttributes {
  id: number;
  firstName: string;
  surname: string;
  bio: string;
  image: string;
  isConfirmed:boolean;
  stageName: string;
  Chats?: NonAttribute<Chat[]>;
}

type CelebrityCreationAttributes = Optional<CelebrityAttributes, "id">;

export class Celebrity extends Model<CelebrityAttributes, CelebrityCreationAttributes>
  implements CelebrityAttributes {
  public id!: number;
  public firstName!: string;
  public surname!: string;
  public bio!: string;
  public image!: string;
  public isConfirmed!: boolean;
  public stageName!: string;
  public Chats?: NonAttribute<Chat[]>;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


  Celebrity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stageName: {
        type: DataTypes.STRING,
        allowNull: false,
       
      },
      isConfirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: "celebrities",
    }
  );

// Associations
Celebrity.hasMany(Chat, {
  foreignKey: 'celebrityId',
  as: 'Chats'
});