import mongoose from 'mongoose'

export type MediaAttrs = {
  youtubeUrlId: string
  videoTitle: string
}

export interface MediaDoc extends mongoose.Document {
  youtubeUrlId: string
  videoTitle: string
}

export interface MediaModel extends mongoose.Model<MediaDoc> {
  build: (attrs: MediaAttrs) => MediaDoc
}

const mediaSchema = new mongoose.Schema({
  youtubeUrlId: { type: String, required: true },
  videoTitle: { type: String, required: true }
}, {
  timestamps: true,
  // toJSON: {
  //   transform(doc, ret) {
  //     ret.id = ret._id
  //     delete ret._id
  //     delete ret.__v
  //   }
  // }
})

mediaSchema.statics.build = (attrs: MediaAttrs) => {
  return new Media(attrs)
}

const Media = mongoose.model<MediaDoc, MediaModel>('Media', mediaSchema)

export { Media as MediaEntity, mediaSchema }

export default Media
