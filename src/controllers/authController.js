import authService from '../services/authService.js'

const createNewUser = async (req, res) => {
  const userDetails = req.body
  if (!userDetails.name || !userDetails.email || !userDetails.password) {
    return res.status(400).json({ message: 'incomplete details', data: null })
  }
  const { status, message, data } = await authService.createNewUser(userDetails)
  return res.status(status).json({
    message,
    data,
  })
}
const loginUser = async (req, res) => {
  const loginDetails = {
    email: req.query.email,
    password: req.query.password,
  }
  if (!loginDetails.email || !loginDetails.password) {
    return res.status(400).json({ status: 200 })
  }
  const { status, message, data } = await authService.loginUser(loginDetails)
  return res.status(status).json({
    message,
    data,
  })
}

export default { createNewUser, loginUser }
