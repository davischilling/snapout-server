import { MediaData } from '@/domain/models'

export type FindMediasService = (params: FindMedias.Input) => Promise<FindMedias.Output>

export namespace FindMedias {
  export type Input = {
    youtubeUrlId?: string
    videoTitle?: string
  }
  export type Output = { items: number, data: MediaData[] } | Error
}
