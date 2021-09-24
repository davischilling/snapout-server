import mongoose from 'mongoose'

export type ParagraphAttrs = {
  paragraph: string
}

export interface ParagraphDoc extends mongoose.Document {
  paragraph: string
}

export interface ParagraphModel extends mongoose.Model<ParagraphDoc> {
  build: (attrs: ParagraphAttrs) => ParagraphDoc
}

const paragraphSchema = new mongoose.Schema({
  paragraph: { type: String, required: true }
}, {
  timestamps: true
})

paragraphSchema.statics.build = (attrs: ParagraphAttrs) => {
  return new Paragraph(attrs)
}

const Paragraph = mongoose.model<ParagraphDoc, ParagraphModel>('Paragraph', paragraphSchema)

export { Paragraph as ParagraphEntity, paragraphSchema }

export default Paragraph
