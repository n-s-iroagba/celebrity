import { DataTypes, ForeignKey, Model, Optional } from 'sequelize';
import sequelize from '../config/orm';
import { Fan } from './Fan';

export interface PaymentAttributes {
  id: number;
  fanId: ForeignKey<Fan['id']>;
  amount: number;
  item: 'Event' | 'TourPackage' | 'Souvenir' | 'Charity' | 'Clubmembership';
  itemId: number; // The ID of the specific item
}

export interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id'> {}

export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: number;
  public fanId!: number;
  public amount!: number;
  public item!: 'Event' | 'TourPackage' | 'Souvenir' | 'Charity' | 'Clubmembership';
  public itemId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: { Fan: typeof Fan }) {
    Payment.belongsTo(models.Fan, { foreignKey: 'fanId', as: 'fan' });
  }
}

Payment.init(
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
        model: Fan,
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    item: {
      type: DataTypes.ENUM('Event', 'TourPackage', 'Souvenir', 'Charity', 'Clubmembership'),
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Payments',
  }
);


