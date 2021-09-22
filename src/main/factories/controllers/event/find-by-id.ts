import { FindEventByIdController } from '@/main/controllers'
import { makeFindEventById } from '@/main/factories/services'

export const makeFindEventByIdController = async (): Promise<FindEventByIdController> => {
  const findEventByIdService = await makeFindEventById()
  return new FindEventByIdController(findEventByIdService)
}
