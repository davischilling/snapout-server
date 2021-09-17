import { RoleType } from '@/domain/models'

import mongoose from 'mongoose'

export type AccountAttrs = {
  name?: string
  phone?: string
  email: string
  password?: string
}

interface AccountModel extends mongoose.Model<AccountDoc> {
  build: (attrs: AccountAttrs) => AccountDoc
}

interface AccountDoc extends mongoose.Document {
  name?: string
  phone?: string
  email: string
  password?: string
}

const accountSchema = new mongoose.Schema({
  name: { type: String, required: false },
  phone: { type: String, required: false, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  role: { type: String, enum: [RoleType.admin, RoleType.operator], default: RoleType.operator, required: true }
}, {
  toJSON: {
    transform (doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.password
      delete ret.__v
    }
  }
})

accountSchema.statics.build = (attrs: AccountAttrs) => {
  return new Account(attrs)
}

const Account = mongoose.model<AccountDoc, AccountModel>('Account', accountSchema)

export { Account as AccountEntity, accountSchema }

export default Account
