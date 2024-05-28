export const jsonReturn = (res, status, message, data = null) => {
  return res.status(status).json(message, data)
}
