export class GetAllProductsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute(searchTerm) {
    return await this.productRepository.findAll(searchTerm)
  }
}
