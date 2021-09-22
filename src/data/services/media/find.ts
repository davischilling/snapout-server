import { FindMediasService } from '@/domain/use-cases'
import { Repository as MediaDbRepo } from '@/data/contracts/repos'

type setup = (
  mediaRepo: MediaDbRepo,
) => FindMediasService

export const setupFindMedias: setup = (mediaRepo) => async (params) => {
  return await mediaRepo.find(params)
}
