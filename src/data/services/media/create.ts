import { Repository as MediaDbRepo } from '@/data/contracts/repos'
import { Media } from '@/data/entities'
import { CreateMediaService } from '@/domain/use-cases'

type setup = (
  mediaRepo: MediaDbRepo,
) => CreateMediaService

export const setupCreateMedia: setup = (mediaRepo) => async (params) => {
  const newMedia = new Media(params)
  const id = await mediaRepo.create(newMedia)
  return { id }
}
