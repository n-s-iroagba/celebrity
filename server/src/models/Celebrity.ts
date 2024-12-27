import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
  } from "sequelize";

  export interface CelebrityAttributes {
    id: number;
    name:string;
  
  }
    type CelebrityCreationAttributes = Optional<CelebrityAttributes, "id">;
    
    export class Celebrity extends Model<CelebrityAttributes, CelebrityCreationAttributes>{
    public id!: number;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  export const initCelebrity = (sequelize: Sequelize) => {
    Celebrity.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'celebrities',
      }
    );
  };
  