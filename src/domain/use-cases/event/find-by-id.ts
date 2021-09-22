import { EventData } from '@/domain/models'

export type FindEventByIdService = (params: FindEventById.Input) => Promise<FindEventById.Output>

export namespace FindEventById {
  export type Input = { id: string }
  export type Output = { event: EventData } | Error
}
