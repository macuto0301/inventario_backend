export class UpdateProductStockUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute(id, stock) {
    // Check if product exists
    const existingProduct = await this.productRepository.findById(id)

    if (!existingProduct) {
      throw new Error("Product not found")
    }

    if (stock < 0) {
      throw new Error("Stock cannot be negative")
    }

    // Update the product stock in the repository
    const result = await this.productRepository.updateStock(id, stock)

    if (!result) {
      throw new Error("Failed to update product stock")
    }

    return result
  }
}
