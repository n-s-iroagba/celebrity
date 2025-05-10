import { DataTypes, ForeignKey, Model, NonAttribute, Optional } from "sequelize";
import sequelize from "../config/orm";
import { Celebrity } from "./Celebrity";


export interface CharityAttributes {
  id: number;
  name: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  celebrityId?:ForeignKey<Celebrity['id']>;
  celebrity?:NonAttribute<Celebrity>
}



export type CharityCreationAttributes = Optional<CharityAttributes, "id"|"celebrityId">;

export class Charity
  extends Model<CharityAttributes, CharityCreationAttributes>
  implements CharityAttributes
{
  goalAmount!: number;
  raisedAmount!: number;
  public id!: number;
  public name!: string;
  public description!: string;
  public celebrityId?:ForeignKey<Celebrity['id']>;




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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 500],
      },
    },
    goalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    raisedAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      allowNull:true

    },
 

  },
  {
    sequelize,
    tableName: "charities",
    timestamps: true,
  }
);
Charity.belongsTo(Celebrity, { foreignKey: "celebrityId", as: "celebrity" });
Celebrity.hasMany(Charity, { foreignKey: "celebrityId", as: "charities" });
export default Charity;
