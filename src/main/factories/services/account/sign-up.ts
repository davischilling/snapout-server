import { SignUpService } from '@/domain/use-cases'
import { setupSignUp } from '@/data/services'
import { makeMongoDbRepository, makeCryto, makeJwtToken } from '@/main/factories/infra'

export const makeSignUpService = async (): Promise<SignUpService> => {
  return setupSignUp(
    await makeMongoDbRepository('account'),
    makeCryto(),
    makeJwtToken()
  )
}
