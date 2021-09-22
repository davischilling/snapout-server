import { FindMediaByIdAndUpdateService } from '@/domain/use-cases'
import { Repository as MediaDbRepo } from '@/data/contracts/repos'
import { Media } from '@/data/entities'

type setup = (
  mediaRepo: MediaDbRepo,
) => FindMediaByIdAndUpdateService

export const setupFindMediaByIdAndUpdate: setup = (mediaRepo) => async params => {
  const media: Media = await mediaRepo.findById(params.id)
  const updatedMedia = new Media({ ...media, ...params })
  return await mediaRepo.findByIdAndUpdate(params.id, updatedMedia)
}
