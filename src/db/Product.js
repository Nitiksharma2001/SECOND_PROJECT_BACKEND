import { productModel } from './models/productModel.js'

const getAllProducts = async () => {
  try {
    return await productModel.find()
  } catch (err) {
    throw {
      message: err.message,
    }
  }
}
const getProductFromId = async (id) => {
  try {
    return await productModel.findById(id)
  } catch (err) {
    throw {
      message: err.message,
    }
  }
}
export default { getAllProducts, getProductFromId }
