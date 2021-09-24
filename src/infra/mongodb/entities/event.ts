import mongoose from 'mongoose'

export type EventAttrs = {
  weekDay: string
  dayMonth: string
  city: string
  local: string
}

export interface EventDoc extends mongoose.Document {
  weekDay: string
  dayMonth: string
  city: string
  local: string
}

export interface EventModel extends mongoose.Model<EventDoc> {
  build: (attrs: EventAttrs) => EventDoc
}

const eventSchema = new mongoose.Schema({
  weekDay: { type: String, required: true },
  dayMonth: { type: String, required: true },
  city: { type: String, required: true },
  local: { type: String, required: true }
}, {
  timestamps: true
})

eventSchema.statics.build = (attrs: EventAttrs) => {
  return new Event(attrs)
}

const Event = mongoose.model<EventDoc, EventModel>('Event', eventSchema)

export { Event as EventEntity, eventSchema }

export default Event
