
import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
    NonAttribute,
    ForeignKey,
  } from "sequelize";
  import sequelize from "../config/orm";
import Item from "./Item";
import { Fan } from "./Fan";
  
  export interface PaymentAttributes {
    id: number;
    items:NonAttribute<Item[]>;
    amount: number;
    date: Date;
    fanId:ForeignKey<Fan['id']>
  }
  
  export type PaymentCreationAttributes = Optional<PaymentAttributes, "id">;
  
  export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes>
    implements PaymentAttributes {
    public id!: number;
    public itemType!: "ClubMembership" | "Charity" | "Ticket" | "Souvenir" | "Tour";
    public amount!: number;
    public date!: Date;
    public items!: Item[];
    public fanId!: ForeignKey<Fan['id']>
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
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      items: {
        type: DataTypes.JSONB,
        allowNull:false
      },
      fanId:{
        type:DataTypes.INTEGER,
        references: {
          model: Fan,
          key: 'id'
          },
      }
    },
    {
      sequelize,
      tableName: "payments",
    }
  );
  
  export default Payment;
  