import { SignUpController } from '@/main/controllers'
import { makeSignUpService } from '@/main/factories/services'

export const makeSignUpController = async (): Promise<SignUpController> => {
  return new SignUpController(await makeSignUpService())
}
