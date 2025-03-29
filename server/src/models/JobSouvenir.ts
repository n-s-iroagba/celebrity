import { DataTypes } from "sequelize";
import sequelize from "../config/orm";
import { Job } from "./Job";
import Souvenir from "./Souvenir";

// Define the many-to-many relationship via a junction table
export const JobSouvenir = sequelize.define(
  "JobSouvenir",
  {
    jobId: {
      type: DataTypes.INTEGER,
      references: {
        model: Job,
        key: "id",
      },
      onDelete: "CASCADE",
      primaryKey: true,
    },
    souvenirId: {
      type: DataTypes.INTEGER,
      references: {
        model: Souvenir,
        key: "id",
      },
      onDelete: "CASCADE",
      primaryKey: true,
    },
  },
  {
    tableName: "job_souvenirs",
    timestamps: false,
  }
);

// Define Many-to-Many Associations
Job.belongsToMany(Souvenir, { through: JobSouvenir, foreignKey: "jobId" });
Souvenir.belongsToMany(Job, { through: JobSouvenir, foreignKey: "souvenirId" });
