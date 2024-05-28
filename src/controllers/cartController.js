import cartService from '../services/cartService.js'

const getCart = async (req, res) => {
  const { status, message, data } = await cartService.getCart(req.user._id)
  return res.status(status).json({
    message,
    data,
  })
}
const addProductToCart = async (req, res) => {
  const { productId } = req.params
  const { status, message, data } = await cartService.addProductToCart(
    req.user._id,
    productId
  )
  return res.status(status).json({
    message,
    data,
  })
}
const deleteProductFromCart = async (req, res) => {
  const { productId } = req.params
  const { status, message, data } = await cartService.deleteProductFromCart(
    req.user._id,
    productId
  )
  return res.status(status).json({
    message,
    data,
  })
}
export default { getCart, addProductToCart, deleteProductFromCart }
