import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/orm";

export interface TourPackageAttributes {
  id: number;
  price: number;
  tier: string;
  startDate: Date;
  endDate: Date;
  perks: string[];
}

export interface TourPackageCreationAttributes extends Optional<TourPackageAttributes, 'id'> {}

export class TourPackage extends Model<TourPackageAttributes, TourPackageCreationAttributes> 
  implements TourPackageAttributes {
  public id!: number;
  public price!: number;
  public tier!: string;
  public startDate!: Date;
  public endDate!: Date;
  public perks!: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TourPackage.init(
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
    tier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    perks: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tour_packages',
  }
);
