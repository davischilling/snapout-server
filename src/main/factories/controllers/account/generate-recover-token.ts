import { GenerateRecoverTokenController } from '@/main/controllers'
import { makeGenerateRecoverToken } from '@/main/factories/services'

export const makeGenerateRecoverTokenController = async (): Promise<GenerateRecoverTokenController> => {
  return new GenerateRecoverTokenController(await makeGenerateRecoverToken())
}
