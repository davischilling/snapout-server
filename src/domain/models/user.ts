import { ObjectiveData } from './objective'

export type UserData = {
  id?: string
  accountId: string
  gender: GenderType
  age: number
  height: number
  initialWeight: number
  initialBodyFat?: number
  basalMetabolicRate?: number
  physicalActivityLevel: PhysicalActivityLevelType
  objectives?: ObjectiveData[]
}

export enum GenderType {
  masculine = 'Masculine',
  feminine = 'Feminine'
}

export enum PhysicalActivityLevelType {
  none = 1.2,
  oneToTwo = 1.375,
  twoToThree = 1.55,
  fourToFive = 1.725,
  sixToSeven = 1.9,
  athlete = 2.4
}
