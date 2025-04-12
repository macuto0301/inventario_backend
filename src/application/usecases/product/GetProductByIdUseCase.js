export class GetProductByIdUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute(id) {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new Error("Product not found")
    }

    return product
  }
}
