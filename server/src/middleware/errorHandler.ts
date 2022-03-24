import ApiError from '../types/ApiError'
import { Request, Response, NextFunction } from 'express'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError)
    return res.status(err.code).json({ code: err.code, error: err.message })

  console.log(err.message)
  return res.status(500).json({ code: 500, error: 'Something went wrong' })
}

export default errorHandler
