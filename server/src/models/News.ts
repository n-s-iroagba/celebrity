import {
  Model,
  DataTypes,
  ForeignKey,
  Optional,
} from "sequelize";
import { Celebrity } from "./Celebrity";
import sequelize from "../config/orm";


export interface NewsAttributes {
  id: number;
  title: string;
  content: string;
  celebrityId: ForeignKey<Celebrity['id']>
}
type NewsCreationAttributes = Optional<NewsAttributes, "id">;
export class News extends Model<NewsAttributes, NewsCreationAttributes >
  implements NewsAttributes {
  public id!: number;
public title!: string;
public content!: string;
public celebrityId!: ForeignKey<Celebrity['id']>;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

  News.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: 'membership_packages',
    }
  );
