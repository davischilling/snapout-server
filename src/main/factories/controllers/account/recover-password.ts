import { RecoverAccountPasswordController } from '@/main/controllers'
import { makeRecoverAccountPassword } from '@/main/factories/services'

export const makeRecoverAccountPasswordController = async (): Promise<RecoverAccountPasswordController> => {
  return new RecoverAccountPasswordController(await makeRecoverAccountPassword())
}
