import { GenerateFirstAccessRecoverTokenController } from '@/main/controllers'
import { makeGenerateFirstAccessRecoverToken } from '@/main/factories/services'

export const makeGenerateFirstAccessRecoverTokenController = async (): Promise<GenerateFirstAccessRecoverTokenController> => {
  return new GenerateFirstAccessRecoverTokenController(await makeGenerateFirstAccessRecoverToken())
}
