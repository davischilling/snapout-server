import { GenderType, PhysicalActivityLevelType, UserData } from '@/domain/models'
import { ObjectiveData } from '@/domain/models/objective'

export class User {
  id?: string
  gender: GenderType
  age: number
  height: number
  initialWeight: number
  initialBodyFat?: number
  physicalActivityLevel: PhysicalActivityLevelType
  accountId: string
  basalMetabolicRate: number
  objectives: ObjectiveData[] = []

  constructor (
    userData: UserData
  ) {
    const {
      id,
      accountId,
      gender,
      age,
      height,
      initialWeight,
      initialBodyFat,
      physicalActivityLevel
    } = userData
    if (id !== undefined) {
      this.id = id
    }
    if (initialBodyFat !== undefined) {
      this.basalMetabolicRate = this.katchMcArdle(initialWeight, initialBodyFat)
      this.initialBodyFat = initialBodyFat
    } else {
      this.basalMetabolicRate = this.mifflinStJeor(initialWeight, height, age, gender)
    }
    this.accountId = accountId
    this.gender = gender
    this.age = age
    this.height = height
    this.initialWeight = initialWeight
    this.physicalActivityLevel = physicalActivityLevel
  }

  static update (user: User, params: any): User {
    return new User({ ...user, ...params })
  }

  katchMcArdle (
    initialWeight: number,
    initialBodyFat: number
  ): number {
    const lbm = (initialWeight * (100 - initialBodyFat) / 100)
    return 370 + (21.6 * lbm)
  }

  mifflinStJeor (
    initialWeight: number,
    height: number,
    age: number,
    gender: GenderType
  ): number {
    if (gender === GenderType.masculine) {
      return (10 * initialWeight) + (6.25 * height) - (5 * age) + 5
    } else {
      return (10 * initialWeight) + (6.25 * height) - (5 * age) - 161
    }
  }
}
