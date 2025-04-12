import express from "express"
import { dbClient } from "../database/dbClient.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    // Test database connection
    await dbClient.query("SELECT 1")
    res.json({
      status: "ok",
      message: "Server is running and database connection is established",
      database: process.env.DB_NAME || "inventory",
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: error.message,
    })
  }
})

export { router as healthRoutes }
