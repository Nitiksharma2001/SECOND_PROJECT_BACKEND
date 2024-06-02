import 'dotenv/config'
import express from 'express'
import AuthController from '../controllers/authController.js'

const authRouter = express.Router()
const authController = new AuthController()

// get routes
authRouter.get('/', authController.loginUser)

// post routes
authRouter.post('/', authController.createNewUser)

export default authRouter
