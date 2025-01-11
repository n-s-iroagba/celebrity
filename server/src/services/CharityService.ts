import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
  } from "sequelize";
import sequelize from "../config/orm";

  interface CharityAttributes {
    id: number;
     campaignName: string;
     pitch: string;
     amount: number;
  }
  
  type CharityCreationAttributes = Optional<CharityAttributes, "id">;
  
  export class Charity extends Model<CharityAttributes, CharityCreationAttributes>
    implements CharityAttributes {
      public id!: number;
      public campaignName!: string;
      public pitch!: string;
      public amount!: number;
      public readonly createdAt!: Date;
      public readonly updatedAt!: Date;
  }
  
  
  
    Charity.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        campaignName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        pitch: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        }
      },
      {
        sequelize,
        tableName: 'charities'
      }
    );