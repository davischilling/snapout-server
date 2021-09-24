import { RepoAttrs, RepoDoc, RepoModel } from '@/infra/mongodb/repos'

import mongoose, { Schema } from 'mongoose'

const repoSchema = new mongoose.Schema({
  data: {
    type: Schema.Types.Mixed,
    required: true
  }
}, {
  toJSON: {
    transform (doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  }
})

repoSchema.statics.build = (attrs: RepoAttrs) => {
  return new Repo(attrs)
}

const Repo = mongoose.model<RepoDoc, RepoModel>('Repo', repoSchema)

export default Repo
