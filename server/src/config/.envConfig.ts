import dotenv from 'dotenv';
dotenv.config();

// src/config/config.ts
export const config = {
    development: {
      username: process.env.DEV_DB_USERNAME || "root",
      password: process.env.DEV_DB_PASSWORD || "97chocho",
      database: process.env.DEV_DB_NAME || "celebrity",
      host: process.env.DEV_DB_HOST || "127.0.0.1",
      dialect: "mysql",
    },
    test: {
      username: process.env.TEST_DB_USERNAME || "root",
      password: process.env.TEST_DB_PASSWORD || "password",
      database: process.env.TEST_DB_NAME || "test_db",
      host: process.env.TEST_DB_HOST || "127.0.0.1",
      dialect: "mysql",
    },
    production: {
      username: process.env.PROD_DB_USERNAME || "root",
      password: process.env.PROD_DB_PASSWORD || "password",
      database: process.env.PROD_DB_NAME || "prod_db",
      host: process.env.PROD_DB_HOST || "127.0.0.1",
      dialect: "mysql",
    },
  };
  