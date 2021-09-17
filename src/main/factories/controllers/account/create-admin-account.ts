import { CreateAdminAccountController } from '@/main/controllers'
import { makeCreateAdminAccount } from '@/main/factories/services'

export const makeCreateAdminAccountController = async (): Promise<CreateAdminAccountController> => {
  return new CreateAdminAccountController(await makeCreateAdminAccount())
}
