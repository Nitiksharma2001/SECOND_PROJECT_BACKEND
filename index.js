import express from 'express'
import authRouter from './src/models/authRoutes.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import cors from 'cors'
import productRouter from './src/models/productRoutes.js'
import { authMiddleWare } from './src/middlewares/authMiddleware.js'
import cartRouter from './src/models/cartRoutes.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const connectToMONGO = async () => {
  try {
    
    await mongoose.connect(MONGO_URI)
    console.log('connected to MONGO Server', MONGO_URI)
    app.use('/auth', authRouter)
    app.use('/products', productRouter)
    app.use('/cart', authMiddleWare, cartRouter);
    app.listen(port || 4000, () => {
      console.log('Listening to PORT', port || 4000)
    })
  } catch (err) {
    console.log('unable to connect to MONGO Server', err)
  }
}
connectToMONGO()
