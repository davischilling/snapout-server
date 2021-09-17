import { GenderType, PhysicalActivityLevelType } from '@/domain/models'

export type CreateUserService = (params: CreateUser.Input) => Promise<CreateUser.Output>

export namespace CreateUser {
  export type UserInputs = {
    accountId: string
    gender: GenderType
    age: number
    height: number
    initialWeight: number
    initialBodyFat?: number
    physicalActivityLevel: PhysicalActivityLevelType
  }
  export type Input = UserInputs
  export type Output = { id: string } | Error
}
