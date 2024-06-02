import bcrypt from 'bcrypt'
import Auth from '../db/Auth.js'
import jwt from 'jsonwebtoken'
import { asyncHandler } from '../helper/asyncHandler.js'
import { httpCodes } from '../utils/httpCodes.js'

export default class AuthService {
  constructor(HASHING_SALT_ROUNDS) {
    this.Auth = new Auth()
    this.HASHING_SALT_ROUNDS = HASHING_SALT_ROUNDS
  }

  createNewUser = asyncHandler(async (userDetails) => {
    const user = await this.Auth.findUserFromCred({
      email: userDetails.email,
    })
    if (user) {
      return {
        status: httpCodes.BAD_REQUEST,
        message: 'User Already Existed',
        data: null,
        success: false
      }
    }
    const hashedPassword = await bcrypt.hash(
      userDetails.password,
      this.HASHING_SALT_ROUNDS
    )
    const newUser = await this.Auth.createNewUser({
      ...userDetails,
      password: hashedPassword,
    })
    return { status: httpCodes.CREATED, data: newUser, message: 'User Created', success: true }
  })
  loginUser = asyncHandler(async (loginDetails) => {
    const user = await this.Auth.findUserFromCred({
      email: loginDetails.email,
    })
    if (!user) {
      return {
        status: httpCodes.UNAUTHORIZED,
        message: 'Invalid Email or Password',
        data: null,
        success: false
      }
    }
    const result = await bcrypt.compare(loginDetails.password, user.password)
    if (!result) {
      return {
        status: httpCodes.UNAUTHORIZED,
        message: 'Invalid Email or Password',
        data: null,
        success: false
      }
    }
    const { _id, name, email } = user
    const token = jwt.sign({ _id, name, email }, process.env.JWT_KEY)
    return {
      status: httpCodes.RESPONSE_OK,
      message: 'Sucessfully Logged In',
      data: { _id, name, email, token },
      success: true
    }
  })
}
