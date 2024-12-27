import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
  } from "sequelize";


  export interface VideoCallScheduleAttributes {
    id: number;
   dateTime:Date
  
  }
  
  export class VideoCallSchedule extends Model<VideoCallScheduleAttributes>
    implements VideoCallScheduleAttributes {
    public id!: number;
  public dateTime!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  

    VideoCallSchedule.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        dateTime: {
          type: DataTypes.DATE,
          allowNull: false,
        }
      },
      {
        sequelize,
        tableName: 'membership_packages',
      }
    );
  