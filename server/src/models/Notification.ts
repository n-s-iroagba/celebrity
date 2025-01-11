import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
    ForeignKey,
  } from "sequelize";
import { Fan } from "./Fan";
import { Admin } from "./Admin";
import sequelize from "../config/orm";


  export interface NotificationAttributes {
    id: number;
    title: string;
    message: string;
    read:boolean
    recepientId:ForeignKey<Fan['id']|Admin['id']>
  }
  type NotificationCreationAttributes = Optional<NotificationAttributes,'id'>

  export class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> 
    implements NotificationAttributes {
    public read: boolean = false;
    public id!: number;
    title!: string;
    message!: string;
    recepientId!: ForeignKey<Fan['id']|Admin['id']>;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  

    Notification.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        message: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        recepientId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        read: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        }
      },
      {
        sequelize,
        tableName: 'membership_packages',
      }
    );
  