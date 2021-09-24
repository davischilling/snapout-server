import mongoose from 'mongoose'

export type ContactAttrs = {
  message: string
  email: string
  eventManager: string
  phone: string
}

export interface ContactDoc extends mongoose.Document {
  message: string
  email: string
  eventManager: string
  phone: string
}

export interface ContactModel extends mongoose.Model<ContactDoc> {
  build: (attrs: ContactAttrs) => ContactDoc
}

const contactSchema = new mongoose.Schema({
  message: { type: String, required: true },
  email: { type: String, required: true },
  eventManager: { type: String, required: true },
  phone: { type: String, required: true }
}, {
  timestamps: true
})

contactSchema.statics.build = (attrs: ContactAttrs) => {
  return new Contact(attrs)
}

const Contact = mongoose.model<ContactDoc, ContactModel>('Contact', contactSchema)

export { Contact as ContactEntity, contactSchema }

export default Contact
