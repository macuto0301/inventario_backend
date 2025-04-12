import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { productRoutes } from "./infrastructure/routes/productRoutes.js";
import { healthRoutes } from "./infrastructure/routes/healthRoutes.js";
import { dolarRoutes } from "./infrastructure/routes/dolarRoutes.js";
import { errorHandler } from "./infrastructure/middlewares/errorHandler.js";
import { dbClient } from "./infrastructure/database/dbClient.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const envPath = path.resolve(__dirname, "../.env");
console.log("Loading .env from:", envPath);
dotenv.config({ path: envPath });

console.log("Environment variables loaded:", {
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  // No mostramos DB_PASSWORD por seguridad
});

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/productos", productRoutes);
app.use("/health", healthRoutes);
app.use("/dolar", dolarRoutes);

// Error handling middleware
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database connection
    await dbClient.connect();
    console.log("Connected to PostgreSQL database");

    // Create tables if they don't exist
    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT,
        sku VARCHAR(255) NOT NULL UNIQUE,
        stock INTEGER NOT NULL DEFAULT 0,
        descripcion_detallada TEXT,
        modelo VARCHAR(100),
        marca VARCHAR(100),
        referencia VARCHAR(100),
        costo_anterior NUMERIC(12,2) DEFAULT 0,
        costo_actual NUMERIC(12,2) DEFAULT 0,
        utilidad_1 NUMERIC(12,2) DEFAULT 0,
        precio_1 NUMERIC(12,2) DEFAULT 0,
        utilidad_2 NUMERIC(12,2) DEFAULT 0,
        precio_2 NUMERIC(12,2) DEFAULT 0,
        utilidad_3 NUMERIC(12,2) DEFAULT 0,
        precio_3 NUMERIC(12,2) DEFAULT 0
      );
    `);
    console.log("Database tables initialized");

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
