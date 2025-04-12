import { Product } from "../../../domain/entities/Product.js";

export class CreateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData) {
    console.log("CreateProductUseCase - Datos recibidos:", productData);

    try {
      // Convertir stock a número si existe
      let stock = 0;
      if (productData.stock !== undefined && productData.stock !== "") {
        stock = Number(productData.stock);
        if (!Number.isInteger(stock)) {
          throw new Error("El stock debe ser un número entero");
        }
        if (stock < 0) {
          throw new Error("El stock no puede ser negativo");
        }
      }

      // Validar campos numéricos si están presentes y no están vacíos
      const numericFields = [
        "costo_anterior",
        "costo_actual",
        "utilidad_1",
        "precio_1",
        "utilidad_2",
        "precio_2",
        "utilidad_3",
        "precio_3",
      ];

      for (const field of numericFields) {
        if (productData[field] !== undefined && productData[field] !== "") {
          const value = Number(productData[field]);
          if (isNaN(value)) {
            throw new Error(`El campo ${field} debe ser un número válido`);
          }
          // Validar que tenga máximo 2 decimales

          // Validar el rango según NUMERIC(12,2)
          if (value < -9999999999.99 || value > 9999999999.99) {
            throw new Error(`El campo ${field} está fuera del rango permitido`);
          }
        }
      }

      // Validar longitud máxima de campos VARCHAR solo si están presentes
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

      // Crear una nueva entidad de producto con valores por defecto para todos los campos
      const product = new Product(
        null, // ID será generado por la base de datos
        productData.nombre || "",
        productData.descripcion || "",
        productData.sku || "",
        stock,
        productData.descripcion_detallada || "",
        productData.modelo || "",
        productData.marca || "",
        productData.referencia || "",
        productData.costo_anterior ? Number(productData.costo_anterior) : 0,
        productData.costo_actual ? Number(productData.costo_actual) : 0,
        productData.utilidad_1 ? Number(productData.utilidad_1) : 0,
        productData.precio_1 ? Number(productData.precio_1) : 0,
        productData.utilidad_2 ? Number(productData.utilidad_2) : 0,
        productData.precio_2 ? Number(productData.precio_2) : 0,
        productData.utilidad_3 ? Number(productData.utilidad_3) : 0,
        productData.precio_3 ? Number(productData.precio_3) : 0
      );

      console.log("CreateProductUseCase - Producto a crear:", product);

      // Guardar el producto en el repositorio
      const result = await this.productRepository.create(product);
      console.log("CreateProductUseCase - Producto creado:", result);
      return result;
    } catch (error) {
      console.error("CreateProductUseCase - Error:", error);
      throw error;
    }
  }
}
