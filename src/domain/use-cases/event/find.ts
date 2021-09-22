import { EventData } from '@/domain/models'

export type FindEventsService = (params: FindEvents.Input) => Promise<FindEvents.Output>

export namespace FindEvents {
  export type Input = {
    weekDay?: string
    dayMonth?: string
    city?: string
    local?: string
  }
  export type Output = { items: number, data: EventData[] } | Error
}
