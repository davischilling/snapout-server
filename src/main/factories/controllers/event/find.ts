import { FindEventsController } from '@/main/controllers'
import { makeFindEvents } from '@/main/factories/services'

export const makeFindEventsController = async (): Promise<FindEventsController> => {
  const findEventsService = await makeFindEvents()
  return new FindEventsController(findEventsService)
}
