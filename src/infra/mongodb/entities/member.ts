import { MemberPageInfoData } from '@/domain/models'
import { memberPageInfoSchema } from '@/infra/mongodb/entities'

import mongoose from 'mongoose'

export type MemberAttrs = {
  name: string
  role: string
  image: string
  alt: string
  memberUrlPage: string
  memberPageInfo: MemberPageInfoData
}

export interface MemberDoc extends mongoose.Document {
  name: string
  role: string
  image: string
  alt: string
  memberUrlPage: string
  memberPageInfo: MemberPageInfoData
}

export interface MemberModel extends mongoose.Model<MemberDoc> {
  build: (attrs: MemberAttrs) => MemberDoc
}

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  alt: { type: String, required: true },
  memberUrlPage: { type: String, required: true },
  memberPageInfo: memberPageInfoSchema
}, {
  timestamps: true
})

memberSchema.statics.build = (attrs: MemberAttrs) => {
  return new Member(attrs)
}

const Member = mongoose.model<MemberDoc, MemberModel>('Member', memberSchema)

export { Member as MemberEntity, memberSchema }

export default Member
