import { CreateMediaController } from '@/main/controllers'
import { makeCreateMedia } from '@/main/factories/services'

export const makeCreateMediaController = async (): Promise<CreateMediaController> => {
  const createMediaService = await makeCreateMedia()
  return new CreateMediaController(createMediaService)
}
