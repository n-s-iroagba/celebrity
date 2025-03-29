import {
  Model,
  DataTypes,
  ForeignKey,
  BelongsToGetAssociationMixin,
} from "sequelize";
import sequelize from "../config/orm";
import { Celebrity } from "./Celebrity";
import { Fan } from "./Fan";
import { ClubMembership } from "./ClubMembership";
import { Charity } from "./Charity";
import { Ticket } from "./Ticket";
import { Souvenir } from "./Souvenir";
import { Tour } from "./Tour";

export interface CartAttributes {
  id: number;
  celebrityId: ForeignKey<Celebrity["id"]>;
  fanId: ForeignKey<Fan["id"]>;
  itemType: "ClubMembership" | "Charity" | "Ticket" | "Souvenir" | "Tour";
  itemId: number;
}

export class Cart extends Model<CartAttributes> implements CartAttributes {
  public id!: number;
  public celebrityId!: number;
  public fanId!: number;
  public itemType!: "ClubMembership" | "Charity" | "Ticket" | "Souvenir" | "Tour";
  public itemId!: number;

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
    itemType: {
      type: DataTypes.ENUM("ClubMembership", "Charity", "Ticket", "Souvenir", "Tour"),
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "cart",
  }
);


export default Cart;

  