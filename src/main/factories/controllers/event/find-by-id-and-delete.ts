import { FindEventByIdAndDeleteController } from '@/main/controllers'
import { makeFindEventByIdAndDelete } from '@/main/factories/services'

export const makeFindEventByIdAndDeleteController = async (): Promise<FindEventByIdAndDeleteController> => {
  const findEventByIdAndDeleteService = await makeFindEventByIdAndDelete()
  return new FindEventByIdAndDeleteController(findEventByIdAndDeleteService)
}
