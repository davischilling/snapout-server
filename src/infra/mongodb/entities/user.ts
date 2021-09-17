import { GenderType, PhysicalActivityLevelType } from '@/domain/models'
import { ObjectiveData } from '@/domain/models/objective'

import mongoose, { Schema } from 'mongoose'

export type UserAttrs = {
  accountId: string
  gender: GenderType
  age: number
  height: number
  initialWeight: number
  initialBodyFat?: number
  basalMetabolicRate: number
  physicalActivityLevel: PhysicalActivityLevelType
}

export interface UserDoc extends mongoose.Document {
  accountId: string
  gender: GenderType
  age: number
  height: number
  initialWeight: number
  initialBodyFat?: number
  basalMetabolicRate: number
  physicalActivityLevel: PhysicalActivityLevelType
  objectives: ObjectiveData[]
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build: (attrs: UserAttrs) => UserDoc
}

const userSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  gender: { type: String, enum: [GenderType.feminine, GenderType.masculine], required: true },
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  initialWeight: { type: Number, required: true },
  initialBodyFat: { type: Number, required: false },
  basalMetabolicRate: { type: Number, required: true },
  physicalActivityLevel: {
    type: Number,
    enum: [
      PhysicalActivityLevelType.none,
      PhysicalActivityLevelType.oneToTwo,
      PhysicalActivityLevelType.twoToThree,
      PhysicalActivityLevelType.fourToFive,
      PhysicalActivityLevelType.sixToSeven,
      PhysicalActivityLevelType.athlete
    ],
    required: true
  },
  objectives: [{ type: Schema.Types.Mixed, required: true, default: {} }]
}, {
  timestamps: true,
  // toJSON: {
  //   transform (doc, ret) {
  //     ret.id = ret._id
  //     delete ret._id
  //     delete ret.__v
  //   }
  // }
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User as UserEntity, userSchema }

export default User
