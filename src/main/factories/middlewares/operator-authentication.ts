import { AccessTokenTypes } from '@/main/types'
import { OperatorAuthenticationMiddleware } from '@/application/middlewares'
import { makeMongoDbRepository, makeJwtToken } from '@/main/factories/infra'

export const makeOperatorAuthenticationMiddleware = async (role: string[], type: AccessTokenTypes): Promise<OperatorAuthenticationMiddleware> => {
  return new OperatorAuthenticationMiddleware(
    makeJwtToken().validate.bind(makeJwtToken()),
    await makeMongoDbRepository('account'),
    role,
    type
  )
}
