import { SignInAdminAccountController } from '@/main/controllers'
import { makeSignInAdminAccount } from '@/main/factories/services'

export const makeSignInAdminAccountController = async (): Promise<SignInAdminAccountController> => {
  return new SignInAdminAccountController(await makeSignInAdminAccount())
}
