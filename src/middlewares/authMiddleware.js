import jwt from 'jsonwebtoken'
import Auth from '../db/Auth.js'

export const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7)
    if (!token) {
      return res.status(401).json({ message: 'UnAuthorized User', data: null })
    }
    const user = jwt.verify(token, process.env.JWT_KEY)
    if (!user._id) {
      return res.status(401).json({ message: 'UnAuthorized User', data: null })
    }
    const checkUser = await Auth.findUserFromCred({
      _id: user._id,
    })
    if (!checkUser) {
      return res.status(401).json({ message: 'UnAuthorized User', data: null })
    }
    req.user = user
    next()
  } catch (err) {
    return res.json({ message: err.message })
  }
}
