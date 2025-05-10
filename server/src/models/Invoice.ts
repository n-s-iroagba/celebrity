import {
  Model,
  DataTypes,
  ForeignKey,
  NonAttribute,
} from "sequelize";
import sequelize from "../config/orm";
import Payment from "./Payment";

export interface InvoiceAttributes {
  id: number;
  invoiceType: "ClubMembership" | "Charity" | "Ticket" | "Souvenir" | "Tour"|'Booking'|'Reservation';
  price:number;
  paymentId?:ForeignKey<Payment['id']>
  payment?:NonAttribute<Payment>
  paymentDate:Date
}

export type InvoiceCreationAttributes = Omit<InvoiceAttributes, 'id'|"paymentId">;

export class Invoice extends Model<InvoiceAttributes,InvoiceCreationAttributes> implements InvoiceAttributes {
  public id!: number;
  public price!:number;
  public invoiceType!: "ClubMembership" | "Charity" | "Ticket" | "Souvenir" | "Tour"|'Booking'|'Reservation';
  public paymentId?: ForeignKey<Payment['id']>;
  paymentDate!:Date
}



Invoice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    invoiceType: {
      type: DataTypes.ENUM("ClubMembership", "Charity", "Ticket", "Souvenir,Tour",'Reservation'),
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "Invoice",
  }
);


export default Invoice;

  