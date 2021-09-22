import { ParagraphData, SocialData } from '@/domain/models'
import { paragraphSchema } from '@/infra/mongodb/entities/paragraph'
import { socialSchema } from '@/infra/mongodb/entities/social'

import mongoose from 'mongoose'

export type MemberPageInfoAttrs = {
  pageTitlePicture: string
  title: string
  paragraphs: ParagraphData[]
  socialsPhrase: string
  socials: SocialData[]
}

export interface MemberPageInfoDoc extends mongoose.Document {
  pageTitlePicture: string
  title: string
  paragraphs: ParagraphData[]
  socialsPhrase: string
  socials: SocialData[]
}

export interface MemberPageInfoModel extends mongoose.Model<MemberPageInfoDoc> {
  build: (attrs: MemberPageInfoAttrs) => MemberPageInfoDoc
}

const memberPageInfoSchema = new mongoose.Schema({
  pageTitlePicture: { type: String, required: true },
  title: { type: String, required: true },
  paragraphs: [paragraphSchema],
  socialsPhrase: { type: String, required: true },
  socials: [socialSchema]
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

memberPageInfoSchema.statics.build = (attrs: MemberPageInfoAttrs) => {
  return new MemberPageInfo(attrs)
}

const MemberPageInfo = mongoose.model<MemberPageInfoDoc, MemberPageInfoModel>('MemberPageInfo', memberPageInfoSchema)

export { MemberPageInfo as MemberPageInfoEntity, memberPageInfoSchema }

export default MemberPageInfo
