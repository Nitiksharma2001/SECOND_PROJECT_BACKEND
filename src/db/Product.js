import { productModel } from './models/productModel.js'

export default class Product {
  getAllProducts = async () => {
    try {
      return await productModel.find()
    } catch (err) {
      throw {
        message: err.message,
      }
    }
  }
  getProductFromId = async (id) => {
    try {
      return await productModel.findById(id)
    } catch (err) {
      throw {
        message: err.message,
      }
    }
  }

}
