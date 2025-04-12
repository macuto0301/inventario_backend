import { PostgresProductRepository } from "../repositories/PostgresProductRepository.js";
import { GetAllProductsUseCase } from "../../application/usecases/product/GetAllProductsUseCase.js";
import { GetProductByIdUseCase } from "../../application/usecases/product/GetProductByIdUseCase.js";
import { CreateProductUseCase } from "../../application/usecases/product/CreateProductUseCase.js";
import { UpdateProductUseCase } from "../../application/usecases/product/UpdateProductUseCase.js";
import { DeleteProductUseCase } from "../../application/usecases/product/DeleteProductUseCase.js";
import { UpdateProductStockUseCase } from "../../application/usecases/product/UpdateProductStockUseCase.js";
import { GetTotalValueUseCase } from "../../application/usecases/product/GetTotalValueUseCase.js";

// Initialize repository
const productRepository = new PostgresProductRepository();

// Initialize use cases
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
const createProductUseCase = new CreateProductUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const updateProductStockUseCase = new UpdateProductStockUseCase(
  productRepository
);
const getTotalValueUseCase = new GetTotalValueUseCase(productRepository);

// Controller methods
export const getAllProducts = async (req, res, next) => {
  try {
    const searchTerm = req.query.termino;
    const products = await getAllProductsUseCase.execute(searchTerm);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdUseCase.execute(id);
    res.json(product);
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(404).json({ message: "Product not found" });
    }
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    console.log("Datos recibidos:", req.body);
    const productData = req.body;
    const newProduct = await createProductUseCase.execute(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear producto:", error);
    if (error.message.includes("Faltan campos requeridos")) {
      return res.status(400).json({ message: error.message });
    }
    if (error.message.includes("debe ser un número")) {
      return res.status(400).json({ message: error.message });
    }
    if (error.message.includes("no puede exceder")) {
      return res.status(400).json({ message: error.message });
    }
    if (error.message.includes("debe tener máximo")) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    console.log("updateProduct - Datos recibidos:", req.body);
    const { id } = req.params;
    const productData = req.body;
    const updatedProduct = await updateProductUseCase.execute(id, productData);
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error en updateProduct:", error);
    if (error.message === "Product not found") {
      return res.status(404).json({ message: "Product not found" });
    }
    if (error.message.includes("debe ser un número")) {
      return res.status(400).json({ message: error.message });
    }
    if (error.message.includes("no puede exceder")) {
      return res.status(400).json({ message: error.message });
    }
    if (error.message.includes("está fuera del rango permitido")) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteProductUseCase.execute(id);
    res.status(204).end();
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(404).json({ message: "Product not found" });
    }
    next(error);
  }
};

export const updateProductStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (stock === undefined) {
      return res.status(400).json({ message: "Stock value is required" });
    }

    const updatedProduct = await updateProductStockUseCase.execute(id, stock);
    res.json(updatedProduct);
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(404).json({ message: "Product not found" });
    }
    if (error.message === "Stock cannot be negative") {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

export const getTotalValue = async (req, res, next) => {
  try {
    const totalValue = await getTotalValueUseCase.execute();
    res.json(totalValue);
  } catch (error) {
    next(error);
  }
};
