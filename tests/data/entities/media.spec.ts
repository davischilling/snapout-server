import { Media } from '@/data/entities'
import { MediaData } from '@/domain/models'

describe('Media', () => {
    let mediaData: MediaData
    let sut: Media

    beforeEach(() => {
        mediaData = {
          youtubeUrlId: 'any_youtubeUrlId',
          videoTitle: 'any_videoTitle'
        }
    })

    it('should fill the attrs on the constructor with correct params', () => {
        sut = new Media(mediaData)

        expect(sut).toEqual(mediaData)
    })

    it('should update an media correctly', () => {
      sut = new Media(mediaData)
      sut.id = 'any_media_id'

      const updatedMedia = new Media({ ...sut, ...{ videoTitle: 'new_videoTitle' }})

      expect(updatedMedia).toEqual({
        id: 'any_media_id',
        youtubeUrlId: 'any_youtubeUrlId',
        videoTitle: 'new_videoTitle'
      })
  })
})
