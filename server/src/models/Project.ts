import { Model, DataTypes, Optional, ForeignKey, NonAttribute, Sequelize } from "sequelize";


interface ProjectAttributes {
  id: number;
  title: string;
  description: string;
  type: 'RESERVATION'|'TOUR'
  location: string;
  startDate: Date;
  endDate: Date;
  accessLevels: object; // e.g. { basic: 500, premium: 1000 }
  isActive: boolean;
  celebrityId: number;
}
interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' | 'isActive'> {}
export class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public location!: string;
  public startDate!: Date;
  public endDate!: Date;
  public type!: 'RESERVATION'|'TOUR'
  public accessLevels!: object;
  public isActive!: boolean;
  public celebrityId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    Project.init(
      {
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        location: { type: DataTypes.STRING, allowNull: false },
        startDate: { type: DataTypes.DATE, allowNull: false },
        endDate: { type: DataTypes.DATE, allowNull: false },
        accessLevels: { type: DataTypes.JSON, allowNull: false },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        celebrityId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        type: {
          type: DataTypes.ENUM('RESERVATION', 'TOUR'),
          allowNull: false,
        }
      },
      { sequelize, tableName: 'projects' }
    );
    return Project;
  }

  static associate(models: any) {
    Project.belongsTo(models.User, { as: 'celebrity', foreignKey: 'celebrityId' });
    Project.hasMany(models.Booking, { foreignKey: 'projectId' });
    Project.hasMany(models.Souvenir, { foreignKey: 'projectId' });
  }
}





