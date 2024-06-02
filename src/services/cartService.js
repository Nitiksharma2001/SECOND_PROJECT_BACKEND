import Cart from '../db/Cart.js'
import { asyncHandler } from '../helper/asyncHandler.js'
import { httpCodes } from '../utils/httpCodes.js'

export default class CartService {
  constructor() {
    this.Cart = new Cart()
  }
  getCart = asyncHandler(async (userId) => {
    const result = await this.Cart.getCart(userId)
    return {
      status: httpCodes.RESPONSE_OK,
      data: result,
      message: `All Product Fetched`,
      success: true,
    }
  })

  addProductToCart = asyncHandler(async (userId, productId) => {
    const checkProductExist = await this.Cart.checkProductExistInCart(
      userId,
      productId
    )
    if (checkProductExist) {
      return {
        status: httpCodes.BAD_REQUEST,
        message: 'Product Already Existed',
        data: checkProductExist,
        success: false
      }
    }
    const result = await this.Cart.addProductToCart(userId, productId)
    return {
      status: httpCodes.RESPONSE_OK,
      data: result,
      message: `Product Put in Cart with Id ${productId}`,
      success: true,
    }
  })

  deleteProductFromCart = asyncHandler(async (userId, productId) => {
    const checkProductExist = await this.Cart.checkProductExistInCart(
      userId,
      productId
    )
    if (!checkProductExist) {
      return {
        status: httpCodes.BAD_REQUEST,
        message: 'Product Not Existed',
        data: null,
        success: false
      }
    }
    const result = await this.Cart.deleteProductFromCart(userId, productId)
    return {
      status: httpCodes.RESPONSE_OK,
      data: result,
      message: `Product Deleted with Id ${productId}`,
      success: true
    }
  })
}
