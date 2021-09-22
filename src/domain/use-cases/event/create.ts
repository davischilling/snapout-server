export type CreateEventService = (params: CreateEvent.Input) => Promise<CreateEvent.Output>

export namespace CreateEvent {
  export type EventInputs = {
    weekDay: string
    dayMonth: string
    city: string
    local: string
  }
  export type Input = EventInputs
  export type Output = { id: string } | Error
}
