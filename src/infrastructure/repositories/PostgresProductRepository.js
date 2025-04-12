import { dbClient } from "../database/dbClient.js";
import { Product } from "../../domain/entities/Product.js";
import { ProductRepository } from "../../domain/ports/ProductRepository.js";

export class PostgresProductRepository extends ProductRepository {
  async findAll(searchTerm) {
    let query = "SELECT * FROM productos";
    const params = [];

    if (searchTerm) {
      query += " WHERE nombre ILIKE $1 OR descripcion ILIKE $1 OR sku ILIKE $1";
      params.push(`%${searchTerm}%`);
    }

    const result = await dbClient.query(query, params);
    return result.rows.map(Product.fromDatabase);
  }

  async findById(id) {
    const result = await dbClient.query(
      "SELECT * FROM productos WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return Product.fromDatabase(result.rows[0]);
  }

  async create(product) {
    console.log("PostgresProductRepository - Creando producto:", product);
    try {
      const {
        sku,
        nombre,
        descripcion,
        descripcion_detallada,
        modelo,
        marca,
        referencia,
        costo_anterior,
        costo_actual,
        utilidad_1,
        precio_1,
        utilidad_2,
        precio_2,
        utilidad_3,
        precio_3,
        stock,
      } = product.toDatabase();

      console.log("PostgresProductRepository - Datos para la base de datos:", {
        sku,
        nombre,
        descripcion,
        descripcion_detallada,
        modelo,
        marca,
        referencia,
        costo_anterior,
        costo_actual,
        utilidad_1,
        precio_1,
        utilidad_2,
        precio_2,
        utilidad_3,
        precio_3,
        stock,
      });

      const result = await dbClient.query(
        `INSERT INTO productos (
          sku, nombre, descripcion, descripcion_detallada, 
          modelo, marca, referencia,
          costo_anterior, costo_actual,
          utilidad_1, precio_1,
          utilidad_2, precio_2,
          utilidad_3, precio_3,
          stock
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9,
          $10, $11, $12, $13, $14, $15, $16
        ) RETURNING *`,
        [
          sku,
          nombre,
          descripcion,
          descripcion_detallada,
          modelo,
          marca,
          referencia,
          costo_anterior,
          costo_actual,
          utilidad_1,
          precio_1,
          utilidad_2,
          precio_2,
          utilidad_3,
          precio_3,
          stock,
        ]
      );

      console.log(
        "PostgresProductRepository - Resultado de la inserción:",
        result.rows[0]
      );
      return Product.fromDatabase(result.rows[0]);
    } catch (error) {
      console.error(
        "PostgresProductRepository - Error al crear producto:",
        error
      );
      throw error;
    }
  }

  async update(id, product) {
    const {
      sku,
      nombre,
      descripcion,
      descripcion_detallada,
      modelo,
      marca,
      referencia,
      costo_anterior,
      costo_actual,
      utilidad_1,
      precio_1,
      utilidad_2,
      precio_2,
      utilidad_3,
      precio_3,
      stock,
    } = product.toDatabase();

    const result = await dbClient.query(
      `UPDATE productos SET 
        sku = $1,
        nombre = $2,
        descripcion = $3,
        descripcion_detallada = $4,
        modelo = $5,
        marca = $6,
        referencia = $7,
        costo_anterior = $8,
        costo_actual = $9,
        utilidad_1 = $10,
        precio_1 = $11,
        utilidad_2 = $12,
        precio_2 = $13,
        utilidad_3 = $14,
        precio_3 = $15,
        stock = $16
      WHERE id = $17 RETURNING *`,
      [
        sku,
        nombre,
        descripcion,
        descripcion_detallada,
        modelo,
        marca,
        referencia,
        costo_anterior,
        costo_actual,
        utilidad_1,
        precio_1,
        utilidad_2,
        precio_2,
        utilidad_3,
        precio_3,
        stock,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return Product.fromDatabase(result.rows[0]);
  }

  async delete(id) {
    const result = await dbClient.query(
      "DELETE FROM productos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return Product.fromDatabase(result.rows[0]);
  }

  async updateStock(id, stock) {
    const result = await dbClient.query(
      "UPDATE productos SET stock = $1 WHERE id = $2 RETURNING *",
      [stock, id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return Product.fromDatabase(result.rows[0]);
  }

  async getTotalValue() {
    const result = await dbClient.query(
      "SELECT SUM(costo_actual * stock) as total_costo, SUM(precio_1 * stock) as total_venta FROM productos"
    );

    return {
      totalCosto: Number.parseFloat(result.rows[0].total_costo) || 0,
      totalVenta: Number.parseFloat(result.rows[0].total_venta) || 0,
    };
  }
}
