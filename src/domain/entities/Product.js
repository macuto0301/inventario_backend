export class Product {
  constructor(
    id = null,
    nombre = null,
    descripcion = null,
    sku = null,
    stock = null,
    descripcion_detallada = null,
    modelo = null,
    marca = null,
    referencia = null,
    costo_anterior = null,
    costo_actual = null,
    utilidad_1 = null,
    precio_1 = null,
    utilidad_2 = null,
    precio_2 = null,
    utilidad_3 = null,
    precio_3 = null
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.sku = sku;
    this.stock = stock !== null ? Number(stock) || 0 : null;
    this.descripcion_detallada = descripcion_detallada;
    this.modelo = modelo;
    this.marca = marca;
    this.referencia = referencia;
    this.costo_anterior =
      costo_anterior !== null ? Number(costo_anterior) || 0 : null;
    this.costo_actual =
      costo_actual !== null ? Number(costo_actual) || 0 : null;
    this.utilidad_1 = utilidad_1 !== null ? Number(utilidad_1) || 0 : null;
    this.precio_1 = precio_1 !== null ? Number(precio_1) || 0 : null;
    this.utilidad_2 = utilidad_2 !== null ? Number(utilidad_2) || 0 : null;
    this.precio_2 = precio_2 !== null ? Number(precio_2) || 0 : null;
    this.utilidad_3 = utilidad_3 !== null ? Number(utilidad_3) || 0 : null;
    this.precio_3 = precio_3 !== null ? Number(precio_3) || 0 : null;
  }

  static fromDatabase(dbProduct) {
    return new Product(
      dbProduct.id,
      dbProduct.nombre,
      dbProduct.descripcion,
      dbProduct.sku,
      dbProduct.stock,
      dbProduct.descripcion_detallada,
      dbProduct.modelo,
      dbProduct.marca,
      dbProduct.referencia,
      dbProduct.costo_anterior,
      dbProduct.costo_actual,
      dbProduct.utilidad_1,
      dbProduct.precio_1,
      dbProduct.utilidad_2,
      dbProduct.precio_2,
      dbProduct.utilidad_3,
      dbProduct.precio_3
    );
  }

  toDatabase() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      sku: this.sku,
      stock: this.stock,
      descripcion_detallada: this.descripcion_detallada,
      modelo: this.modelo,
      marca: this.marca,
      referencia: this.referencia,
      costo_anterior: this.costo_anterior,
      costo_actual: this.costo_actual,
      utilidad_1: this.utilidad_1,
      precio_1: this.precio_1,
      utilidad_2: this.utilidad_2,
      precio_2: this.precio_2,
      utilidad_3: this.utilidad_3,
      precio_3: this.precio_3,
    };
  }
}
