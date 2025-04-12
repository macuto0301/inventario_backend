export class DeleteProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute(id) {
    // Check if product exists
    const existingProduct = await this.productRepository.findById(id)

    if (!existingProduct) {
      throw new Error("Product not found")
    }

    // Delete the product from the repository
    const result = await this.productRepository.delete(id)

    if (!result) {
      throw new Error("Failed to delete product")
    }

    return result
  }
}
