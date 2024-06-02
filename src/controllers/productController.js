import { controllerAsyncHandler } from '../helper/asyncHandler.js'
import ProductService from '../services/productService.js'
import { httpCodes } from '../utils/httpCodes.js'

export default class ProductController {
  constructor() {
    this.productService = new ProductService()
  }

  getAllProducts = controllerAsyncHandler(async (req, res) => {
    const { status, message, data } = await this.productService.getAllProducts()
    return res.status(status).json({
      message,
      data,
    })
  })

  getProductFromId = controllerAsyncHandler(async (req, res) => {
    const { productId } = req.params
    if (!productId) {
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ message, success, data: null })
    }
    const { status, message, data } =
      await this.productService.getProductFromId(productId)
      return res.status(status).json({
        message,
        data,
      })
  })
}
