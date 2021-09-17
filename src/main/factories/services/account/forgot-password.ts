import { ForgotAccountPasswordService } from '@/domain/use-cases'
import { setupForgotAccountPassword } from '@/data/services'
import { makeMongoDbRepository, makeJwtToken } from '@/main/factories/infra'

export const makeForgotAccountPassword = async (): Promise<ForgotAccountPasswordService> => {
  return setupForgotAccountPassword(await makeMongoDbRepository('account'), makeJwtToken())
}
