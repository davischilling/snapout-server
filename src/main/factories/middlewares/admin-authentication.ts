import { AdminAuthenticationMiddleware } from '@/application/middlewares'
import { makeCryto } from '@/main/factories/infra'

export const makeAdminAuthenticationMiddleware = (): AdminAuthenticationMiddleware => {
  return new AdminAuthenticationMiddleware(makeCryto())
}
