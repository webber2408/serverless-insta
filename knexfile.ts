import "dotenv/config";

const knexConfig = {
  client: process.env.DB_TYPE,
  connection: {
    host: process.env.DB_CONN,
    port: process.env.DB_PORT,
    user: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  migrations: {
    tableName: "migrations",
    directory: "./src/_db/migrations",
    extension: "ts",
  },
};

export default knexConfig;
