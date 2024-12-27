import {
  Model,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { Celebrity } from "./Celebrity";


export interface NewsAttributes {
  id: number;
  title: string;
  content: string;
  celebrityId: ForeignKey<Celebrity['id']>
}

export class News extends Model<NewsAttributes>
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
