import { Product } from "../../../domain/entities/Product.js";

export class UpdateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id, productData) {
    try {
      console.log("UpdateProductUseCase - Datos recibidos:", productData);

      // Check if product exists
      const existingProduct = await this.productRepository.findById(id);

      if (!existingProduct) {
        throw new Error("Product not found");
      }

      // Validar campos numéricos
      const numericFields = [
        "costo_anterior",
        "costo_actual",
        "utilidad_1",
        "precio_1",
        "utilidad_2",
        "precio_2",
        "utilidad_3",
        "precio_3",
        "stock",
      ];

      for (const field of numericFields) {
        if (productData[field] !== undefined && productData[field] !== "") {
          const value = Number(productData[field]);
          if (isNaN(value)) {
            throw new Error(`El campo ${field} debe ser un número válido`);
          }
          if (value < -9999999999.99 || value > 9999999999.99) {
            throw new Error(`El campo ${field} está fuera del rango permitido`);
          }
        }
      }

      // Validar longitud máxima de campos VARCHAR
      if (productData.nombre && productData.nombre.length > 255) {
        throw new Error("El nombre no puede exceder los 255 caracteres");
      }
      if (productData.sku && productData.sku.length > 255) {
        throw new Error("El SKU no puede exceder los 255 caracteres");
      }

      const varcharFields = ["modelo", "marca", "referencia"];
      for (const field of varcharFields) {
        if (productData[field] && productData[field].length > 100) {
          throw new Error(
            `El campo ${field} no puede exceder los 100 caracteres`
          );
        }
      }

      // Create updated product entity
      const updatedProduct = new Product(
        id,
        productData.nombre || existingProduct.nombre,
        productData.descripcion !== undefined
          ? productData.descripcion
          : existingProduct.descripcion,
        productData.sku || existingProduct.sku,
        productData.stock !== undefined
          ? Number(productData.stock)
          : existingProduct.stock,
        productData.descripcion_detallada !== undefined
          ? productData.descripcion_detallada
          : existingProduct.descripcion_detallada,
        productData.modelo !== undefined
          ? productData.modelo
          : existingProduct.modelo,
        productData.marca !== undefined
          ? productData.marca
          : existingProduct.marca,
        productData.referencia !== undefined
          ? productData.referencia
          : existingProduct.referencia,
        productData.costo_anterior !== undefined
          ? Number(productData.costo_anterior)
          : existingProduct.costo_anterior,
        productData.costo_actual !== undefined
          ? Number(productData.costo_actual)
          : existingProduct.costo_actual,
        productData.utilidad_1 !== undefined
          ? Number(productData.utilidad_1)
          : existingProduct.utilidad_1,
        productData.precio_1 !== undefined
          ? Number(productData.precio_1)
          : existingProduct.precio_1,
        productData.utilidad_2 !== undefined
          ? Number(productData.utilidad_2)
          : existingProduct.utilidad_2,
        productData.precio_2 !== undefined
          ? Number(productData.precio_2)
          : existingProduct.precio_2,
        productData.utilidad_3 !== undefined
          ? Number(productData.utilidad_3)
          : existingProduct.utilidad_3,
        productData.precio_3 !== undefined
          ? Number(productData.precio_3)
          : existingProduct.precio_3
      );

      console.log(
        "UpdateProductUseCase - Producto a actualizar:",
        updatedProduct
      );

      // Update the product in the repository
      const result = await this.productRepository.update(id, updatedProduct);

      if (!result) {
        throw new Error("Failed to update product");
      }

      return result;
    } catch (error) {
      console.error("UpdateProductUseCase - Error:", error);
      throw error;
    }
  }
}
