import { controllerAsyncHandler } from '../helper/asyncHandler.js'
import CartService from '../services/cartService.js'

export default class CartController {
  constructor() {
    this.cartService = new CartService()
  }
  getCart = controllerAsyncHandler(async (req, res) => {
    const { status, message, success, data } = await this.cartService.getCart(
      req.user._id
    )
    return res.status(status).json({
      message,
      data,
      success
    })
  })
  addProductToCart = controllerAsyncHandler(async (req, res) => {
    const { productId } = req.params
    const { status, message, success, data } = await this.cartService.addProductToCart(
      req.user._id,
      productId
    )
    return res.status(status).json({
      message,
      data,
      success
    })
  })
  deleteProductFromCart = controllerAsyncHandler(async (req, res) => {
    const { productId } = req.params
    const { status, message, success, data } =
      await this.cartService.deleteProductFromCart(req.user._id, productId)
      return res.status(status).json({
        message,
        data,
        success
      })
  })
}
