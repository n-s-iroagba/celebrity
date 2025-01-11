import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
    ForeignKey,
  } from "sequelize";
import { Celebrity } from "./Celebrity";
import sequelize from "../config/orm";


  export interface SouvenirsAttributes {
    id: number
    price: number;
    images: string[];
    celebrityId : ForeignKey<Celebrity['id']>
  }
  export interface SouvenirsCreationAttributes extends Optional<SouvenirsAttributes, 'id'> {}
  
  export class Souvenirs extends Model<SouvenirsAttributes,SouvenirsCreationAttributes>
    implements SouvenirsAttributes {
    public celebrityId!: number 
    public id!: number;
    public images!: string[]
    public price!: number;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
    Souvenirs.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
        },
        celebrityId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'souvernirs',
      }
    );
  