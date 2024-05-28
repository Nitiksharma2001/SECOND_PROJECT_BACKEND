import 'dotenv/config'
import express from 'express'
import authController from '../controllers/authController.js'


const authRouter = express.Router()

// get routes
authRouter.get('/', authController.loginUser)

// post routes
authRouter.post('/', authController.createNewUser)

export default authRouter
