import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
  } from "sequelize";
  import sequelize from "../config/orm";
  
  export interface PaymentAttributes {
    id: number;
    itemType: "ClubMembership" | "Charity" | "Ticket" | "Souvenir" | "Tour";
    price: number;
    date: Date;
  }
  
  export type PaymentCreationAttributes = Optional<PaymentAttributes, "id">;
  
  export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes>
    implements PaymentAttributes {
    public id!: number;
    public itemType!: "ClubMembership" | "Charity" | "Ticket" | "Souvenir" | "Tour";
    public price!: number;
    public date!: Date;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      itemType: {
        type: DataTypes.ENUM("ClubMembership", "Charity", "Ticket", "Souvenir", "Tour"),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "payments",
    }
  );
  
  export default Payment;
  