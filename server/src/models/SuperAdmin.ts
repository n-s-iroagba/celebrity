import {
  Model,
  DataTypes,
  Optional,
  Sequelize,
} from "sequelize";


interface SuperAdminAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  adminId:number;
}

type SuperAdminCreationAttributes = Optional<SuperAdminAttributes, "id">;

export class SuperAdmin extends Model<SuperAdminAttributes, SuperAdminCreationAttributes>
  implements SuperAdminAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public adminId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

  SuperAdmin.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    { sequelize, tableName: "superadmins", timestamps: true }
  );