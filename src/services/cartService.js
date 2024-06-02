import Cart from '../db/Cart.js'

export default class CartService {
  constructor() {
    this.Cart = new Cart()
  }
  getCart = async (userId) => {
    try {
      const result = await this.Cart.getCart(userId)
      return { status: 200, data: result, message: `All Product Fetched` }
    } catch (err) {
      throw {
        status: 400,
        message: err.message,
        data: null,
      }
    }
  }

  addProductToCart = async (userId, productId) => {
    try {
      const checkProductExist = await this.Cart.checkProductExistInCart(
        userId,
        productId
      )
      if (checkProductExist) {
        return {
          status: 200,
          message: 'Product Already Existed',
          data: checkProductExist,
        }
      }
      const result = await this.Cart.addProductToCart(userId, productId)
      return {
        status: 200,
        data: result,
        message: `Product Put in Cart with Id ${productId}`,
      }
    } catch (err) {
      throw {
        status: 400,
        message: err.message,
        data: null,
      }
    }
  }

  deleteProductFromCart = async (userId, productId) => {
    try {
      const checkProductExist = await this.Cart.checkProductExistInCart(
        userId,
        productId
      )
      if (!checkProductExist) {
        return {
          status: 401,
          message: 'Product Not Existed',
          data: null,
        }
      }
      const result = await this.Cart.deleteProductFromCart(userId, productId)
      return {
        status: 200,
        data: result,
        message: `Product Deleted with Id ${productId}`,
      }
    } catch (err) {
      throw {
        status: 400,
        message: err.message,
        data: null,
      }
    }
  }
}
