import { httpCodes } from "../utils/httpCodes.js";

export const asyncHandler = (func) => async (...args) => {
  try {
    return await func(...args);
  } catch (err) {
    console.error(err.message)
    return {
      message: err.message,
      status: httpCodes.INTERNAL_SERVER_ERROR,
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
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
      success: false,
      data: null
    } )
  }

}