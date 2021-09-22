import { MediaData } from '@/domain/models'

export class Media {
  id?: string
  youtubeUrlId: string
  videoTitle: string

  constructor (
    mediaData: MediaData
  ) {
    const {
      id,
      youtubeUrlId,
      videoTitle
    } = mediaData
    if (id !== undefined) {
      this.id = id
    }
    this.youtubeUrlId = youtubeUrlId
    this.videoTitle = videoTitle
  }
}
