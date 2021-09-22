import { EventData } from '@/domain/models'

export type FindEventByIdAndUpdateService = (params: FindEventByIdAndUpdate.Input) => Promise<FindEventByIdAndUpdate.Output>

export namespace FindEventByIdAndUpdate {
  export type Input = {
    id: string
    weekDay: string
    dayMonth: string
    city: string
    local: string
  }
  export type Output = { event: EventData } | Error
}
