import { DataTypes, Model, Optional, Sequelize, ForeignKey } from "sequelize";
import { Fan } from "./Fan";

export interface CartAttributes {
  id: number;
  fanId: ForeignKey<Fan["id"]>;
  items: {
    donationCampaigns?: number[];
    souvenirs?: number[];
    eventTickets?: number[];
    tourPackages?: number[];
    clubMemberships?: number[];
  };
}

 type CartCreationAttributes = Optional<CartAttributes, "id">;

export class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public id!: number;
  public fanId!: number;
  public items!: {
    donationCampaigns?: number[];
    souvenirs?: number[];
    eventTickets?: number[];
    tourPackages?: number[];
    clubMemberships?: number[];
  };

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: { Fan: typeof Fan }) {
    Cart.belongsTo(models.Fan, { foreignKey: "fanId", as: "fan" });
  }
}

export const initializeCart = (sequelize: Sequelize) => {
  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      items: {
        type: DataTypes.JSONB, // Store the cart items in JSON format
        allowNull: false,
        defaultValue: {
          donationCampaigns: [],
          souvenirs: [],
          eventTickets: [],
          tourPackages: [],
          clubMemberships: [],
        },
      },
    },
    {
      sequelize,
      tableName: "Carts",
    }
  );
};
