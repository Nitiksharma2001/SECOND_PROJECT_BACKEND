import Cart from '../db/Cart.js'
import { asyncHandler } from '../helper/asyncHandler.js'
import { httpCodes } from '../utils/httpCodes.js'

export default class CartService {
  constructor() {
    this.Cart = new Cart()
  }
  getCart = asyncHandler(async (userId) => {
    const result = await this.Cart.getCart(userId)
    return { status: httpCodes.ACCEPTED, data: result, message: `All Product Fetched` }
  })

  addProductToCart = asyncHandler(async (userId, productId) => {
    const checkProductExist = await this.Cart.checkProductExistInCart(
      userId,
      productId
    )
    if (checkProductExist) {
      return {
        status: httpCodes.NO_CONTENT,
        message: 'Product Already Existed',
        data: checkProductExist,
      }
    }
    const result = await this.Cart.addProductToCart(userId, productId)
    return {
      status: httpCodes.CREATED,
      data: result,
      message: `Product Put in Cart with Id ${productId}`,
    }
  })

  deleteProductFromCart = asyncHandler(async (userId, productId) => {
    if (!checkProductExist) {
      return {
        status: httpCodes.NO_CONTENT,
        message: 'Product Not Existed',
        data: null,
      }
    }
    const result = await this.Cart.deleteProductFromCart(userId, productId)
    return {
      status: httpCodes.NO_CONTENT,
      data: result,
      message: `Product Deleted with Id ${productId}`,
    }
  })
}
