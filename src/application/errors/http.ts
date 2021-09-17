export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failed. Try again soon.')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class ValidationError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends Error {
  constructor () {
    super('Access denied')
    this.name = 'ForbiddenError'
  }
}

export class NotFoundError extends Error {
  constructor () {
    super('Not found')
    this.name = 'NotFoundError'
  }
}

export class HttpException extends Error {
  status: number
  override message: string
  constructor (status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}
