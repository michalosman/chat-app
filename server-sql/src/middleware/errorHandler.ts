/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'

import ApiError from '../types/ApiError'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError)
    return res.status(err.code).json({ code: err.code, error: err.message })

  // eslint-disable-next-line no-console
  console.log(err.message)
  return res.status(500).json({ code: 500, error: 'Something went wrong' })
}

export default errorHandler
