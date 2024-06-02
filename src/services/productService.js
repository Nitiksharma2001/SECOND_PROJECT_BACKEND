import Product from '../db/Product.js'
import { asyncHandler } from '../helper/asyncHandler.js'
import { httpCodes } from '../utils/httpCodes.js'

export default class ProductService {
  constructor() {
    this.Product = new Product()
  }
  getAllProducts = asyncHandler(async () => {
    const result = await this.Product.getAllProducts()
    return { status: httpCodes.ACCEPTED, data: result, message: `All Product Fetched` }
  })

  getProductFromId = asyncHandler(async (productId) => {
    const result = await this.Product.getProductFromId(productId)
    return {
      status: httpCodes.ACCEPTED,
      data: result,
      message: `Product Fetched with Id ${productId}`,
    }
  })
}
