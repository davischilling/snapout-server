import { FindMediaByIdService } from '@/domain/use-cases'
import { Repository as MediaDbRepo } from '@/data/contracts/repos'

type setup = (
  mediaRepo: MediaDbRepo,
) => FindMediaByIdService

export const setupFindMediaById: setup = (mediaRepo) => async ({ id }) => {
  return await mediaRepo.findById(id)
}
