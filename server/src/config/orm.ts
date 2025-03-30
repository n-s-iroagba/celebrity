// db/index.ts
import { Sequelize } from "sequelize";
import {config }from "./.envConfig";


const env = process.env.NODE_ENV || "development";

const dbConfig = config[env as keyof typeof config];


const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect as "mysql"
  }
);

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });


export default sequelize;
