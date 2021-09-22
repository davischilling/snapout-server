import { FindEventByIdAndDeleteService } from '@/domain/use-cases'
import { Repository as EventDbRepo } from '@/data/contracts/repos'

type setup = (
  eventRepo: EventDbRepo,
) => FindEventByIdAndDeleteService

export const setupFindEventByIdAndDelete: setup = (eventRepo) => async ({ id }) => {
  const deletedEventId = await eventRepo.findByIdAndDelete(id)
  return { id: deletedEventId }
}
