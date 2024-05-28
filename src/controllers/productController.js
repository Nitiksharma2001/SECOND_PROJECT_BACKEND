import ProductService from '../services/productService.js'

export default class ProductController {
  constructor(){
    this.productService = new ProductService()

    this.getAllProducts =  this.getAllProducts.bind(this)
    this.getProductFromId = this.getProductFromId.bind(this)
  }

  async getAllProducts (req, res) {
    const { status, message, data } = await this.productService.getAllProducts()
    return res.status(status).json({
      message,
      data,
    })
  }

  async getProductFromId (req, res) {
    const productId = req.params.productId
    const { status, message, data } = await this.productService.getProductFromId(
      productId
    )
    return res.status(status).json({
      message,
      data,
    })
  }
}
