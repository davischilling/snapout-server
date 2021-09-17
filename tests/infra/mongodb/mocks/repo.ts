import mongoose, { Schema } from 'mongoose'

type RepoAttrs = {
  data: any
}

export interface RepoDoc extends mongoose.Document {
  data: any
}

export interface RepoModel extends mongoose.Model<RepoDoc> {
  build: (attrs: RepoAttrs) => RepoDoc
}

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
