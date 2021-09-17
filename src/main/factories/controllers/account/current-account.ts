import { CurrentAccountController } from '@/main/controllers'
import { makeCurrentAccountService } from '@/main/factories/services'

export const makeCurrentAccountController = async (): Promise<CurrentAccountController> => {
  return new CurrentAccountController(await makeCurrentAccountService())
}
