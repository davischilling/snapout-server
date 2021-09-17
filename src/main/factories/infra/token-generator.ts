import { JwtToken } from '@/infra/crypto'

export const makeJwtToken = (): JwtToken => {
  const secret = process.env.NODE_ENV === 'development' ? process.env.JWT_SECRET as string : 'secret'
  return new JwtToken(secret)
}
