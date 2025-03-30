import {
  Model,
  DataTypes,
  ForeignKey,
  BelongsToGetAssociationMixin,
  NonAttribute,
} from "sequelize";
import sequelize from "../config/orm";
import { Celebrity } from "./Celebrity";
import { Fan } from "./Fan";
import Item from "./Item";

export interface CartAttributes {
  id: number;
  celebrityId: ForeignKey<Celebrity["id"]>;
  fanId: ForeignKey<Fan["id"]>;
  items?: NonAttribute <Item[]>;
}
export type CartCreationAttribute = Omit<CartAttributes, 'id'>
export class Cart extends Model<CartAttributes,CartCreationAttribute> implements CartAttributes {
  public id!: number;
  public celebrityId!: number;
  public fanId!: number;
  public items!: Item[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association Methods
  public getCelebrity!: BelongsToGetAssociationMixin<Celebrity>;
  public getFan!: BelongsToGetAssociationMixin<Fan>;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      references: {
        model: Celebrity,
        key: "id",
      },
      allowNull: false,
    },
    fanId: {
      type: DataTypes.INTEGER,
      references: {
        model: Fan,
        key: "id",
      },
      allowNull: false,
    },
    
  },
  {
    sequelize,
    tableName: "cart",
  }
);


export default Cart;

  