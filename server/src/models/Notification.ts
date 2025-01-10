import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
    ForeignKey,
  } from "sequelize";
import { Fan } from "./Fan";


  export interface NotificationAttributes {
    id: number;
    title: string;
    description: string;
    fanId:ForeignKey<Fan['id']>
  }
  
  export class Notification extends Model<NotificationAttributes>
    implements NotificationAttributes {
    public id!: number;
    title!: string;
    description!: string;
    fanId!: ForeignKey<Fan['id']>;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  export const initNotification = (sequelize: Sequelize) => {
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
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        sequelize,
        tableName: 'membership_packages',
      }
    );
  };