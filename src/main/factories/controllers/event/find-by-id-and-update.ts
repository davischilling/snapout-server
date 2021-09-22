import { FindEventByIdAndUpdateController } from '@/main/controllers'
import { makeFindEventByIdAndUpdate } from '@/main/factories/services'

export const makeFindEventByIdAndUpdateController = async (): Promise<FindEventByIdAndUpdateController> => {
  const findEventByIdAndUpdateService = await makeFindEventByIdAndUpdate()
  return new FindEventByIdAndUpdateController(findEventByIdAndUpdateService)
}
