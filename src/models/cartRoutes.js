import 'dotenv/config'
import express from 'express'
import cartController from '../controllers/cartController.js'

const cartRouter = express.Router()

// get routes
cartRouter.get('/', cartController.getCart)

// put routes
cartRouter.put('/:productId', cartController.addProductToCart)

// delete routes
cartRouter.delete('/:productId', cartController.deleteProductFromCart)


export default cartRouter
