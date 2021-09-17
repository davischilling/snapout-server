import { RecoverAccountPasswordService } from '@/domain/use-cases'
import { setupRecoverAccountPassword } from '@/data/services'
import { makeMongoDbRepository, makeJwtToken, makeCryto } from '@/main/factories/infra'

export const makeRecoverAccountPassword = async (): Promise<RecoverAccountPasswordService> => {
  return setupRecoverAccountPassword(
    await makeMongoDbRepository('account'),
    makeCryto(),
    makeJwtToken()
  )
}
