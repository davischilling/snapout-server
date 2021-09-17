import { SignInAdminAccountService } from '@/domain/use-cases'
import { setupSignInAdminAccount } from '@/data/services'
import { makeMongoDbRepository, makeJwtToken } from '@/main/factories/infra'

export const makeSignInAdminAccount = async (): Promise<SignInAdminAccountService> => {
  return setupSignInAdminAccount(
    await makeMongoDbRepository('account'),
    makeJwtToken()
  )
}
