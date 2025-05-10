
import {
    Model,
    DataTypes,
    Optional,
    NonAttribute,
    ForeignKey,
  } from "sequelize";
  import sequelize from "../config/orm";
import Invoice from "./Invoice";
import { Fan } from "./Fan";
  
  export interface PaymentAttributes {
    id: number;
    items:NonAttribute<Invoice[]>;
    amount: number;
    date: Date;
    fanId:ForeignKey<Fan['id']>
    transactionRef: string;
    
  }
  
  export type PaymentCreationAttributes = Optional<PaymentAttributes, "id">;
  
  export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes>
    implements PaymentAttributes {
    public id!: number;
    public amount!: number;
    public date!: Date;
    public items!: Invoice[];
    public fanId!: ForeignKey<Fan['id']>
      public transactionRef!: string;
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
        allowNull: false
      },
      fanId: {
        type: DataTypes.INTEGER,
        references: {
          model: Fan,
          key: 'id'
        },
      },
      transactionRef: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: "payments",
    }
  );
  
  export default Payment;
  