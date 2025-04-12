import express from "express"
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
  getTotalValue,
} from "../controllers/productController.js"

const router = express.Router()

// Product routes
router.get("/", getAllProducts)
router.post("/", createProduct)
router.get("/:id", getProductById)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)
router.put("/:id/stock", updateProductStock)

// Report route
router.get("/reporte-valor", getTotalValue)

export { router as productRoutes }
