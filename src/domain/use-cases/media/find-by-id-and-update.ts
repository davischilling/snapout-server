import { MediaData } from '@/domain/models'

export type FindMediaByIdAndUpdateService = (params: FindMediaByIdAndUpdate.Input) => Promise<FindMediaByIdAndUpdate.Output>

export namespace FindMediaByIdAndUpdate {
  export type Input = {
    id: string
    youtubeUrlId: string
    videoTitle: string
  }
  export type Output = { media: MediaData } | Error
}
