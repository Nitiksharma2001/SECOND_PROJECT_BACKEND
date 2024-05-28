import { userModel } from './models/userModel.js'

const Auth = {
  createNewUser: async (userDetails) => {
    try {
      const newUser = await userModel.create(userDetails)
      return newUser
    } catch (err) {
      throw {
        message: err.message,
      }
    }
  },
  findUserFromCred: async (credentials) => {
    try {
      const user = await userModel.findOne(credentials).exec()
      return user
    } catch (err) {
      throw {
        message: err.message,
      }
    }
  },
}

export default Auth
