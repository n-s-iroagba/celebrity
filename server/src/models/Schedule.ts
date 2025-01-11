import {
    Model,
    DataTypes,
    Optional,
    ForeignKey,
  } from "sequelize";
import sequelize from "../config/orm";
import { Admin } from "./Admin";


  export interface ScheduleAttributes {
    id: number;
   date:Date
   time:string
   adminId:ForeignKey<Admin['id']>
   isBooked:boolean;
  }
  type ScheduleCreationAttributes = Optional<ScheduleAttributes,'id'>
  export class Schedule extends Model<ScheduleAttributes, ScheduleCreationAttributes> 
    implements ScheduleAttributes {
    public adminId!: number ;
   public isBooked!: boolean;
    public time!: string;
    public id!: number;
  public date!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  

    Schedule.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },

        time: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        isBooked: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        }
      },
      {
        sequelize,
        tableName: 'membership_packages',
      }
    );
  