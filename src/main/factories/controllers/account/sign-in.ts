import { SignInController } from '@/main/controllers'
import { makeSignInService } from '@/main/factories/services'

export const makeSignInController = async (): Promise<SignInController> => {
  return new SignInController(await makeSignInService())
}
