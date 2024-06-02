export const asyncHandler = (func) => async (...args) => {
  try {
    return await func(...args);
  } catch (err) {
    console.error(err.message)
    return {
      message: err.message,
      status: 401,
      success: false,
      data: null
    } 
  }
};

export const controllerAsyncHandler = func => async (req, res, next) => {
  try{
    return await func(req, res, next)
  }
  catch (err) { 
    console.error(err.message)
    return res.status(402).json({
      message: err.message,
      success: false,
      data: null
    } )
  }

}