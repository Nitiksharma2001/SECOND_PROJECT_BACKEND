import 'dotenv/config'
import express from 'express'
import CartController from '../controllers/cartController.js'

const cartRouter = express.Router()

const cartController = new CartController()

// get routes
cartRouter.get('/', cartController.getCart)

// put routes
cartRouter.put('/:productId', cartController.addProductToCart)

// delete routes
cartRouter.delete('/:productId', cartController.deleteProductFromCart)

export default cartRouter
