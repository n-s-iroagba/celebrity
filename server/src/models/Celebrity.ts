import {
  Model,
  DataTypes,
  Optional,
  Sequelize,
} from "sequelize";

export interface CelebrityAttributes {
  id: number;
  firstName: string;
  surname: string;
  bio: string;
  galleryImages: string[];
  stageName: string;
}

type CelebrityCreationAttributes = Optional<CelebrityAttributes, "id">;

export class Celebrity extends Model<CelebrityAttributes, CelebrityCreationAttributes>
  implements CelebrityAttributes {
  public id!: number;
  public firstName!: string;
  public surname!: string;
  public bio!: string;
  public galleryImages!: string[];
  public stageName!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initCelebrity = (sequelize: Sequelize) => {
  Celebrity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      galleryImages: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Stores an array of image URLs
        allowNull: true,
      },
      stageName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "celebrities",
    }
  );
};
