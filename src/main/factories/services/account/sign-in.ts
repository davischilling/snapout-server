import { SignInService } from '@/domain/use-cases'
import { setupSignIn } from '@/data/services'
import { makeMongoDbRepository, makeCryto, makeJwtToken } from '@/main/factories/infra'

export const makeSignInService = async (): Promise<SignInService> => {
  return setupSignIn(
    await makeMongoDbRepository('account'),
    makeCryto(),
    makeJwtToken()
  )
}
