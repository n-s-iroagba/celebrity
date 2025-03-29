import {
  Model,
  DataTypes,
  Optional,
  Sequelize,
  BelongsToManyAddAssociationMixin,
} from "sequelize";
import sequelize from "../config/orm";
import { Job } from "./Job";

// Define attributes for the Souvenir model
export interface SouvenirAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
}

// Define creation attributes, making `id` optional
export type SouvenirCreationAttributes = Optional<SouvenirAttributes, "id">;

export class Souvenir
  extends Model<SouvenirAttributes, SouvenirCreationAttributes>
  implements SouvenirAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public images!: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association Methods
  public addJob!: BelongsToManyAddAssociationMixin<Job, number>;
}

// Initialize the Souvenir model
Souvenir.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING), // PostgreSQL only
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "souvenirs",
  }
);


export default Souvenir;
