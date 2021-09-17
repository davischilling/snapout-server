import { UpdateAccountPasswordController } from '@/main/controllers'
import { makeUpdateAccountPassword } from '@/main/factories/services'

export const makeUpdateAccountPasswordController = async (): Promise<UpdateAccountPasswordController> => {
  return new UpdateAccountPasswordController(await makeUpdateAccountPassword())
}
