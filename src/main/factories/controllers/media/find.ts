import { FindMediasController } from '@/main/controllers'
import { makeFindMedias } from '@/main/factories/services'

export const makeFindMediasController = async (): Promise<FindMediasController> => {
  const findMediasService = await makeFindMedias()
  return new FindMediasController(findMediasService)
}
