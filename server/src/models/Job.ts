import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
  } from "sequelize";
import sequelize from "../config/orm";

  export interface JobAttributes {
    id: number;
    adminId: number;
    celebrityId: number;
    tourPackageTier: string;
    charityCampaign: string;
    membershipPackageTier: string;
    souvenirs: number;
    amountPaid: number;
  }
  
  export class Job extends Model<JobAttributes> implements JobAttributes {
    public id!: number;
    public adminId!: number;
    public celebrityId!: number;
    public tourPackageTier!: string;
    public charityCampaign!: string;
    public membershipPackageTier!: string;
    public souvenirs!: number;
    public amountPaid!: number;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  

    Job.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        adminId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        celebrityId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        tourPackageTier: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        charityCampaign: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        membershipPackageTier: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        souvenirs: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amountPaid: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'jobs',
      }
    );
  
  