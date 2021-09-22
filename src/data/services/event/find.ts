import { FindEventsService } from '@/domain/use-cases'
import { Repository as EventDbRepo } from '@/data/contracts/repos'

type setup = (
  eventRepo: EventDbRepo,
) => FindEventsService

export const setupFindEvents: setup = (eventRepo) => async (params) => {
  return await eventRepo.find(params)
}
