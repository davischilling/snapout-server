import { FindEventByIdService } from '@/domain/use-cases'
import { Repository as EventDbRepo } from '@/data/contracts/repos'

type setup = (
  eventRepo: EventDbRepo,
) => FindEventByIdService

export const setupFindEventById: setup = (eventRepo) => async ({ id }) => {
  return await eventRepo.findById(id)
}
