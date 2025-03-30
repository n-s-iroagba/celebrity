import {
  Model,
  DataTypes,
  ForeignKey,
  NonAttribute,
} from "sequelize";
import sequelize from "../config/orm";
import Payment from "./Payment";

export interface ItemAttributes {
  id: number;
  itemType: "ClubMembership" | "Charity" | "Ticket" | "Souvenir" | "Tour";
  price:number;
  paymentId?:ForeignKey<Payment['id']>
  payment?:NonAttribute<Payment>
}

export type ItemCreationAttributes = Omit<ItemAttributes, 'id'|"paymentId">;

export class Item extends Model<ItemAttributes,ItemCreationAttributes> implements ItemAttributes {
  public id!: number;
  public price!:number;
  public itemType!: "ClubMembership" | "Charity" | "Ticket" | "Souvenir" | "Tour";
  public paymentId?: ForeignKey<Payment['id']>;

}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    itemType: {
      type: DataTypes.ENUM("ClubMembership", "Charity", "Ticket", "Souvenir,Tour"),
      allowNull:false
    },
    price: {
      type:DataTypes.DOUBLE,
      allowNull:false
    }
  },
  {
    sequelize,
    tableName: "Item",
  }
);


export default Item;

  