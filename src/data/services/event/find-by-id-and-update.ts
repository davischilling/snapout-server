import { FindEventByIdAndUpdateService } from '@/domain/use-cases'
import { Repository as EventDbRepo } from '@/data/contracts/repos'
import { Event } from '@/data/entities'

type setup = (
  eventRepo: EventDbRepo,
) => FindEventByIdAndUpdateService

export const setupFindEventByIdAndUpdate: setup = (eventRepo) => async params => {
  const event: Event = await eventRepo.findById(params.id)
  const updatedEvent = new Event({ ...event, ...params })
  return await eventRepo.findByIdAndUpdate(params.id, updatedEvent)
}
