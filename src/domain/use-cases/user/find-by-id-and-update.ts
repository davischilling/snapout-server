import { GenderType, PhysicalActivityLevelType, UserData } from '@/domain/models'

export type FindUserByIdAndUpdateService = (params: FindUserByIdAndUpdate.Input) => Promise<FindUserByIdAndUpdate.Output>

export namespace FindUserByIdAndUpdate {
  export type Input = {
    id: string
    gender?: GenderType
    age?: number
    height?: number
    initialWeight?: number
    initialBodyFat?: number
    physicalActivityLevel?: PhysicalActivityLevelType
  }
  export type Output = { user: UserData } | Error
}
