import Product from '../db/Product.js'
import { asyncHandler } from '../helper/asyncHandler.js'

export default class ProductService {
  constructor() {
    this.Product = new Product()
  }
  getAllProducts = asyncHandler(async () => {
    const result = await this.Product.getAllProducts()
    return { status: 200, data: result, message: `All Product Fetched` }
  })

  getProductFromId = asyncHandler(async (productId) => {
    const result = await this.Product.getProductFromId(productId)
    return {
      status: 200,
      data: result,
      message: `Product Fetched with Id ${productId}`,
    }
  })
}
