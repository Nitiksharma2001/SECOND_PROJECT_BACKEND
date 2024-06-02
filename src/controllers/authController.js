import { controllerAsyncHandler } from '../helper/asyncHandler.js'
import AuthService from '../services/authService.js'
import { httpCodes } from '../utils/httpCodes.js'
export default class AuthController {
  constructor() {
    this.authService = new AuthService(6)
  }
  createNewUser = controllerAsyncHandler(async (req, res) => {
    const userDetails = req.body
    if (!userDetails.name || !userDetails.email || !userDetails.password) {
      return res.status(httpCodes.BAD_REQUEST).json({ message: 'incomplete details', data: null })
    }
    const { status, message, success, data } = await this.authService.createNewUser( userDetails )
    console.log(status, message, success, data)
    return res.status(status).json({
      message,
      data,
      success
    })
  })
  
  loginUser = controllerAsyncHandler(async (req, res) => {
    const loginDetails = {
      email: req.query.email,
      password: req.query.password,
    }
    if (!loginDetails.email || !loginDetails.password) {
      return res.status(httpCodes.BAD_REQUEST).json({ message: 'incomplete details', data: null })
    }
    const { status, message, success, data } = await this.authService.loginUser(
      loginDetails
    )
    return res.status(status).json({
      message,
      data,
      success
    })
  })
}
