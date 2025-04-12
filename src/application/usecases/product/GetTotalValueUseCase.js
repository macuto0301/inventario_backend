export class GetTotalValueUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute() {
    return await this.productRepository.getTotalValue()
  }
}
