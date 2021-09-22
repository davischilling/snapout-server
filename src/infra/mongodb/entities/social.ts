import { SocialTypes } from '@/domain/models'

import mongoose from 'mongoose'

export type SocialAttrs = {
  socialType: SocialTypes
  socialUrl: string
}

export interface SocialDoc extends mongoose.Document {
  socialType: SocialTypes
  socialUrl: string
}

export interface SocialModel extends mongoose.Model<SocialDoc> {
  build: (attrs: SocialAttrs) => SocialDoc
}

const socialSchema = new mongoose.Schema({
  socialType: { type: String, enum: [SocialTypes.facebook, SocialTypes.instagram], required: true },
  socialUrl: { type: String, required: true },
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

socialSchema.statics.build = (attrs: SocialAttrs) => {
  return new Social(attrs)
}

const Social = mongoose.model<SocialDoc, SocialModel>('Social', socialSchema)

export { Social as SocialEntity, socialSchema }

export default Social
