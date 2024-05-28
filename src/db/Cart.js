import { userModel } from './models/userModel.js'

const getCart = async (userId) => {
  try {
    const result = await userModel.findById(userId).populate('cart').exec()
    if (!result) {
      return null
    }
    return result.cart
  } catch (err) {
    throw {
      message: err.message,
    }
  }
}
const addProductToCart = async (userId, productId) => {
  try {
    const result = await userModel.findByIdAndUpdate(
      userId,
      { $push: { cart: productId } },
      { new: true, runValidators: true }
    )
    return result
  } catch (err) {
    throw {
      message: err.message,
    }
  }
}

const deleteProductFromCart = async (userId, productId) => {
  try {
    const result = await userModel.findByIdAndUpdate(
      userId,
      { $pull: { cart: productId } },
      { new: true, runValidators: true }
    )
    return result
  } catch (err) {
    throw {
      message: err.message,
    }
  }
}

const checkProductExistInCart = async (userId, productId) => {
  try {
    const result = await userModel
      .findOne({ _id: userId, cart: { $in: [productId] } })
      .exec()
    return result
  } catch (err) {
    throw {
      message: err.message,
    }
  }
}
export default {
  getCart,
  addProductToCart,
  deleteProductFromCart,
  checkProductExistInCart,
}
