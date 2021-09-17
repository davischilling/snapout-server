import { CurrentAccountService } from '@/domain/use-cases'
import { setupCurrentAccount } from '@/data/services'
import { makeMongoDbRepository } from '@/main/factories/infra'

export const makeCurrentAccountService = async (): Promise<CurrentAccountService> => {
  return setupCurrentAccount(
    await makeMongoDbRepository('account')
  )
}
