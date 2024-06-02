import bcrypt from 'bcrypt'
import Auth from '../db/Auth.js'
import jwt from 'jsonwebtoken'

export default class AuthService {
  constructor(HASHING_SALT_ROUNDS) {
    this.Auth = new Auth()
    this.HASHING_SALT_ROUNDS = HASHING_SALT_ROUNDS
  }

  createNewUser = async (userDetails) => {
    try {
      const user = await this.Auth.findUserFromCred({
        email: userDetails.email,
      })
      if (user) {
        return { status: 400, message: 'User Already Existed', data: null }
      }
      const hashedPassword = await bcrypt.hash(
        userDetails.password,
        this.HASHING_SALT_ROUNDS
      )
      const newUser = await this.Auth.createNewUser({
        ...userDetails,
        password: hashedPassword,
      })
      return { status: 200, data: newUser, message: 'User Created' }
    } catch (err) {
      throw {
        status: 400,
        message: err.message,
        data: null,
      }
    }
  }
  loginUser = async (loginDetails) => {
    try {
      const user = await this.Auth.findUserFromCred({
        email: loginDetails.email,
      })
      if (!user) {
        return {
          status: 400,
          message: 'Invalid Email or Password',
          data: null,
        }
      }
      const result = await bcrypt.compare(loginDetails.password, user.password)
      if (!result) {
        return {
          status: 400,
          message: 'Invalid Email or Password',
          data: null,
        }
      }
      const { _id, name, email } = user
      const token = jwt.sign({ _id, name, email }, process.env.JWT_KEY)
      return {
        status: 200,
        message: 'Sucessfully Logged In',
        data: { _id, name, email, token },
      }
    } catch (err) {
      return {
        status: 400,
        message: err.message,
        data: null,
      }
    }
  }
}
