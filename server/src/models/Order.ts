import {
  Model,
  DataTypes,
  type Optional,
  type ForeignKey,
  type HasManyGetAssociationsMixin,
  type BelongsToGetAssociationMixin,
} from "sequelize"
import sequelize from "../config/orm"
import { User } from "./User"
import { OrderItem } from "./OrderItem"
import { Invoice } from "./Invoice"

export interface OrderAttributes {
  id: number
  fanId: ForeignKey<User["id"]>
  orderDate: Date
  totalAmount: number
  status: "pending" | "completed" | "failed" | "cancelled"
  invoiceId?: ForeignKey<Invoice["id"]>
}

export type OrderCreationAttributes = Optional<OrderAttributes, "id" | "orderDate" | "status">

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number
  public fanId!: ForeignKey<User["id"]>
  public orderDate!: Date
  public totalAmount!: number
  public status!: "pending" | "completed" | "failed" | "cancelled"
  public invoiceId?: ForeignKey<Invoice["id"]>

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // Associations
  public getOrderItems!: HasManyGetAssociationsMixin<OrderItem>
  public getFan!: BelongsToGetAssociationMixin<User>
  public getInvoice!: BelongsToGetAssociationMixin<Invoice>
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    invoiceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Invoice,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "orders",
  },
)

Order.hasMany(OrderItem, { foreignKey: "orderId", as: "orderItems" })
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" })
