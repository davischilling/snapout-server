import { MemberPageInfoData, SocialTypes } from '@/domain/models'

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

const reshapingOptions = {
  // include .id (it's a virtual)
  virtuals: true,
  // exclude ._id
  transform: function (doc: any, ret: any) {
    delete ret._id
    return ret
  }
}

const paragraphSchema = new mongoose.Schema({
  paragraph: { type: String, required: true }
}, {
  versionKey: false,
  toJSON: reshapingOptions
})

const socialSchema = new mongoose.Schema({
  socialType: { type: String, enum: [SocialTypes.facebook, SocialTypes.instagram], required: true },
  socialUrl: { type: String, required: true }
}, {
  versionKey: false,
  toJSON: reshapingOptions
})

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  alt: { type: String, required: true },
  memberUrlPage: { type: String, required: true },
  memberPageInfo: {
    pageTitlePicture: { type: String, required: true },
    title: { type: String, required: true },
    paragraphs: [paragraphSchema],
    socialsPhrase: { type: String, required: true },
    socials: [socialSchema]
  }
}, {
  timestamps: true
})

memberSchema.statics.build = (attrs: MemberAttrs) => {
  return new Member(attrs)
}

const Member = mongoose.model<MemberDoc, MemberModel>('Member', memberSchema)

export { Member as MemberEntity, memberSchema }

export default Member
