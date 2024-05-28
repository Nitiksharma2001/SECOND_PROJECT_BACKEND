import Cart from '../db/Cart.js'

const getCart = async (userId) => {
  try {
    const result = await Cart.getCart(userId)
    return { status: 200, data: result, message: `All Product Fetched` }
  } catch (err) {
    throw {
      status: 400,
      message: err.message,
      data: null,
    }
  }
}

const addProductToCart = async (userId, productId) => {
  try {
    const checkProductExist = await Cart.checkProductExistInCart(
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
    const result = await Cart.addProductToCart(userId, productId)
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

const deleteProductFromCart = async (userId, productId) => {
  try {
    const checkProductExist = await Cart.checkProductExistInCart(
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
    const result = await Cart.deleteProductFromCart(userId, productId)
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

export default { getCart, addProductToCart, deleteProductFromCart }
