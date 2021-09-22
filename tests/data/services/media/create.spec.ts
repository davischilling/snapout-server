import { Repository as MediaDbRepo } from '@/data/contracts/repos'
import { Media } from '@/data/entities'
import { setupCreateMedia } from '@/data/services'
import { CreateMedia, CreateMediaService } from '@/domain/use-cases'
import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'

jest.mock('@/data/entities/media')

describe('CreateMediaService', () => {
    let mediaAccountRepo: MockProxy<MediaDbRepo>
    const createMediaInput: CreateMedia.MediaInputs = {
      youtubeUrlId: 'any_youtubeUrlId',
      videoTitle: 'any_videoTitle'
    }
    let sut: CreateMediaService

    beforeAll(() => {
        mediaAccountRepo = mock()
        mediaAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
        mediaAccountRepo.create.mockResolvedValue('media_id')
    })

    beforeEach(() => {
        sut = setupCreateMedia(mediaAccountRepo)
    })


    it('should call MediaRepo.create with Media entity', async () => {
        const MediaStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
        mocked(Media).mockImplementation(MediaStub)

        await sut(createMediaInput)

        expect(mediaAccountRepo.create).toHaveBeenCalledWith({ any: 'any' })
        expect(mediaAccountRepo.create).toHaveBeenCalledTimes(1)
    })

    it('should return an id on success', async () => {
        const mediaCreateResult = await sut(createMediaInput)

        expect(mediaCreateResult).toEqual({ id: 'media_id' })
    })

    it('should rethrow if MediaAccountRepo.create throws', async () => {
        mediaAccountRepo.create.mockRejectedValueOnce(new Error('repo_error'))

        const promise = sut(createMediaInput)

        await expect(promise).rejects.toThrow(new Error('repo_error'))
    })
})
