import { MediaData } from '@/domain/models'

export type FindMediaByIdService = (params: FindMediaById.Input) => Promise<FindMediaById.Output>

export namespace FindMediaById {
  export type Input = { id: string }
  export type Output = { media: MediaData } | Error
}
