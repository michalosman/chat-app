import ApiError from './ApiError.js'

const errorHandler = (err, req, res) => {
  if (err instanceof ApiError)
    return res.status(err.code).json({ code: err.code, error: err.message })

  return res.status(500).json({ code: err.code, error: 'Something went wrong' })
}

export default errorHandler
