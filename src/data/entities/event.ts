import { EventData } from '@/domain/models'

export class Event {
  id?: string
  weekDay: string
  dayMonth: string
  city: string
  local: string

  constructor (
    eventData: EventData
  ) {
    const {
      id,
      weekDay,
      dayMonth,
      city,
      local
    } = eventData
    if (id !== undefined) {
      this.id = id
    }
    this.weekDay = weekDay
    this.dayMonth = dayMonth
    this.city = city
    this.local = local
  }
}
