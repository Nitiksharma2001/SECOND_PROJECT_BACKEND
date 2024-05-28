import 'dotenv/config'
import express from 'express'
import ProductController from '../controllers/productController.js'

const productRouter = express.Router()

const productController = new ProductController()

// get routes
productRouter.get('/', productController.getAllProducts)
productRouter.get('/:productId', productController.getProductFromId)

// post routes

export default productRouter
