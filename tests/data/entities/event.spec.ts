import { Event } from '@/data/entities'
import { EventData } from '@/domain/models'

describe('Event', () => {
    let eventData: EventData
    let sut: Event

    beforeEach(() => {
        eventData = {
          weekDay: 'any_weekDay',
          dayMonth: 'any_dayMonth',
          city: 'any_city',
          local: 'any_local'
        }
    })

    it('should fill the attrs on the constructor with correct params', () => {
        sut = new Event(eventData)

        expect(sut).toEqual(eventData)
    })

    it('should update an event correctly', () => {
      sut = new Event(eventData)
      sut.id = 'any_event_id'

      const updatedEvent = new Event({ ...sut, ...{ city: 'new_city', local: 'new_local' }})

      expect(updatedEvent).toEqual({
        id: 'any_event_id',
        weekDay: 'any_weekDay',
        dayMonth: 'any_dayMonth',
        city: 'new_city',
        local: 'new_local'
      })
  })
})
