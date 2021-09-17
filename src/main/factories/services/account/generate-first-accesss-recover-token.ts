import { GenerateFirstAccessRecoverTokenService } from '@/domain/use-cases'
import { setupGenerateFirstAccessRecoverToken } from '@/data/services'
import { makeMongoDbRepository, makeJwtToken } from '@/main/factories/infra'

export const makeGenerateFirstAccessRecoverToken = async (): Promise<GenerateFirstAccessRecoverTokenService> => {
  return setupGenerateFirstAccessRecoverToken(
    await makeMongoDbRepository('account'),
    makeJwtToken()
  )
}
