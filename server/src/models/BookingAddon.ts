import { Optional, Model, Sequelize, DataTypes } from "sequelize";

interface BookingAddonAttributes {
  id: number;
  type: 'PHOTOGRAPHY' | 'SECURITY' | 'INSURANCE' | 'SOUVENIR' | 'POST_TOUR_ACCESS';
  details: object;
  price: number;
  bookingId: number;
}
interface BookingAddonCreationAttributes extends Optional<BookingAddonAttributes, 'id'> {}
export class BookingAddon extends Model<BookingAddonAttributes, BookingAddonCreationAttributes> implements BookingAddonAttributes {
  public id!: number;
  public type!: 'PHOTOGRAPHY' | 'SECURITY' | 'INSURANCE' | 'SOUVENIR' | 'POST_TOUR_ACCESS';
  public details!: object;
  public price!: number;
  public bookingId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    BookingAddon.init(
      {
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        type: {
          type: DataTypes.ENUM('PHOTOGRAPHY', 'SECURITY', 'INSURANCE', 'SOUVENIR', 'POST_TOUR_ACCESS'),
          allowNull: false
        },
        details: { type: DataTypes.JSON, allowNull: true },
        price: { type: DataTypes.FLOAT, allowNull: false },
        bookingId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
      },
      { sequelize, tableName: 'booking_addons' }
    );
    return BookingAddon;
  }

  static associate(models: any) {
    BookingAddon.belongsTo(models.Booking, { foreignKey: 'bookingId' });
  }
}
