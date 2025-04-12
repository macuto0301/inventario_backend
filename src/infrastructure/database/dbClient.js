import pkg from "pg";
const { Pool } = pkg;

// Database configuration
const dbConfig = {
  user: "master",
  password: "masterkey",
  host: "localhost",
  port: 5432,
  database: "inventory",
};

console.log("Database configuration:", {
  user: dbConfig.user,
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  // No mostramos la contraseña por seguridad
});

// Create a new pool instance
export const dbClient = new Pool(dbConfig);
