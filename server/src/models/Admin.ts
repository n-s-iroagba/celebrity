import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
  } from "sequelize";
  

  interface AdminAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
  }
  
  type AdminCreationAttributes = Optional<AdminAttributes, "id">;
  
  export class Admin extends Model<AdminAttributes, AdminCreationAttributes>
    implements AdminAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  