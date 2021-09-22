import { CreateEventController } from '@/main/controllers'
import { makeCreateEvent } from '@/main/factories/services'

export const makeCreateEventController = async (): Promise<CreateEventController> => {
  const createEventService = await makeCreateEvent()
  return new CreateEventController(createEventService)
}
