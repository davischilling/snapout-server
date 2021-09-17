import { CreateAdminAccountService } from '@/domain/use-cases'
import { setupCreateAdminAccount } from '@/data/services'
import { makeMongoDbRepository, makeJwtToken } from '@/main/factories/infra'

export const makeCreateAdminAccount = async (): Promise<CreateAdminAccountService> => {
  return setupCreateAdminAccount(
    await makeMongoDbRepository('account'),
    makeJwtToken()
  )
}
