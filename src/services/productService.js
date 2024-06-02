import Product from '../db/Product.js'

export default class ProductService {
  constructor(){
    this.Product = new Product()
  }
  getAllProducts = async () => {
    try {
      const result = await this.Product.getAllProducts()
      return { status: 200, data: result, message: `All Product Fetched` }
    } catch (err) {
      throw {
        status: 400,
        message: err.message,
        data: null,
      }
    }
  }

  getProductFromId = async (productId) => {
    try {
      const result = await this.Product.getProductFromId(productId)
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
