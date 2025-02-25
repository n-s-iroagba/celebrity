import { DataTypes, ForeignKey, Model, Optional, NonAttribute } from "sequelize";
import { Admin } from "./Admin";
import { User } from "./User";
import sequelize from "../config/orm";

interface FanAttributes {
  id: number;
  firstName: string;
  surname: string;
  password: string;
  profilePicture:string|null;
  whatsappNumber: string;
  whatsappCode: string|null
  country: string;
  dateOfBirth: Date;
  adminId: ForeignKey<Admin["id"]>;
  userId: ForeignKey <User['id']>
//   user: NonAttribute<User>
//   admin : NonAttribute<Admin>
}

export type FanCreationAttributes = Optional<FanAttributes, "id">;

export class Fan   extends  Model<FanAttributes, FanCreationAttributes> implements FanAttributes {
  public profilePicture: string | null=null;
  public userId!: number
  public id!: number;
  public firstName!: string;
  public surname!: string;
  public password!: string;
  public whatsappNumber!: string;
  public whatsappCode!: string | null;
  public country!: string;
  public dateOfBirth!: Date;

  public adminId!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: { Admin: typeof Admin }) {
    Fan.belongsTo(models.Admin, { foreignKey: "adminId", as: "admin" });
  }
}

  Fan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      whatsappNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      whatsappCode: {
        type: DataTypes.STRING,
        allowNull: true,

      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    
    },
    {
      sequelize,
      tableName: "fans",
    }
  );

