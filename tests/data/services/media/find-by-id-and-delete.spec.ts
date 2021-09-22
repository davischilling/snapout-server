import { FindMediaByIdAndDeleteService } from '@/domain/use-cases/media'
import { Repository as MediaDbRepo } from '@/data/contracts/repos'
import { setupFindMediaByIdAndDelete } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/media')

describe('FindMediaByIdAndDeleteService', () => {
  let id: string
  let mediaAccountRepo: MockProxy<MediaDbRepo>
  let sut: FindMediaByIdAndDeleteService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    mediaAccountRepo = mock()
    mediaAccountRepo.findByIdAndDelete.mockResolvedValue(id)
  })

  beforeEach(() => {
    sut = setupFindMediaByIdAndDelete(mediaAccountRepo)
  })

  it('should call MediaAccountRepo.findByIdAndDelete with correct params', async () => {
    await sut({ id })

    expect(mediaAccountRepo.findByIdAndDelete).toHaveBeenCalledWith(id)
    expect(mediaAccountRepo.findByIdAndDelete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if MediaAccountRepo.findByIdAndDelete throws', async () => {
    mediaAccountRepo.findByIdAndDelete.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return the deleted media id on success', async () => {
    const mediaFindByIdResult = await sut({ id })

    expect(mediaFindByIdResult).toEqual({ id })
  })
})
