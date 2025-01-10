import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
  } from "sequelize";


  export interface SouvenirsAttributes {
    id: number
    price: number;
    images: string[];
  }
  
  export class Souvenirs extends Model<SouvenirsAttributes>
    implements SouvenirsAttributes {
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
        }
      },
      {
        sequelize,
        tableName: 'souvernirs',
      }
    );
  