import { setupGenerateRecoverToken } from '@/data/services'
import { GenerateRecoverTokenService } from '@/domain/use-cases'
import { makeJwtToken, makeMongoDbRepository } from '@/main/factories/infra'

export const makeGenerateRecoverToken = async (): Promise<GenerateRecoverTokenService> => {
  return setupGenerateRecoverToken(
    await makeMongoDbRepository('account'),
    makeJwtToken()
  )
}
