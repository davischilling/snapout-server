import { ForgotAccountPasswordController } from '@/main/controllers'
import { makeForgotAccountPassword } from '@/main/factories/services'

export const makeForgotAccountPasswordController = async (): Promise<ForgotAccountPasswordController> => {
  return new ForgotAccountPasswordController(await makeForgotAccountPassword())
}
