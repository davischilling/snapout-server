import { FindMediaByIdAndDeleteService } from '@/domain/use-cases'
import { Repository as MediaDbRepo } from '@/data/contracts/repos'

type setup = (
  mediaRepo: MediaDbRepo,
) => FindMediaByIdAndDeleteService

export const setupFindMediaByIdAndDelete: setup = (mediaRepo) => async ({ id }) => {
  const deletedMediaId = await mediaRepo.findByIdAndDelete(id)
  return { id: deletedMediaId }
}
