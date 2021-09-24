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
  timestamps: true
})

mediaSchema.statics.build = (attrs: MediaAttrs) => {
  return new Media(attrs)
}

const Media = mongoose.model<MediaDoc, MediaModel>('Media', mediaSchema)

export { Media as MediaEntity, mediaSchema }

export default Media
