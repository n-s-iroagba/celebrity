import {
    Model,
    DataTypes,
    ForeignKey,
    BelongsToGetAssociationMixin,
    NonAttribute,
  } from "sequelize";
  import sequelize from "../config/orm";
  import { Cart } from "./Cart";
  import { Item } from "./Item";
  
  export interface CartItemAttributes {
    id: number;
    cartId: ForeignKey<Cart["id"]>;
    itemId: ForeignKey<Item["id"]>;
    quantity: number;
    // Any other fields specific to the junction table
    createdAt?: Date;
    updatedAt?: Date;
    
    // Optional: If you want to include associated models as non-attributes
    cart?: NonAttribute<Cart>;
    item?: NonAttribute<Item>;
  }
  
  export class CartItem extends Model<CartItemAttributes> implements CartItemAttributes {
    public id!: number;
    public cartId!: ForeignKey<Cart["id"]>;
    public itemId!: ForeignKey<Item["id"]>;
    public quantity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    // Association methods
    public getCart!: BelongsToGetAssociationMixin<Cart>;
    public getItem!: BelongsToGetAssociationMixin<Item>;
  }
  
  CartItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cartId: {
        type: DataTypes.INTEGER,
        references: {
          model: Cart,
          key: "id",
        },
        allowNull: false,
      },
      itemId: {
        type: DataTypes.INTEGER,
        references: {
          model: Item,
          key: "id",
        },
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      tableName: "cart_items",
      // Optional: Add unique constraint to prevent duplicate items in the same cart
      indexes: [
        {
          unique: true,
          fields: ['cartId', 'itemId']
        }
      ]
    }
  );
  
  // Set up the many-to-many association in your Cart model
  Cart.belongsToMany(Item, {
    through: CartItem,
    foreignKey: 'cartId',
    otherKey: 'itemId',
    as: 'items' // this matches the NonAttribute you defined
  });
  
  Item.belongsToMany(Cart, {
    through: CartItem,
    foreignKey: 'itemId',
    otherKey: 'cartId'
  });
  
  export default CartItem;