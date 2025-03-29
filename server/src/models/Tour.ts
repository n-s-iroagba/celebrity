import { Model, DataTypes, Optional, ForeignKey, NonAttribute } from "sequelize";
import sequelize from "../config/orm";
import { Job } from "./Job";

export interface TourAttributes {
  id: number;
  description:String
  location:string;
  price: number;
  duration: string
  features: string[];
  jobId: ForeignKey<Job['id']>
  job?: NonAttribute<Job>
}

export interface TourCreationAttributes extends Optional<TourAttributes, 'id'> {}

export class Tour extends Model<TourAttributes, TourCreationAttributes> 
  implements TourAttributes {
  jobId!: ForeignKey<Job['id']>
  
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
      type: DataTypes.ARRAY(DataTypes.STRING),
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
