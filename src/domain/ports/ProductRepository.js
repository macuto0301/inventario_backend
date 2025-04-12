// This is an interface (port) that defines the methods that any product repository must implement
export class ProductRepository {
  async findAll(searchTerm) {
    throw new Error("Method not implemented")
  }

  async findById(id) {
    throw new Error("Method not implemented")
  }

  async create(product) {
    throw new Error("Method not implemented")
  }

  async update(id, product) {
    throw new Error("Method not implemented")
  }

  async delete(id) {
    throw new Error("Method not implemented")
  }

  async updateStock(id, stock) {
    throw new Error("Method not implemented")
  }

  async getTotalValue() {
    throw new Error("Method not implemented")
  }
}
