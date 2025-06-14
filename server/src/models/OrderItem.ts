import { Model, DataTypes, type Optional, type ForeignKey, type BelongsToGetAssociationMixin } from "sequelize"
import sequelize from "../config/orm"
import { Order } from "./Order"
import { Ticket } from "./Ticket"

export interface OrderItemAttributes {
  id: number
  orderId: ForeignKey<Order["id"]>
  ticketId: ForeignKey<Ticket["id"]>
  quantity: number
  pricePerTicket: number // Price at the time of purchase
}

export type OrderItemCreationAttributes = Optional<OrderItemAttributes, "id">

export class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  public id!: number
  public orderId!: ForeignKey<Order["id"]>
  public ticketId!: ForeignKey<Ticket["id"]>
  public quantity!: number
  public pricePerTicket!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // Associations
  public getOrder!: BelongsToGetAssociationMixin<Order>
  public getTicket!: BelongsToGetAssociationMixin<Ticket>
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ticket,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    pricePerTicket: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize,
    tableName: "order_items",
  },
)
