import mongoose from 'mongoose'

export type SectionAttrs = {
  menuName: string
  entityName: string
  sectionTitle: string
}

export interface SectionDoc extends mongoose.Document {
  menuName: string
  entityName: string
  sectionTitle: string
}

export interface SectionModel extends mongoose.Model<SectionDoc> {
  build: (attrs: SectionAttrs) => SectionDoc
}

const sectionSchema = new mongoose.Schema({
  menuName: { type: String, required: true },
  entityName: { type: String, required: true },
  sectionTitle: { type: String, required: true }
}, {
  timestamps: true
})

sectionSchema.statics.build = (attrs: SectionAttrs) => {
  return new Section(attrs)
}

const Section = mongoose.model<SectionDoc, SectionModel>('Section', sectionSchema)

export { Section as SectionEntity, sectionSchema }

export default Section
