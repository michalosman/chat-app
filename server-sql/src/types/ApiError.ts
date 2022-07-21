class ApiError {
  code: number

  message: string

  constructor(code: number, message: string) {
    this.code = code
    this.message = message
  }

  static badRequest(message: string) {
    return new ApiError(400, message)
  }

  static unauthorized(message: string) {
    return new ApiError(401, message)
  }

  static forbidden(message: string) {
    return new ApiError(403, message)
  }

  static notFound(message: string) {
    return new ApiError(404, message)
  }

  static methodNotAllowed(message: string) {
    return new ApiError(405, message)
  }

  static internal(message: string) {
    return new ApiError(500, message)
  }
}

export default ApiError
