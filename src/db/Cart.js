import { userModel } from './models/userModel.js'

export default class Cart {
  getCart = async (userId) => {
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
  addProductToCart = async (userId, productId) => {
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
  
  deleteProductFromCart = async (userId, productId) => {
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
  
  checkProductExistInCart = async (userId, productId) => {
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
}