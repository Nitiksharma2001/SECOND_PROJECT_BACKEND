import Product from '../db/Product.js'

export default class ProductService {

  async getAllProducts(){
    try {
      const result = await Product.getAllProducts()
      return { status: 200, data: result, message: `All Product Fetched` }
    } catch (err) {
      throw {
        status: 400,
        message: err.message,
        data: null,
      }
    }
  }

  async getProductFromId (productId){
    try {
      const result = await Product.getProductFromId(productId)
      return {
        status: 200,
        data: result,
        message: `Product Fetched with Id ${productId}`,
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


