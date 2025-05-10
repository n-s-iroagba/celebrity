import { Model, DataTypes, Optional, ForeignKey } from "sequelize";
import sequelize from "../config/orm";
import { Celebrity } from "./Celebrity";
import { Fan } from "./Fan";
import { Project } from "./Project";


export interface SouvenirAttributes {
  id: number;
  name: string;
  description: string;
  images: string[]; // this will now be a JSON array
  celebrityId?: ForeignKey<Celebrity['id']>;
  fanId:ForeignKey<Fan['id']>
  isClaimed:boolean;
  shippingAddress:string|null
    projectId?: ForeignKey<Project['id']>
}

export type SouvenirCreationAttributes = Optional<SouvenirAttributes, "id" | "celebrityId" |"shippingAddress"|'isClaimed'>;

export class Souvenir extends Model<SouvenirAttributes, SouvenirCreationAttributes> implements SouvenirAttributes {
  isClaimed: boolean = false;
  shippingAddress: string | null = null;
  public id!: number;
  public name!: string;
  public description!: string;
  public images!: string[];
  public celebrityId!: ForeignKey<Celebrity['id']>;
  projectId?: ForeignKey<Project['id']>

   fanId!:ForeignKey<Fan['id']>
 
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
    images: {
      type: DataTypes.JSON, // Updated to JSON for MySQL
      allowNull: false,
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      references: {
        model: Celebrity,
        key: 'id',
      },
    },
    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      },
    
    
    isClaimed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      
    }
  },
  {
    sequelize,
    tableName: "souvenirs",
  }
);
Souvenir.belongsTo(Celebrity, { foreignKey: "celebrityId", as: "celebrity" });
Celebrity.hasMany(Souvenir, { foreignKey: "celebrityId", as: "souvenirs" });
export default Souvenir;
