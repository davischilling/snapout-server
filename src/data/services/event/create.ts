import { Repository as EventDbRepo } from '@/data/contracts/repos'
import { Event } from '@/data/entities'
import { CreateEventService } from '@/domain/use-cases'

type setup = (
  eventRepo: EventDbRepo,
) => CreateEventService

export const setupCreateEvent: setup = (eventRepo) => async (params) => {
  const newEvent = new Event(params)
  const id = await eventRepo.create(newEvent)
  return { id }
}
