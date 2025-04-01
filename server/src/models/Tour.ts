import { Model, DataTypes, Optional, ForeignKey, NonAttribute } from "sequelize";
import sequelize from "../config/orm";
import { Celebrity } from "./Celebrity";
import Item from "./Item";

export interface TourAttributes {
  id: number;
  description:String
  location:string;
  price: number;
  duration: string
  features: string[];
  celebrityId?: ForeignKey<Celebrity['id']>
  job?: NonAttribute<Celebrity>
  itemId?:ForeignKey<Item['id']>
}

export interface TourCreationAttributes extends Optional<TourAttributes, 'id'|'itemId'> {}

export class Tour extends Model<TourAttributes, TourCreationAttributes> 
  implements TourAttributes {
  celebrityId?: ForeignKey<Celebrity['id']>
  itemId?: ForeignKey<Item['id']>;
  location!: string;
  features!: string[];
  public description!: String;
 public  price!: number;
  public duration !: string;
  public perks !: string[];
  public id!: number;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Tour.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    features: {
    type: DataTypes.JSON,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  },
  {
    sequelize,
    tableName: 'tour_packages',
  }
);

Tour.belongsTo(Celebrity, { foreignKey: "celebrityId", as: "celebrity" });
Celebrity.hasMany(Tour, { foreignKey: "celebrityId", as: "tours" });
