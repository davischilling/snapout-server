import { UpdateAccountPasswordService } from '@/domain/use-cases'
import { setupUpdateAccountPassword } from '@/data/services'
import { makeMongoDbRepository, makeCryto } from '@/main/factories/infra'

export const makeUpdateAccountPassword = async (): Promise<UpdateAccountPasswordService> => {
  return setupUpdateAccountPassword(await makeMongoDbRepository('account'), makeCryto())
}
